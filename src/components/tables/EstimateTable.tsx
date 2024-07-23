import { FilePdfOutlined } from '@ant-design/icons'
import type { InputRef, TableColumnsType } from 'antd'
import { Button, Table } from 'antd'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { estimates } from '../../db/models'
import useDatabaseStore from '../../stores/DatabaseStore'
import useGlobalStore from '../../stores/GlobalStore'
import { Estimate } from '../../types/data'
import ActionButtons from '../buttons/ActionButtons'
import { pathConstants } from '../Layout'
import EstimateModal, { EtiamteModalProps } from '../modals/EstimateModal'
import { getColumnSearchProps } from '../utils'

const EstinateTable: React.FC = () => {
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const data = useDatabaseStore((state) => state.estimates)
    const refetch = useDatabaseStore((state) => state.refetchEstimates)
    const searchInput = useRef<InputRef>(null)
    const navigate = useNavigate()
    const setDrawerOpen = useGlobalStore((state) => state.updateDrawerState)

    const [modalState, setModalState] = useState<EtiamteModalProps>({
        open: false,
        onCancel: () => setModalState((prev) => ({ ...prev, open: false })),
        estimate: undefined,
    })

    const columns: TableColumnsType<Estimate> = [
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
            title: 'Targa',
            dataIndex: 'number_plate',
            key: 'number_plate',
            width: '20%',
            ...getColumnSearchProps(
                'number_plate',
                setSearchText,
                setSearchedColumn,
                searchInput
            ),
        },
        {
            title: 'Nome Cliente',
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
            title: 'Azioni',
            render: (row: Estimate) => {
                return (
                    <ActionButtons
                        onDelete={() => {
                            estimates.delete(row.id).then(() => refetch())
                        }}
                        onEdit={() => {
                            navigate(`${pathConstants.ESTIMATES.key}/${row.id}`)
                            setDrawerOpen(true)
                        }}
                    >
                        <Button
                            shape="round"
                            icon={<FilePdfOutlined />}
                            onClick={() =>
                                setModalState((prev) => ({
                                    ...prev,
                                    open: true,
                                    estimate: row,
                                }))
                            }
                        />
                    </ActionButtons>
                )
            },
        },
    ]

    return (
        <>
            <EstimateModal {...modalState} />
            <Table rowKey="id" columns={columns} dataSource={data} />
        </>
    )
}

export default EstinateTable
