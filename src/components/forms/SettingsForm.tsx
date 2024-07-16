import { Button, Form, Input } from 'antd'
import { useShallow } from 'zustand/react/shallow'
import useGlobalStore from '../../stores/GlobalStore'

export default function SettingsForm() {
    const [form] = Form.useForm()
    const settings = useGlobalStore(useShallow((state) => state.settings))
    const updateSettings = useGlobalStore((state) => state.updateSettings)

    return (
        <Form
            layout={'horizontal'}
            form={form}
            onFinish={updateSettings}
            initialValues={settings}
            name="SettingsForm"
        >
            <Form.Item
                label="Nome Officina"
                name="workshop_name"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Esempio: Officina Mario Rossi" />
            </Form.Item>
            <Form.Item
                label="Indirizzo"
                name="address"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Esempio: Via Roma 1B" />
            </Form.Item>
            <Form.Item
                label="Partita Iva"
                name="p_iva"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Esempio: 0789746532" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Aggiorna dati
                </Button>
            </Form.Item>
        </Form>
    )
}
