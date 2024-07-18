import { create } from 'zustand'
import { customers } from '../db/models'
import { Customer } from '../types/data'

interface DatabaseState {
  customers: Customer[]
  refetch: ()=>void
}


const useCustomesStore = create<DatabaseState>()((set) => ({
  customers: [],
  refetch: () => {
    customers.getAll().then((res)=>set((state) => ({ customers: res as Customer[] })))
  },
}))

customers.getAll().then((res)=>{
    useCustomesStore.setState({customers:res as Customer[]})
})
export default useCustomesStore