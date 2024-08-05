import { FilePdfOutlined } from '@ant-design/icons'
import type { InputRef, TableColumnsType } from 'antd'
import { Button, Table } from 'antd'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { estimates } from '../../db/models'
import { parseDate } from '../../modules/utils'
import useDatabaseStore from '../../stores/DatabaseStore'
import useGlobalStore from '../../stores/GlobalStore'
import { EstimateWithRelated } from '../../types/data'
import ActionButtons from '../buttons/ActionButtons'
import { pathConstants } from '../Layout'
import EstimateModal from '../modals/EstimateModal'
import { getColumnSearchProps } from '../utils'

const EstinateTable: React.FC = () => {
    const [_, setSearchText] = useState('')
    const [__, setSearchedColumn] = useState('')
    const data = useDatabaseStore((state) => state.estimates)
    const refetch = useDatabaseStore((state) => state.refetchEstimates)
    const searchInput = useRef<InputRef>(null)
    const navigate = useNavigate()
    const setDrawerOpen = useGlobalStore((state) => state.updateDrawerState)

    const [isOpen, setIsOpen] = useState(false)
    const [estimate, setEstimate] = useState<EstimateWithRelated>()

    const columns: TableColumnsType<EstimateWithRelated> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
            ...getColumnSearchProps(
                'id',
                setSearchText,
                setSearchedColumn,
                searchInput
            ),
        },
        {
            title: 'Cliente',
            dataIndex: 'customer_name',
            key: 'customer_name',
            width: '10%',
            ...getColumnSearchProps(
                'customer_name',
                setSearchText,
                setSearchedColumn,
                searchInput
            ),
        },
        {
            title: 'Targa',
            dataIndex: 'car_number_plate',
            key: 'car_number_plate',
            width: '10%',
            ...getColumnSearchProps(
                'car_number_plate',
                setSearchText,
                setSearchedColumn,
                searchInput
            ),
        },
        {
            title: 'Data creazione',
            dataIndex: 'created_at',
            key: 'created_at',
            width: '20%',
            render: (date) => parseDate(date),
        },
        {
            title: 'Azioni',
            render: (estiamte: EstimateWithRelated) => {
                return (
                    <ActionButtons
                        onDelete={() => {
                            estimates.delete(estiamte.id).then(() => refetch())
                        }}
                        onEdit={() => {
                            navigate(
                                `${pathConstants.ESTIMATES.key}/${estiamte.id}`
                            )
                            setDrawerOpen(true)
                        }}
                    >
                        <Button
                            shape="round"
                            icon={<FilePdfOutlined />}
                            onClick={() => {
                                setIsOpen(true)
                                setEstimate(estiamte)
                            }}
                        />
                    </ActionButtons>
                )
            },
        },
    ]

    return (
        <>
            {estimate && (
                <EstimateModal
                    estimate={estimate}
                    onCancel={() => {
                        setIsOpen(false), setEstimate(undefined)
                    }}
                    open={isOpen}
                />
            )}
            <Table rowKey="id" columns={columns} dataSource={data} />
        </>
    )
}

export default EstinateTable
