import { PlusOutlined } from '@ant-design/icons'
import { Drawer, FloatButton } from 'antd'
import { useState } from 'react'
import CustomersForm from '../components/forms/CustomersForm'
import CustomersTable from '../components/tables/CustomersTable'

export default function CustomersPage() {
    const [drawerOpen, setDrawerOpen] = useState(false)
    return (
        <>
            <CustomersTable />
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
                <CustomersForm />
            </Drawer>
        </>
    )
}
