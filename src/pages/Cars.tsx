import { PlusOutlined } from '@ant-design/icons'
import { Drawer, FloatButton } from 'antd'
import { useState } from 'react'
import CarsForm from '../components/forms/CarsForm'
import CarsTable from '../components/tables/CarsTable'

export default function CarsPage() {
    const [drawerOpen, setDrawerOpen] = useState(false)

    return (
        <>
            <CarsTable />
            <FloatButton
                icon={<PlusOutlined />}
                onClick={() => setDrawerOpen(true)}
            />
            <Drawer
                title="Crea una nuova auto"
                onClose={() => {
                    setDrawerOpen(false)
                }}
                open={drawerOpen}
            >
                <CarsForm />
            </Drawer>
        </>
    )
}
