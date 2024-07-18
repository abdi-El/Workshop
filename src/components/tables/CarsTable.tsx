import type { InputRef, TableColumnsType } from 'antd'
import { Table } from 'antd'
import React, { useRef, useState } from 'react'
import { useCarsStore } from '../../stores/DatabaseStore'
import { Car } from '../../types/data'
import { getColumnSearchProps } from '../utils'

const CarsTable: React.FC = () => {
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const data = useCarsStore((state) => state.cars)
    const searchInput = useRef<InputRef>(null)

    const columns: TableColumnsType<Car> = [
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

    return <Table rowKey="id" columns={columns} dataSource={data} />
}

export default CarsTable
