import { Button, Form, Input, message } from 'antd'
import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { customers } from '../../db/models'
import useDatabaseStore from '../../stores/DatabaseStore'
import useGlobalStore from '../../stores/GlobalStore'
import { Customer } from '../../types/data'

interface Props {
    customerId?: Customer['id']
    onFinish?(): void
}

export default function CustomersForm(props: Props) {
    const [form] = Form.useForm()
    const refetch = useDatabaseStore((state) => state.refetchCustomers)
    let data = useDatabaseStore((state) => state.customers)
    const drawerOpen = useGlobalStore(useShallow((state) => state.drawerState))

    function onSuccess() {
        refetch()
        props.onFinish!()
        form.resetFields()
    }

    function createCustomer(values: Customer) {
        customers
            .create(values)
            .then(() => onSuccess())
            .catch((err) => {
                message.error(JSON.stringify(err))
            })
    }
    function updateCostomer(values: Customer, costomerId: number) {
        customers.update(values, costomerId).then(() => onSuccess())
    }

    function onFinish(values: Customer) {
        if (!props.customerId) {
            createCustomer(values)
        } else {
            updateCostomer(values, props.customerId)
        }
    }

    useEffect(() => {
        if (props.customerId) {
            form.setFieldsValue(
                data.filter((car) => car.id == props.customerId)[0]
            )
        } else {
            form.resetFields()
        }
    }, [props.customerId, drawerOpen])

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
                    {!props.customerId ? 'Crea cliente' : 'Aggiorna cliente'}
                </Button>
            </Form.Item>
        </Form>
    )
}
