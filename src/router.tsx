import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import BaseLayout, { pathConstants } from './components/Layout'
import { PageNotFound } from './pages/404'

const HomePage = React.lazy(() => import('./pages/Home'))
const EstimatesPage = React.lazy(() => import('./pages/Estimates'))
const CustomersPage = React.lazy(() => import('./pages/Customers'))
const CarsPage = React.lazy(() => import('./pages/Cars'))
const SettingsPage = React.lazy(() => import('./pages/Settings'))

const router = createBrowserRouter([
    {
        element: <BaseLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: pathConstants.ESTIMATES.key,
                element: <EstimatesPage />,
            },
            {
                path: `${pathConstants.ESTIMATES.key}/:estimateId`,
                element: <EstimatesPage />,
            },
            {
                path: pathConstants.CUSTOMERS.key,
                element: <CustomersPage />,
            },
            {
                path: `${pathConstants.CUSTOMERS.key}/:customerId`,
                element: <CustomersPage />,
            },
            {
                path: pathConstants.CARS.key,
                element: <CarsPage />,
            },
            {
                path: `${pathConstants.CARS.key}/:carId`,
                element: <CarsPage />,
            },
            {
                path: pathConstants.SETTINGS.key,
                element: <SettingsPage />,
            },
            {
                path: '*',
                element: <PageNotFound />,
            },
        ],
    },
])

export { router }
