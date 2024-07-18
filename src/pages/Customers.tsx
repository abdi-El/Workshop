import CustomersForm from '../components/forms/CustomersForm'
import DrawerForm from '../components/forms/DrawerForm'
import CustomersTable from '../components/tables/CustomersTable'

export default function CustomersPage() {
    return (
        <>
            <CustomersTable />
            <DrawerForm>
                <CustomersForm />
            </DrawerForm>
        </>
    )
}
