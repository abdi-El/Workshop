import DrawerForm from '../components/forms/DrawerForm'
import EstimateFrom from '../components/forms/estimate/EstimateFrom'
import useGlobalStore from '../stores/GlobalStore'

export default function EstimatesPage() {
    const setDrawerOpen = useGlobalStore((state) => state.updateDrawerState)

    return (
        <>
            <DrawerForm drawerProps={{ width: '70vw' }}>
                <EstimateFrom onFinish={() => setDrawerOpen(false)} />
            </DrawerForm>
        </>
    )
}
