import { create } from 'zustand'
import { Settings } from '../types/data'

interface GlobalState {
  settings: Settings
  updateSettings: (newSettings: Partial<Settings>) => void
}

const useGlobalStore = create<GlobalState>()((set) => ({
  settings: {} as Settings,
  updateSettings: (newSettings) => {
    set((state) => {
      let newStateSettings = {...state.settings, ...newSettings} 
      localStorage.setItem("settings", JSON.stringify(newStateSettings))
      return { settings: newStateSettings }} )
    },
}))
useGlobalStore.setState({settings: JSON.parse(localStorage.getItem("settings") || "{}")})  
export default useGlobalStore