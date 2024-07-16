import type { InputRef, TableColumnsType } from 'antd'
import { Table } from 'antd'
import React, { useRef, useState } from 'react'
import { Car } from '../../types/data'
import { getColumnSearchProps } from '../utils'

interface DataType extends Car {
    key: string
}

const data: DataType[] = [
    {
        key: '1',
        maker: 'Toyota',
        model: 'Hilux',
        number_plate: 'ET686AT',
        km: 21554654,
        owner: 'Mario rossi',
    },
    {
        key: '2',
        maker: 'Hiunday',
        model: 'i30',
        number_plate: 'TR535AS',
        km: 35465465,
        owner: 'Giovanna pinco',
    },
    {
        key: '3',
        maker: 'Citroen',
        model: 'Berlingo',
        number_plate: 'TY545AS',
        km: 215544,
        owner: 'Maria rossi',
    },
    {
        key: '4',
        maker: 'Iveco',
        model: 'Daily',
        number_plate: 'TY888TY',
        km: 21554,
        owner: 'Andrea Gonzales',
    },
]

const CarsTable: React.FC = () => {
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const searchInput = useRef<InputRef>(null)

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Targa',
            dataIndex: 'number_plate',
            key: 'number_plate',
            width: '30%',
            ...getColumnSearchProps(
                'number_plate',
                setSearchText,
                setSearchedColumn,
                searchInput
            ),
        },
        {
            title: 'Modello',
            dataIndex: 'model',
            key: 'model',
            width: '20%',
            ...getColumnSearchProps(
                'model',
                setSearchText,
                setSearchedColumn,
                searchInput
            ),
        },
        {
            title: 'Km',
            dataIndex: 'km',
            key: 'km',
            sorter: (a, b) => a.km - b.km,
            sortDirections: ['descend', 'ascend'],
        },
    ]

    return <Table columns={columns} dataSource={data} />
}

export default CarsTable
