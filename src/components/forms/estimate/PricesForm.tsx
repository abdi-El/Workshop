import { Form, InputNumber } from 'antd'
import React from 'react'
import { useShallow } from 'zustand/react/shallow'
import useGlobalStore from '../../../stores/GlobalStore'

const PricesForm: React.FC = () => {
    const settings = useGlobalStore(useShallow((state) => state.settings))

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
                <InputNumber prefix="%" placeholder="Iva" step="0.01" />
            </Form.Item>
            <Form.Item label="Sconto" name="discount" initialValue={0}>
                <InputNumber prefix="€" placeholder="Sconto" step="0.01" />
            </Form.Item>
        </>
    )
}

export default PricesForm
