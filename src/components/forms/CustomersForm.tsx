import { Button, Form, Input, message } from 'antd'
import { customers } from '../../db/models'
import { Customer } from '../../types/data'

export default function CustomersForm() {
    const [form] = Form.useForm()

    function onFinish(values: Customer) {
        customers.create(values).then((res) => {
            message.success('Utente Creato')
        })
    }

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
