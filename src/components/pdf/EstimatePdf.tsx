import { calculatePrice } from '../../modules/utils'
import { EstimateWithRelated, WorkDone, Workshop } from '../../types/data'


export default function EstimatePdf({ estimate }: Props) {
    let workShopData = JSON.parse(
        localStorage.getItem('settings') || '{}'
    ) as Workshop


    return "estimate pdf"
}
