interface DataBaseInterface {
    id: number
}

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

export interface Estimate extends Workshop, DataBaseInterface {
    car_id: number
    customer_id: number
    works_done: string
    hours_worked: number
    discount: number | null
    notes: string | null
    km: number
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
