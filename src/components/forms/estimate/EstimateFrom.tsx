import { Form, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { SimpleObject } from '../../../types/common'
import SwitchSteps from '../../buttons/SwitchSteps'
import CarSelect from '../../selects/CarSelect'
import CustomerSelect from '../../selects/CustomerSelect'
import PricesForm from './PricesForm'
import WorkForm from './WorksForm'

interface Props {
    onFinish?(): void
}

export default function EstimateFrom(props: Props) {
    const [form] = useForm()
    function onFinish(values: SimpleObject) {
        message.success(JSON.stringify(values))
        form.resetFields()
        props.onFinish!()
    }
    return (
        <Form form={form} onFinish={onFinish}>
            <SwitchSteps
                steps={[
                    {
                        content: <CustomerSelect />,
                        title: 'Cliente:',
                    },
                    {
                        content: <CarSelect />,
                        title: 'Auto    :',
                    },
                    {
                        content: <WorkForm />,
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
