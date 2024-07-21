import { Select } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import useDatabaseStore from '../../stores/DatabaseStore'
import { Car } from '../../types/data'

export default function CarSelect() {
    const cars: Car[] = useDatabaseStore((state) => state.cars)

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
                options={cars.map((car) => ({
                    value: car.id,
                    label: `${car.maker}-${car.model}-${car.number_plate}`,
                }))}
            />
        </FormItem>
    )
}
