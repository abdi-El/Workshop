import type { InputRef, TableColumnsType } from 'antd'
import { Table } from 'antd'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { customers } from '../../db/models'
import useDatabaseStore from '../../stores/DatabaseStore'
import useGlobalStore from '../../stores/GlobalStore'
import { Customer } from '../../types/data'
import ActionButtons from '../buttons/ActionButtons'
import { pathConstants } from '../Layout'
import { getColumnSearchProps } from '../utils'

const CustomersTable: React.FC = () => {
    const [_, setSearchText] = useState('')
    const [__, setSearchedColumn] = useState('')
    const searchInput = useRef<InputRef>(null)
    const data = useDatabaseStore((state) => state.customers)
    const refetch = useDatabaseStore((state) => state.refetchCustomers)
    const navigate = useNavigate()
    const setDrawerOpen = useGlobalStore((state) => state.updateDrawerState)

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
                                refetch()
                            })
                        }}
                        onEdit={() => {
                            navigate(`${pathConstants.CUSTOMERS.key}/${row.id}`)
                            setDrawerOpen(true)
                        }}
                    />
                )
            },
        },
    ]

    return <Table rowKey="id" columns={columns} dataSource={data} />
}

export default CustomersTable
