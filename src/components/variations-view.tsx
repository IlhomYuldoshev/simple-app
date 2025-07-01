import { Flex, Table } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { requests } from '../requests'
import type { GetVariationsResponse, Variation } from '../types/variations'
import { SearchInput } from './search-input'

export const VariationsView = () => {
    const [data, setData] = useState<Variation[]>([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()

    const page = Number(searchParams.get('page')) || 1
    const size = Number(searchParams.get('size')) || 10

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response: GetVariationsResponse = await requests.getVariations({
                    page,
                    size,
                })
                setData(response.items)
                setTotal(response.total_count)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [page, size])

    const handleTableChange = (pagination: TablePaginationConfig) => {
        setSearchParams({
            page: String(pagination.current || 1),
            size: String(pagination.pageSize || 10),
        })
    }

    const columns: ColumnsType<Variation> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nomi',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
        },
        {
            title: 'Kategoriya',
            dataIndex: 'category',
            key: 'category',
            render: (value: string | null) => value || '-',
        },
        {
            title: 'Shtrix-kod',
            dataIndex: 'barcode',
            key: 'barcode',
        },
    ]

    return (
        <div>
            <Flex justify="space-between" align="center" gap={16}>
                <h1>Variatsiyalar</h1>
                <SearchInput />
            </Flex>

            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                loading={loading}
                pagination={{
                    current: page,
                    pageSize: size,
                    total,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '50'],
                }}
                onChange={handleTableChange}
                locale={{
                    emptyText: 'Hech nima topilmadi',
                }}
            />
        </div>
    )
}
