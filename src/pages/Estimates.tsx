import { useNavigate, useParams } from 'react-router-dom'
import DrawerForm from '../components/forms/DrawerForm'
import EstimateFrom from '../components/forms/estimate/EstimateFrom'
import { pathConstants } from '../components/Layout'
import EstinateTable from '../components/tables/EstimateTable'
import useGlobalStore from '../stores/GlobalStore'

export default function EstimatesPage() {
    const { estimateId } = useParams()
    const setDrawerOpen = useGlobalStore((state) => state.updateDrawerState)
    const navigate = useNavigate()

    return (
        <>
            <EstinateTable />
            <DrawerForm
                drawerProps={{
                    width: '90vw',
                    title: `${estimateId ? 'Aggiorna' : 'Crea'} preventivo:`,
                }}
                onClose={() => {
                    navigate(pathConstants.ESTIMATES.key)
                }}
            >
                <EstimateFrom
                    onFinish={() => setDrawerOpen(false)}
                    estimateId={parseInt(estimateId!)}
                />
            </DrawerForm>
        </>
    )
}
