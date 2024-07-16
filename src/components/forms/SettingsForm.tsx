import { Button, Form, Input } from 'antd'

export default function SettingsForm() {
    const [form] = Form.useForm()

    return (
        <Form layout={'horizontal'} form={form}>
            <Form.Item label="Nome Officina" name="workshop_name" required>
                <Input placeholder="Esempio: Officina Mario Rossi" />
            </Form.Item>
            <Form.Item label="Indirizzo" name="address" required>
                <Input placeholder="Esempio: Via Roma 1B" />
            </Form.Item>
            <Form.Item label="Partita Iva" name="p_iva" required>
                <Input placeholder="Esempio: 0789746532" />
            </Form.Item>
            <Form.Item>
                <Button type="primary">Aggiorna dati</Button>
            </Form.Item>
        </Form>
    )
}
