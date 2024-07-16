import { ConfigProvider, theme } from 'antd'
import itIT from 'antd/locale/it_IT'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
            }}
            locale={itIT}
        >
            <RouterProvider router={router} />
        </ConfigProvider>
    </React.StrictMode>
)
