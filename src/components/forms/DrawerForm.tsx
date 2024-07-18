import { PlusOutlined } from '@ant-design/icons'
import { Drawer, FloatButton } from 'antd'
import { useState } from 'react'

type Props = {
    children: JSX.Element | JSX.Element[]
}

export default function DrawerForm(props: Props) {
    const [drawerOpen, setDrawerOpen] = useState(false)

    return (
        <>
            <FloatButton
                icon={<PlusOutlined />}
                onClick={() => setDrawerOpen(true)}
            />
            <Drawer
                title="Crea un nuovo utente"
                onClose={() => {
                    setDrawerOpen(false)
                }}
                open={drawerOpen}
            >
                {props.children}
            </Drawer>
        </>
    )
}
