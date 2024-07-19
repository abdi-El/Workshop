import { useParams } from 'react-router-dom'
import CarsForm from '../components/forms/CarsForm'
import DrawerForm from '../components/forms/DrawerForm'
import CarsTable from '../components/tables/CarsTable'
import useGlobalStore from '../stores/GlobalStore'

export default function CarsPage() {
    const { carId } = useParams()
    const setDrawerOpen = useGlobalStore((state) => state.updateDrawerState)

    return (
        <>
            <CarsTable />
            <DrawerForm>
                <CarsForm
                    carId={carId ? parseInt(carId) : undefined}
                    onFinish={() => setDrawerOpen(false)}
                />
            </DrawerForm>
        </>
    )
}
