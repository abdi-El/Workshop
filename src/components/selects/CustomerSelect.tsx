import { Select } from 'antd'
import useCustomesStore from '../../stores/DatabaseStore'
import { Customer } from '../../types/data'

export default function CustomerSelect() {
    const customers: Customer[] = useCustomesStore((state) => state.customers)

    return (
        <Select
            showSearch
            placeholder="Seleziona un cliente"
            filterOption={(input, option) =>
                (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
            }
            options={customers.map((customer) => ({
                value: customer.id,
                label: customer.name,
            }))}
        />
    )
}
