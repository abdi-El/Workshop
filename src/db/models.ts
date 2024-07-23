import { Model } from './utils'

export const customers = new Model('customers')
export const cars = new Model('cars', ['customer_id'])
export const estimates = new Model('estimates', ['customer_id', 'car_id'])
