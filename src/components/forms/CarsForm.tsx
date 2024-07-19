import { Button, Form, Input, InputNumber, message } from 'antd'
import { useEffect } from 'react'
import { cars } from '../../db/models'
import useDatabaseStore from '../../stores/DatabaseStore'
import { Car } from '../../types/data'
import CustomerSelect from '../selects/CustomerSelect'

interface Props {
    carId?: string
}

export default function CarsForm({ carId }: Props) {
    const [form] = Form.useForm()
    const refetch = useDatabaseStore((state) => state.refetchCars)
    let data = useDatabaseStore((state) => state.cars)

    function onFinish(values: Car) {
        cars.create(values)
            .then(() => {
                refetch()
                message.success('Auto creata correttamente')
            })
            .catch((err) => {
                message.error(JSON.stringify(err))
            })
    }

    useEffect(() => {
        if (carId) {
            form.setFieldsValue(
                data.filter((car) => car.id == parseInt(carId))[0]
            )
        }
    }, [])

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
