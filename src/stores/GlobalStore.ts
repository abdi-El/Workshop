import { create } from 'zustand'
import { Settings } from '../types/data'

interface GlobalState {
  settings: Settings
  updateSettings: (newSettings: Partial<Settings>) => void
}

const useGlobalStore = create<GlobalState>()((set) => ({
  settings: {} as Settings,
  updateSettings: (newSettings) => {set((state) => ({ settings: {...state.settings, ...newSettings} }))},
}))

export default useGlobalStore