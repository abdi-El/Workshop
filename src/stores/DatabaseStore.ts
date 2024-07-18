import { create } from 'zustand'
import { cars, customers } from '../db/models'
import { Car, Customer } from '../types/data'

interface CustomerState {
  customers: Customer[]
  refetch: ()=>void
}
interface CarsState {
  cars: Car[]
  refetch: ()=>void
}

export const useCustomesStore = create<CustomerState>()((set) => ({
  customers: [],
  refetch: () => {
    customers.getAll().then((res)=>set((state) => ({ customers: res as Customer[] })))
  },
}))

export const useCarsStore = create<CarsState>()((set) => ({
  cars: [],
  refetch: () => {
    cars.getAll().then((res)=>set((state) => ({ cars: res as Car[] })))
  },
}))

customers.getAll().then((res)=>{
    useCustomesStore.setState({customers:res as Customer[]})
})
cars.getAll().then((res)=>{
  useCustomesStore.setState({customers:res as Customer[]})
})
