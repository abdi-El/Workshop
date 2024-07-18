import CarsForm from '../components/forms/CarsForm'
import DrawerForm from '../components/forms/DrawerForm'
import CarsTable from '../components/tables/CarsTable'

export default function CarsPage() {
    return (
        <>
            <CarsTable />
            <DrawerForm>
                <CarsForm />
            </DrawerForm>
        </>
    )
}
