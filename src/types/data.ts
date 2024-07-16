export interface Settings {
    workshop_name: string,
    workshop_address: string, 
    p_iva: string,
    isDarkTheme: boolean
    workforce_price: number
    iva: number,
}

export interface Car {
    maker: string
    model: string
    number_plate: string
    km: number
    owner: string
}