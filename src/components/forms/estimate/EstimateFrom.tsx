import { Form } from 'antd'
import { useForm, useWatch } from 'antd/es/form/Form'
import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { estimates } from '../../../db/models'
import useDatabaseStore from '../../../stores/DatabaseStore'
import useGlobalStore from '../../../stores/GlobalStore'
import { Estimate, EstimateWithRelated, Settings } from '../../../types/data'
import SwitchSteps from '../../buttons/SwitchSteps'
import CarSelect from '../../selects/CarSelect'
import CustomerSelect from '../../selects/CustomerSelect'
import PricesForm from './PricesForm'
import WorksForm from './WorksForm'

interface Props {
    onFinish?(): void
    estimateId?: number
}

function extractKeys(data: EstimateWithRelated): Estimate {
    let keys: Array<keyof Estimate> = [
        'car_id',
        'customer_id',
        'works_done',
        'hours_worked',
        'discount',
        'notes',
        'km',
        'workshop_name',
        'workshop_address',
        'workshop_phone_number',
        'workshop_p_iva',
        'workforce_price',
        'iva',
        'id',
        'created_at',
        'updated_at',
    ]
    return Object.keys(data).reduce((acc: any, key: any) => {
        if (keys.includes(key)) {
            acc[key] = data[key as keyof EstimateWithRelated]
        }
        return acc
    }, {})
}

export default function EstimateFrom(props: Props) {
    const [form] = useForm()
    const drawerOpen = useGlobalStore(useShallow((state) => state.drawerState))
    const cars = useDatabaseStore((state) => state.cars)
    let data = useDatabaseStore((state) => state.estimates)
    const refetch = useDatabaseStore((state) => state.refetchEstimates)
    const customerId = useWatch('customer_id', form)

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
        let formData = extractKeys(form.getFieldsValue(true))
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
        result.then(() => {
            form.resetFields()
            props.onFinish!()
            refetch()
        })
    }
    useEffect(() => {
        if (props.estimateId) {
            let currentEstimate = data.filter(
                (estimate) => estimate.id == props.estimateId
            )[0]
            if (
                currentEstimate &&
                typeof currentEstimate.works_done == 'string'
            ) {
                currentEstimate.works_done = JSON.parse(
                    currentEstimate.works_done
                )
            }
            form.setFieldsValue(currentEstimate)
        } else {
            form.resetFields()
        }
    }, [props.estimateId, drawerOpen])

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
                        content: <CarSelect customerId={customerId} />,
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
