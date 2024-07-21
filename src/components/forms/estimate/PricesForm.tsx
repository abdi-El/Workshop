import { Col, Form, InputNumber, Row, Switch } from 'antd'
import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import useGlobalStore from '../../../stores/GlobalStore'

const PricesForm = () => {
    const settings = useGlobalStore(useShallow((state) => state.settings))
    const [hasIva, setHasIva] = useState(false)
    const [hasDiscount, setHasDiscount] = useState(false)

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
                />
            </Form.Item>

            <Row align="middle">
                <Col span={12}>
                    Voui applicare l'iva?{' '}
                    <Switch
                        checkedChildren="Sì"
                        unCheckedChildren="No"
                        onChange={setHasIva}
                    />
                </Col>
                {hasIva && (
                    <Col span={12}>
                        <Form.Item
                            label="Iva"
                            name="iva"
                            initialValue={settings.iva}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <InputNumber
                                prefix="%"
                                placeholder="Iva"
                                step="0.01"
                            />
                        </Form.Item>
                    </Col>
                )}
            </Row>
            <Row align="middle">
                <Col span={12}>
                    Voui applicare uno sconto?{' '}
                    <Switch
                        checkedChildren="Sì"
                        unCheckedChildren="No"
                        onChange={setHasDiscount}
                    />
                </Col>
                {hasDiscount && (
                    <Col span={12}>
                        <Form.Item
                            label="Sconto"
                            name="discount"
                            initialValue={0}
                        >
                            <InputNumber
                                prefix="€"
                                placeholder="Sconto"
                                step="0.01"
                            />
                        </Form.Item>
                    </Col>
                )}
            </Row>
        </>
    )
}

export default PricesForm
