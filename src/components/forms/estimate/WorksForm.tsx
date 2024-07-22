import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
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
                                style={{ marginBottom: 0 }}
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
                                        placeholder="Titolo lavoro eseguito"
                                        style={{ width: '40%' }}
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
                                        placeholder="Prezzo lavoro eseguito"
                                        step="0.01"
                                        min={0}
                                        prefix="€"
                                        style={{ width: '40%' }}
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
                                Aggiungi un lavoro
                            </Button>
                            <Button
                                type="dashed"
                                onClick={() => {
                                    add('', 0)
                                }}
                                style={{ width: '60%', marginTop: '20px' }}
                                icon={<PlusOutlined />}
                            >
                                Aggiungi lavoro all'inizio
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
                <InputNumber
                    placeholder="ore lavorate"
                    precision={0.01}
                    min={0}
                />
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
