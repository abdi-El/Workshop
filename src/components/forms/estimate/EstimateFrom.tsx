import { Form, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import SwitchSteps from '../../buttons/SwitchSteps'
import CarSelect from '../../selects/CarSelect'
import CustomerSelect from '../../selects/CustomerSelect'
import PricesForm from './PricesForm'
import WorksForm from './WorksForm'

interface Props {
    onFinish?(): void
}

export default function EstimateFrom(props: Props) {
    const [form] = useForm()
    function onFinish() {
        const formData = form.getFieldsValue(true)
        message.success(JSON.stringify(formData))
        form.resetFields()
        props.onFinish!()
    }
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
                        content: <PricesForm form={form} />,
                        title: 'Prezzi:',
                    },
                ]}
            />
        </Form>
    )
}
