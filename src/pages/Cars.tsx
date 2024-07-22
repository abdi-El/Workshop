import { useNavigate, useParams } from 'react-router-dom'
import CarsForm from '../components/forms/CarsForm'
import DrawerForm from '../components/forms/DrawerForm'
import { pathConstants } from '../components/Layout'
import CarsTable from '../components/tables/CarsTable'
import useGlobalStore from '../stores/GlobalStore'

export default function CarsPage() {
    const { carId } = useParams()
    const setDrawerOpen = useGlobalStore((state) => state.updateDrawerState)
    const navigate = useNavigate()
    return (
        <>
            <CarsTable />
            <DrawerForm
                onClose={() => {
                    navigate(pathConstants.CARS.key)
                }}
                drawerProps={{ title: `${carId ? 'Aggiorna' : 'Crea'} auto:` }}
            >
                <CarsForm
                    carId={parseInt(carId!)}
                    onFinish={() => setDrawerOpen(false)}
                />
            </DrawerForm>
        </>
    )
}
