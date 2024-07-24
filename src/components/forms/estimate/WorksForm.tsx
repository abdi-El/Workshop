import {
    MinusCircleOutlined,
    PlusOutlined,
    RiseOutlined,
} from '@ant-design/icons'
import { Button, Form, Input, InputNumber } from 'antd'
import React from 'react'

const WorksForm: React.FC = () => {
    return (
        <>
            <Form.List name="works_done">
                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Form.Item
                                required={false}
                                key={key}
                                style={{ marginBottom: 5 }}
                            >
                                <Form.Item
                                    {...restField}
                                    name={[name, 'name']}
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                    noStyle
                                >
                                    <Input.TextArea
                                        placeholder="Voce"
                                        rows={1}
                                        style={{ width: '50%' }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'price']}
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                    noStyle
                                >
                                    <InputNumber
                                        placeholder="Prezzo"
                                        step="0.01"
                                        min={0}
                                        prefix="€"
                                        style={{ width: '15%' }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'quantity']}
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                    noStyle
                                >
                                    <InputNumber
                                        placeholder="Quantità"
                                        step="0.01"
                                        min={0}
                                        prefix={<RiseOutlined />}
                                        style={{ width: '15%' }}
                                    />
                                </Form.Item>
                                <MinusCircleOutlined
                                    style={{ marginLeft: '5px' }}
                                    onClick={() => remove(name)}
                                />
                            </Form.Item>
                        ))}
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                style={{ width: '60%' }}
                                icon={<PlusOutlined />}
                            >
                                Aggiungi una voce
                            </Button>
                            <Form.ErrorList errors={errors} />
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item
                name="hours_worked"
                label="Ore Lavorate"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <InputNumber placeholder="ore lavorate" step="0.01" min={0.0} />
            </Form.Item>
            <Form.Item name="notes" label="Note">
                <Input.TextArea
                    placeholder="Note"
                    style={{ width: '80%' }}
                    rows={5}
                />
            </Form.Item>
        </>
    )
}

export default WorksForm
