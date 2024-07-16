import { ConfigProvider, theme } from 'antd'
import itIT from 'antd/locale/it_IT'

import { RouterProvider } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { router } from './router'
import useGlobalStore from './stores/GlobalStore'

export default function App() {
    const isDarkTheme = useGlobalStore(
        useShallow((state) => state.settings.isDarkTheme)
    )
    return (
        <ConfigProvider
            theme={{
                algorithm: isDarkTheme
                    ? theme.darkAlgorithm
                    : theme.defaultAlgorithm,
            }}
            locale={itIT}
        >
            <RouterProvider router={router} />
        </ConfigProvider>
    )
}
