import { useNavigate, useParams } from 'react-router-dom'
import CustomersForm from '../components/forms/CustomersForm'
import DrawerForm from '../components/forms/DrawerForm'
import { pathConstants } from '../components/Layout'
import CustomersTable from '../components/tables/CustomersTable'
import useGlobalStore from '../stores/GlobalStore'

export default function CustomersPage() {
    const { customerId } = useParams()
    const setDrawerOpen = useGlobalStore((state) => state.updateDrawerState)
    const navigate = useNavigate()

    return (
        <>
            <CustomersTable />
            <DrawerForm
                onClose={() => {
                    navigate(pathConstants.CUSTOMERS.key)
                }}
                drawerProps={{
                    title: `${customerId ? 'Aggiorna' : 'Crea'} cliente:`,
                }}
            >
                <CustomersForm
                    customerId={parseInt(customerId!)}
                    onFinish={() => setDrawerOpen(false)}
                />
            </DrawerForm>
        </>
    )
}
