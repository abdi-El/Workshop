import { Car, Customer, Estimate } from '../types/data'
import { Model } from './utils'

export const customers = new Model<Customer>('customers')
export const cars = new Model<Car>('cars')
export const estimates = new Model<Estimate>('estimates')
