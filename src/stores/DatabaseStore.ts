import { create } from 'zustand'
import { cars, customers } from '../db/models'
import { Db } from '../db/utils'
import { Car, Customer, EstimateWithRelated } from '../types/data'

async function getEstimates() {
    let db = await Db.instance.db
    return db.select(
        `SELECT 
            e.*,
            c.name AS customer_name,
            c.email AS customer_email,
            c.phone_number AS customer_phone,
            car.maker AS car_maker,
            car.model AS car_model,
            car.number_plate AS car_number_plate
        FROM 
            estimates e
        LEFT JOIN 
            customers c ON e.customer_id = c.id
        LEFT JOIN 
            cars car ON e.car_id = car.id
        ORDER BY id DESC;`
    )
}

interface StoreState {
    customers: Customer[]
    cars: Car[]
    estimates: EstimateWithRelated[]
    refetchCustomers: () => void
    refetchCars: () => void
    refetchEstimates: () => void
}

const useDatabaseStore = create<StoreState>((set) => ({
    customers: [],
    cars: [],
    estimates: [],
    refetchCustomers: () => {
        customers.getAll().then((res) => set({ customers: res as Customer[] }))
        useDatabaseStore.getState().refetchCars()
        useDatabaseStore.getState().refetchEstimates()
    },
    refetchCars: () => {
        cars.getAll().then((res) => set({ cars: res as Car[] }))
        useDatabaseStore.getState().refetchEstimates()
    },
    refetchEstimates: async () => {
        getEstimates().then((res) =>
            set({ estimates: res as EstimateWithRelated[] })
        )
    },
}))

// Initial fetching of data
customers.getAll().then((res) => {
    useDatabaseStore.setState({ customers: res as Customer[] })
})
cars.getAll().then((res) => {
    useDatabaseStore.setState({ cars: res as Car[] })
})
getEstimates().then((res) =>
    useDatabaseStore.setState({ estimates: res as EstimateWithRelated[] })
)

export default useDatabaseStore
