import { Form, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { SimpleObject } from '../../../types/common'
import SwitchSteps from '../../buttons/SwitchSteps'
import CarSelect from '../../selects/CarSelect'
import CustomerSelect from '../../selects/CustomerSelect'
import WorkForm from './WorksForm'

export default function EstimateFrom() {
    const [form] = useForm()
    function onFinish(values: SimpleObject) {
        message.success(JSON.stringify(values))
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
                ]}
            />
        </Form>
    )
}
