import { create } from 'zustand'
import { cars, customers, estimates } from '../db/models'
import { Car, Customer, Estimate } from '../types/data'

interface StoreState {
    customers: Customer[]
    cars: Car[]
    estimates: Estimate[]
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
    refetchEstimates: () => {
        estimates.getAll().then((res) => set({ estimates: res as Estimate[] }))
    },
}))

// Initial fetching of data
customers.getAll().then((res) => {
    useDatabaseStore.setState({ customers: res as Customer[] })
})
cars.getAll().then((res) => {
    useDatabaseStore.setState({ cars: res as Car[] })
})
estimates.getAll().then((res) => {
    useDatabaseStore.setState({ estimates: res as Estimate[] })
})

export default useDatabaseStore
