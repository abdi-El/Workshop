import { create } from 'zustand'
import { Settings } from '../types/data'

interface GlobalState {
  settings: Settings
  updateSettings: (newSettings: Partial<Settings>) => void
}
let initialSettings = JSON.parse(localStorage.getItem("settings") || "{}")

const useGlobalStore = create<GlobalState>()((set) => ({
  settings: initialSettings as Settings,
  updateSettings: (newSettings) => {
    set((state) => {
      let newStateSettings = {...state.settings, ...newSettings} 
      localStorage.setItem("settings", JSON.stringify(newStateSettings))
      return { settings: newStateSettings }} )
  },
}))

export default useGlobalStore