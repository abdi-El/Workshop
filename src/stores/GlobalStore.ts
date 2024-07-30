import { create } from 'zustand'
import { Settings } from '../types/data'

interface GlobalState {
    settings: Settings
    drawerState: boolean
    updateSettings(newSettings: Partial<Settings>): void
    updateDrawerState(newDrawerState: boolean): void
}

const useGlobalStore = create<GlobalState>()((set) => ({
    settings: {} as Settings,
    drawerState: false,
    updateSettings: (newSettings) => {
        set((state) => {
            let newStateSettings = { ...state.settings, ...newSettings }
            localStorage.setItem('settings', JSON.stringify(newStateSettings))
            return { settings: newStateSettings }
        })
    },
    updateDrawerState: (newDrawerState) => {
        set((_) => ({ drawerState: newDrawerState }))
    },
}))
useGlobalStore.setState({
    settings: JSON.parse(localStorage.getItem('settings') || '{}'),
})
export default useGlobalStore
