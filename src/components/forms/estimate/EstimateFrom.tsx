import { Form } from 'antd'
import { useForm } from 'antd/es/form/Form'
import SwitchSteps from '../../buttons/SwitchSteps'
import CarSelect from '../../selects/CarSelect'
import CustomerSelect from '../../selects/CustomerSelect'
import WorkForm from './WorksForm'

export default function EstimateFrom() {
    const [form] = useForm()
    return (
        <Form form={form}>
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
