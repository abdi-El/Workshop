import { PlusOutlined } from '@ant-design/icons'
import { Drawer, FloatButton } from 'antd'
import { useShallow } from 'zustand/react/shallow'
import useGlobalStore from '../../stores/GlobalStore'

type Props = {
    children: JSX.Element | JSX.Element[]
}

export default function DrawerForm(props: Props) {
    const drawerOpen = useGlobalStore(useShallow((state) => state.drawerState))
    const setDrawerOpen = useGlobalStore((state) => state.updateDrawerState)

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
