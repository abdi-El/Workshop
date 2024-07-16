import { create } from 'zustand'
import { Settings } from '../types/data'

interface GlobalState {
  settings: Settings
  updateSettings: (newSettings: Partial<Settings>) => void
}

const useGlobalStore = create<GlobalState>()((set) => ({
  settings: {
    workshop_name: "Officina Leporatti",
    p_iva: "3215464",
    address: "via ghibellina 20",
    isDarkTheme: true,
  },
  updateSettings: (newSettings) => {set((state) => ({ settings: {...state.settings, ...newSettings} }))},
}))

export default useGlobalStore