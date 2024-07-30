import { DashboardOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber } from 'antd'
import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { cars } from '../../db/models'
import useDatabaseStore from '../../stores/DatabaseStore'
import useGlobalStore from '../../stores/GlobalStore'
import { Car } from '../../types/data'
import CustomerSelect from '../selects/CustomerSelect'

interface Props {
    carId?: number
    onFinish?(): void
}

export default function CarsForm({ carId, onFinish }: Props) {
    const [form] = Form.useForm()
    const refetch = useDatabaseStore((state) => state.refetchCars)
    let data = useDatabaseStore((state) => state.cars)
    const drawerOpen = useGlobalStore(useShallow((state) => state.drawerState))

    function onSuccess() {
        refetch()
        onFinish!()
        form.resetFields()
    }

    function createCar(values: Car) {
        cars.create(values).then(() => onSuccess())
    }
    function updateCar(values: Car, carId: number) {
        cars.update(values, carId).then(() => onSuccess())
    }

    function onSubmit(values: Car) {
        if (!carId) {
            createCar(values)
        } else {
            updateCar(values, carId)
        }
    }

    useEffect(() => {
        if (carId) {
            form.setFieldsValue(data.filter((car) => car.id == carId)[0])
        } else {
            form.resetFields()
        }
    }, [carId, drawerOpen])

    return (
        <Form
            layout={'horizontal'}
            form={form}
            onFinish={onSubmit}
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
                <Input.OTP length={7} formatter={(str) => str.toUpperCase()} />
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
                <InputNumber prefix={<DashboardOutlined />} />
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: '100%' }}
                >
                    {!carId ? 'Crea auto' : 'Aggiorna dati auto'}
                </Button>
            </Form.Item>
        </Form>
    )
}
