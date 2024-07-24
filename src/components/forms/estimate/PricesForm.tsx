import { Form, InputNumber, Row } from 'antd'
import { useShallow } from 'zustand/react/shallow'
import useGlobalStore from '../../../stores/GlobalStore'

const PricesForm = () => {
    const settings = useGlobalStore(useShallow((state) => state.settings))

    const requiredRule = [
        {
            required: true,
        },
    ]

    return (
        <>
            <Row>
                <Form.Item
                    name="workforce_price"
                    label="Prezzo mano d'opera"
                    initialValue={settings.workforce_price}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber
                        prefix="€"
                        placeholder="Prezzo mano d'opera"
                        step="0.01"
                        min={0}
                    />
                </Form.Item>
            </Row>
            <Row align="middle">
                <Form.Item
                    label="Iva"
                    name="iva"
                    initialValue={settings.iva}
                    rules={requiredRule}
                >
                    <InputNumber
                        prefix="%"
                        placeholder="Iva"
                        step="0.01"
                        min={0}
                    />
                </Form.Item>
            </Row>
            <Row align="middle">
                <Form.Item label="Sconto" name="discount" rules={requiredRule}>
                    <InputNumber
                        prefix="€"
                        placeholder="Sconto"
                        step="0.01"
                        min={0}
                    />
                </Form.Item>
            </Row>
        </>
    )
}

export default PricesForm
