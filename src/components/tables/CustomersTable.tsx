import type { InputRef, TableColumnsType } from 'antd'
import { message, Table } from 'antd'
import React, { useRef, useState } from 'react'
import { customers } from '../../db/models'
import useDatabaseStore from '../../stores/DatabaseStore'
import { Customer } from '../../types/data'
import ActionButtons from '../buttons/ActionButtons'
import { getColumnSearchProps } from '../utils'

const CustomersTable: React.FC = () => {
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const searchInput = useRef<InputRef>(null)
    const data = useDatabaseStore((state) => state.customers)
    const refetch = useDatabaseStore((state) => state.refetchCustomers)

    const columns: TableColumnsType<Customer> = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            ...getColumnSearchProps(
                'name',
                setSearchText,
                setSearchedColumn,
                searchInput
            ),
        },
        {
            title: 'Numero di Telefono',
            dataIndex: 'phone_number',
            key: 'phone_number',
            width: '20%',
            ...getColumnSearchProps(
                'phone_number',
                setSearchText,
                setSearchedColumn,
                searchInput
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps(
                'email',
                setSearchText,
                setSearchedColumn,
                searchInput
            ),
        },
        {
            title: 'Azioni',
            render: (row) => {
                return (
                    <ActionButtons
                        onDelete={() => {
                            customers.delete(row.id).then(() => {
                                message.success(
                                    'Utente eliminato correttamente'
                                )
                                refetch()
                            })
                        }}
                        onEdit={() => {
                            message.success('edit clicked')
                        }}
                    />
                )
            },
        },
    ]

    return <Table rowKey="id" columns={columns} dataSource={data} />
}

export default CustomersTable
