import { useParams } from 'react-router-dom'
import CarsForm from '../components/forms/CarsForm'
import DrawerForm from '../components/forms/DrawerForm'
import CarsTable from '../components/tables/CarsTable'

export default function CarsPage() {
    const { carId } = useParams()
    return (
        <>
            <CarsTable />
            <DrawerForm>
                <CarsForm carId={carId} />
            </DrawerForm>
        </>
    )
}
