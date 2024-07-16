import { create } from 'zustand'
import { Settings } from '../types/store'

interface SettingsState {
  settings: Settings
  updateSettings: (newSettings: any) => void
}

const useGlobalStore = create<SettingsState>()((set) => ({
  settings: {
    workshop_name: "Officina Leporatti",
    p_iva: "3215464",
    address: "via ghibellina 20"
  },
  updateSettings: (newSettings) => set((state) => ({ settings: {...state.settings, ...newSettings} })),
}))

export default useGlobalStore