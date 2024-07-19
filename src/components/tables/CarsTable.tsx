import type { InputRef, TableColumnsType } from 'antd'
import { message, Table } from 'antd'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cars } from '../../db/models'
import useDatabaseStore from '../../stores/DatabaseStore'
import { Car } from '../../types/data'
import ActionButtons from '../buttons/ActionButtons'
import { pathConstants } from '../Layout'
import { getColumnSearchProps } from '../utils'

const CarsTable: React.FC = () => {
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const data = useDatabaseStore((state) => state.cars)
    const refetch = useDatabaseStore((state) => state.refetchCars)
    const searchInput = useRef<InputRef>(null)
    const navigate = useNavigate()
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
        {
            title: 'Azioni',
            render: (row: Car) => {
                return (
                    <ActionButtons
                        onDelete={() => {
                            cars.delete(row.id).then(() => {
                                message.success('Auto eliminata correttamente')
                                refetch()
                            })
                        }}
                        onEdit={() => {
                            navigate(`${pathConstants.CARS.key}/${row.id}`)
                        }}
                    />
                )
            },
        },
    ]

    return <Table rowKey="id" columns={columns} dataSource={data} />
}

export default CarsTable
