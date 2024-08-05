interface DataBaseInterface {
    id: number
    created_at: string
    updated_at: string
}

export type WorkDone = { name: string; price: number; quantity: number }

export interface Workshop {
    workshop_name: string
    workshop_address: string
    workshop_phone_number: string
    workshop_p_iva: string
    workforce_price: number
    iva: number
}

export interface Settings extends Workshop {
    isDarkTheme: boolean
}

export interface Car extends DataBaseInterface {
    maker: string
    model: string
    number_plate: string
    km: number
    customer_id: number
}

export interface Customer extends DataBaseInterface {
    name: string
    email: string
    phone_number: string
}

export interface Estimate extends Workshop, DataBaseInterface {
    car_id: number
    customer_id: number
    works_done: string
    hours_worked: number
    discount: number | null
    notes: string | null
    km: number
}

export interface EstimateWithRelated extends Estimate {
    customer_id: number
    customer_phone: string
    customer_name: string
    customer_email: string
    car_id: number
    car_maker: string
    car_model: string
    car_number_plate: string
    km: number
}
