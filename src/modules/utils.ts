import { EstimateWithRelated, WorkDone } from '../types/data'

export function parseDate(date: string): string {
    let dateObject = new Date(date)
    const day = dateObject.getDate().toString().padStart(2, '0')
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0')
    const year = dateObject.getFullYear()
    return `${day}/${month}/${year}`
}

function percentage(num: number, per: number): number {
    return num + (num / 100) * per
}

export function calculatePrice(estimate: EstimateWithRelated): number {
    let worksPrice = (JSON.parse(estimate.works_done) || []).reduce(
        (sum: number, item: WorkDone) => sum + item.price * item.quantity,
        0
    )
    let workForcePrice = estimate.hours_worked * estimate.workforce_price
    let total = worksPrice + workForcePrice - (estimate.discount || 0)

    return percentage(total, estimate.iva || 0)
}
