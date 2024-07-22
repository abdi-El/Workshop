import { Form, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect } from 'react'
import { estimates } from '../../../db/models'
import useDatabaseStore from '../../../stores/DatabaseStore'
import { Estimate, Settings } from '../../../types/data'
import SwitchSteps from '../../buttons/SwitchSteps'
import CarSelect from '../../selects/CarSelect'
import CustomerSelect from '../../selects/CustomerSelect'
import PricesForm from './PricesForm'
import WorksForm from './WorksForm'

interface Props {
    onFinish?(): void
    estimateId?: number
}

export default function EstimateFrom(props: Props) {
    const [form] = useForm()
    const cars = useDatabaseStore((state) => state.cars)
    const refetch = useDatabaseStore((state) => state.refetchEstimates)

    function getWorkshopData() {
        const workshop_data = JSON.parse(
            localStorage.getItem('settings') || '{}'
        ) as Settings
        const { isDarkTheme, iva, ...workshop_data_filtered } = workshop_data
        return workshop_data_filtered
    }

    function getCar(id: number) {
        return cars.filter((car) => car.id == id)[0]
    }

    function onFinish() {
        let formData = form.getFieldsValue(true) as Estimate
        formData = {
            ...formData,
            ...getWorkshopData(),
            km: getCar(formData.car_id).km,
            works_done: JSON.stringify(formData.works_done),
        }
        let result: Promise<any> | undefined = undefined
        if (props.estimateId) {
            result = estimates.update(formData, props.estimateId)
        } else {
            result = estimates.create(formData)
        }
        result
            .then(() => {
                form.resetFields()
                props.onFinish!()
                refetch()
                message.success(
                    `Preventivo ${
                        props.estimateId ? 'aggiornato' : 'creato'
                    } correttamente`
                )
            })
            .catch((err) => {
                message.error(err)
            })
    }
    let data = useDatabaseStore((state) => state.estimates)

    useEffect(() => {
        if (props.estimateId) {
            let currentEstimate = data.filter(
                (estimate) => estimate.id == props.estimateId
            )[0]
            currentEstimate.works_done = JSON.parse(currentEstimate.works_done)
            form.setFieldsValue(currentEstimate)
        } else {
            form.resetFields()
        }
    }, [props.estimateId])

    return (
        <Form form={form} onFinish={onFinish}>
            <SwitchSteps
                form={form}
                steps={[
                    {
                        content: <CustomerSelect />,
                        title: 'Cliente:',
                    },
                    {
                        content: <CarSelect />,
                        title: 'Auto:',
                    },
                    {
                        content: <WorksForm />,
                        title: 'Lavori eseguiti:',
                    },
                    {
                        content: <PricesForm />,
                        title: 'Prezzi:',
                    },
                ]}
            />
        </Form>
    )
}
