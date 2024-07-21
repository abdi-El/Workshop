interface DataBaseInterface {
    id: number
}

export interface Settings {
    workshop_name: string
    workshop_address: string
    workshop_phone_number: string
    workshop_p_iva: string
    isDarkTheme: boolean
    workforce_price: number
    iva: number
}

export interface Car extends DataBaseInterface {
    maker: string
    model: string
    number_plate: string
    km: number
    owner: number
}

export interface Customer extends DataBaseInterface {
    name: string
    email: string
    phone_number: string
}
