import { Button, Form, Input, message } from 'antd'
import { useEffect } from 'react'
import { customers } from '../../db/models'
import useDatabaseStore from '../../stores/DatabaseStore'
import { Customer } from '../../types/data'

interface Props {
    cusomerId?: Customer['id']
}

export default function CustomersForm(props: Props) {
    const [form] = Form.useForm()
    const refetch = useDatabaseStore((state) => state.refetchCustomers)

    function onFinish(values: Customer) {
        customers
            .create(values)
            .then(() => {
                refetch()
                message.success('Utente creato correttamente')
            })
            .catch((err) => {
                message.error(JSON.stringify(err))
            })
    }

    useEffect(() => {
        if (props.cusomerId) {
            let data = useDatabaseStore((state) => state.customers)
            form.setFieldsValue(
                data.filter((customer) => {
                    return customer.id == props.cusomerId
                })
            )
        }
    }, [])

    return (
        <Form
            layout={'horizontal'}
            form={form}
            onFinish={onFinish}
            name="CustomersForm"
        >
            <Form.Item
                label="Nome"
                name="name"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Esempio: Mario Rossi" />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Esempio: mario@test.com" />
            </Form.Item>

            <Form.Item
                label="Telefono"
                name="phone_number"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Esempio: 3386988457" />
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: '100%' }}
                >
                    Crea utente
                </Button>
            </Form.Item>
        </Form>
    )
}
