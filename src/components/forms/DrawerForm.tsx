import { PlusOutlined } from '@ant-design/icons'
import { Drawer, DrawerProps, FloatButton } from 'antd'
import { useShallow } from 'zustand/react/shallow'
import useGlobalStore from '../../stores/GlobalStore'

type Props = {
    children: JSX.Element | JSX.Element[]
    onClose?(): void
    drawerProps?: DrawerProps
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
                title="Dati:"
                onClose={() => {
                    setDrawerOpen(false)
                    props.onClose!()
                }}
                open={drawerOpen}
                {...props.drawerProps}
            >
                {props.children}
            </Drawer>
        </>
    )
}
