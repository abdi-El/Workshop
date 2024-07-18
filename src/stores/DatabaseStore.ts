import { create } from 'zustand'
import { cars, customers } from '../db/models'
import { Car, Customer } from '../types/data'

interface StoreState {
  customers: Customer[]
  cars: Car[]
  refetchCustomers: () => void
  refetchCars: () => void
}

const useDatabaseStore = create<StoreState>((set) => ({
  customers: [],
  cars: [],
  refetchCustomers: () => {
    customers.getAll().then((res) => set({ customers: res as Customer[] }))
    useDatabaseStore.getState().refetchCars();
  },
  refetchCars: () => {
    cars.getAll().then((res) => set({ cars: res as Car[] }))
  },
}))

// Initial fetching of data
customers.getAll().then((res) => {
  useDatabaseStore.setState({ customers: res as Customer[] })
})
cars.getAll().then((res) => {
  useDatabaseStore.setState({ cars: res as Car[] })
})

export default useDatabaseStore