import { Button, Form, Input, InputNumber, message } from 'antd'
import { cars } from '../../db/models'
import { useCarsStore } from '../../stores/DatabaseStore'
import { Car } from '../../types/data'
import CustomerSelect from '../selects/CustomerSelect'

export default function CarsForm() {
    const [form] = Form.useForm()
    const refetch = useCarsStore((state) => state.refetch)

    function onFinish(values: Car) {
        cars.create(values)
            .then(() => {
                refetch()
                message.success('Auto creata correttamente')
            })
            .catch(() => {
                message.error('Qualcosa è andato stroto')
            })
    }

    return (
        <Form
            layout={'horizontal'}
            form={form}
            onFinish={onFinish}
            name="CarsForm"
        >
            <CustomerSelect />

            <Form.Item
                label="marca"
                name="maker"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="modello"
                name="model"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="targa"
                name="number_plate"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="km"
                name="km"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: '100%' }}
                >
                    Crea auto
                </Button>
            </Form.Item>
        </Form>
    )
}
