import type { InputRef, TableColumnsType } from 'antd'
import { message, Table } from 'antd'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cars } from '../../db/models'
import useDatabaseStore from '../../stores/DatabaseStore'
import useGlobalStore from '../../stores/GlobalStore'
import { Car, Estimate } from '../../types/data'
import ActionButtons from '../buttons/ActionButtons'
import { pathConstants } from '../Layout'
import { getColumnSearchProps } from '../utils'

const EstinateTable: React.FC = () => {
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const data = useDatabaseStore((state) => state.estimates)
    const refetch = useDatabaseStore((state) => state.refetchEstimates)
    const searchInput = useRef<InputRef>(null)
    const navigate = useNavigate()
    const setDrawerOpen = useGlobalStore((state) => state.updateDrawerState)

    const columns: TableColumnsType<Estimate> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width: '30%',
            ...getColumnSearchProps(
                'id',
                setSearchText,
                setSearchedColumn,
                searchInput
            ),
        },
        {
            title: 'Azioni',
            render: (row: Car) => {
                return (
                    <ActionButtons
                        onDelete={() => {
                            cars.delete(row.id).then(() => {
                                message.success(
                                    'Preventivo eliminato correttamente'
                                )
                                refetch()
                            })
                        }}
                        onEdit={() => {
                            navigate(`${pathConstants.ESTIMATES.key}/${row.id}`)
                            setDrawerOpen(true)
                        }}
                    />
                )
            },
        },
    ]

    return <Table rowKey="id" columns={columns} dataSource={data} />
}

export default EstinateTable
