import DrawerForm from '../components/forms/DrawerForm'
import EstimateFrom from '../components/forms/estimate/EstimateFrom'

export default function EstimatesPage() {
    return (
        <>
            <DrawerForm drawerProps={{ width: '70vw' }}>
                <EstimateFrom />
            </DrawerForm>
        </>
    )
}
