import { Select } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import useDatabaseStore from '../../stores/DatabaseStore'
import { Customer } from '../../types/data'

export default function CustomerSelect() {
    const customers: Customer[] = useDatabaseStore((state) => state.customers)

    return (
        <FormItem
            label="Proprietario"
            name="customer_id"
            rules={[
                {
                    required: true,
                },
            ]}
        >
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
        </FormItem>
    )
}
