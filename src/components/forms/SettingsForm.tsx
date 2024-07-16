import { Button, Col, Form, Input, InputNumber, message, Row } from 'antd'
import { useShallow } from 'zustand/react/shallow'
import useGlobalStore from '../../stores/GlobalStore'
import { Settings } from '../../types/data'

export default function SettingsForm() {
    const [form] = Form.useForm()
    const settings = useGlobalStore(useShallow((state) => state.settings))
    const updateSettings = useGlobalStore((state) => state.updateSettings)

    function onFinish(values: Settings) {
        updateSettings(values)
        message.success('Impostazioni aggiornate')
    }

    return (
        <Form
            layout={'horizontal'}
            form={form}
            onFinish={onFinish}
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
            <Row>
                <Col span={12}>
                    <Form.Item
                        label="Prezzo base ora"
                        name="workforce_price"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <InputNumber placeholder="20" prefix="€" />
                    </Form.Item>
                </Col>
                <Col>
                    <Col span={12}>
                        <Form.Item
                            label="Prezzo base ora"
                            name="iva"
                            initialValue={22}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <InputNumber defaultValue={22} prefix="%" />
                        </Form.Item>
                    </Col>
                </Col>
            </Row>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Aggiorna dati
                </Button>
            </Form.Item>
        </Form>
    )
}
