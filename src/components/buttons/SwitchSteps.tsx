import { Button, FormInstance, Steps, theme } from 'antd'
import React, { useState } from 'react'

type Step = {
    title: string
    content: JSX.Element | JSX.Element[]
}
interface Props {
    steps: Step[]
    form?: FormInstance<any>
}

export default function SwitchSteps({ steps, form }: Props) {
    const { token } = theme.useToken()
    const [current, setCurrent] = useState(0)

    const next = () => {
        if (form) {
            form.validateFields().then(() => {
                setCurrent(current + 1)
            })
        } else {
            setCurrent(current + 1)
        }
    }

    const prev = () => {
        setCurrent(current - 1)
    }

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }))

    const contentStyle: React.CSSProperties = {
        lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    }

    return (
        <>
            <Steps current={current} items={items} />
            <div style={contentStyle}>{steps[current].content}</div>
            <div style={{ marginTop: 24 }}>
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Step successivo
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={() => {
                            setCurrent(0)
                            form?.submit()
                        }}
                    >
                        Fatto
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Step precedente
                    </Button>
                )}
            </div>
        </>
    )
}
