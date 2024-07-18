import { DeleteOutlined } from '@ant-design/icons'
import type { InputRef, TableColumnsType } from 'antd'
import { Button, Table } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { customers } from '../../db/models'
import { Customer } from '../../types/data'
import { getColumnSearchProps } from '../utils'

const CustomersTable: React.FC = () => {
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const searchInput = useRef<InputRef>(null)

    const [data, setData] = useState<Customer[]>()

    useEffect(() => {
        customers.getAll().then((res) => {
            setData(res as Customer[])
        })
    }, [])

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
                    <>
                        <Button
                            type="primary"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => {
                                customers.delete(row.id)
                            }}
                        ></Button>
                    </>
                )
            },
        },
    ]

    return <Table rowKey="id" columns={columns} dataSource={data} />
}

export default CustomersTable
