import { PlusOutlined } from '@ant-design/icons'
import { Drawer, FloatButton } from 'antd'
import { useShallow } from 'zustand/react/shallow'
import useGlobalStore from '../../stores/GlobalStore'

type Props = {
    children: JSX.Element | JSX.Element[]
    onClose?(): void
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
                width={'70vw'}
                title="Dati:"
                onClose={() => {
                    setDrawerOpen(false)
                    props.onClose!()
                }}
                open={drawerOpen}
            >
                {props.children}
            </Drawer>
        </>
    )
}
