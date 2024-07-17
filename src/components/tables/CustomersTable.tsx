import type { InputRef, TableColumnsType } from 'antd'
import { Table } from 'antd'
import React, { useRef, useState } from 'react'
import { Customer } from '../../types/data'
import { getColumnSearchProps } from '../utils'

interface DataType extends Customer {
    key: string
}

const data: DataType[] = [
    {
        key: '1',
        name: 'AB',
        phone_number: '6659874584',
        email: 'ab@aal.cyx',
    },
    {
        key: '2',
        name: 'at',
        phone_number: '6659874584',
        email: 'abas@al.cyx',
    },
    {
        key: '3',
        name: 'asr',
        phone_number: '8895978462',
        email: 'abasdd@al.cyx',
    },
    {
        key: '4',
        name: 'asdr',
        phone_number: '889568954',
        email: 'abaaasd@al.cyx',
    },
]

const CustomersTable: React.FC = () => {
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const searchInput = useRef<InputRef>(null)

    const columns: TableColumnsType<DataType> = [
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
    ]

    return <Table columns={columns} dataSource={data} />
}

export default CustomersTable
