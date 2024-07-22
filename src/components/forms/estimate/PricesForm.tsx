import { Form, InputNumber, Row, Switch } from 'antd'
import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import useGlobalStore from '../../../stores/GlobalStore'

const PricesForm = () => {
    const settings = useGlobalStore(useShallow((state) => state.settings))
    const [hasIva, setHasIva] = useState(false)
    const [hasDiscount, setHasDiscount] = useState(false)

    const requiredRule = [
        {
            required: true,
        },
    ]

    return (
        <>
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

            <Row align="middle">
                Voui applicare l'iva?
                <Switch
                    checkedChildren="Sì"
                    unCheckedChildren="No"
                    onChange={setHasIva}
                />
                {hasIva && (
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
                )}
            </Row>
            <Row align="middle">
                Voui applicare uno sconto?
                <Switch
                    checkedChildren="Sì"
                    unCheckedChildren="No"
                    onChange={setHasDiscount}
                />
                {hasDiscount && (
                    <Form.Item
                        label="Sconto"
                        name="discount"
                        rules={requiredRule}
                    >
                        <InputNumber
                            prefix="€"
                            placeholder="Sconto"
                            step="0.01"
                            min={0}
                        />
                    </Form.Item>
                )}
            </Row>
        </>
    )
}

export default PricesForm
