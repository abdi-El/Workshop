import { Select } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { useEffect, useState } from 'react'
import useDatabaseStore from '../../stores/DatabaseStore'
import { Car } from '../../types/data'

interface Props {
    customerId?: number
}

export default function CarSelect({ customerId }: Props) {
    const cars: Car[] = useDatabaseStore((state) => state.cars)
    const [filteredCars, setFilteredCars] = useState<Car[]>([])
    useEffect(() => {
        if (customerId) {
            setFilteredCars(cars.filter((car) => car.customer_id == customerId))
        }
    }, [customerId])
    return (
        <FormItem
            label="Auto"
            name="car_id"
            rules={[
                {
                    required: true,
                },
            ]}
        >
            <Select
                showSearch
                placeholder="Seleziona un' auto"
                filterOption={(input, option) =>
                    (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                }
                options={filteredCars.map((car) => ({
                    value: car.id,
                    label: `${car.maker}-${car.model}-${car.number_plate}`,
                }))}
            />
        </FormItem>
    )
}
