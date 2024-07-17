import { SearchOutlined } from '@ant-design/icons'
import type { TableColumnType } from 'antd'
import { Button, Input, Space } from 'antd'

export const getColumnSearchProps = (
    dataIndex: any,
    setSearchText: (data: any) => void,
    setSearchedColumn: (data: any) => void,
    searchInput: any
): TableColumnType<any> => ({
    filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        close,
    }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
            <Input
                ref={searchInput}
                placeholder={`Search ${dataIndex}`}
                value={selectedKeys[0]}
                onChange={(e) =>
                    setSelectedKeys(e.target.value ? [e.target.value] : [])
                }
                onPressEnter={() => {
                    confirm()
                    setSearchText(selectedKeys[0])
                    setSearchedColumn(dataIndex)
                }}
                style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
                <Button
                    type="primary"
                    onClick={() => {
                        confirm({ closeDropdown: false })
                        setSearchText(selectedKeys[0])
                        setSearchedColumn(dataIndex)
                    }}
                >
                    Filtra
                </Button>
                <Button
                    onClick={() => {
                        if (clearFilters) {
                            clearFilters()
                            setSearchText('')
                        }
                    }}
                >
                    Reset
                </Button>
                <Button
                    type="link"
                    size="small"
                    onClick={() => {
                        close()
                    }}
                >
                    Chiudi
                </Button>
            </Space>
        </div>
    ),
    filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
        record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
        if (visible) {
            setTimeout(() => searchInput.current?.select(), 100)
        }
    },
    render: (text) => text,
})
