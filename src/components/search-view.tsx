import { Flex, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Variation } from '../types/variations'
import { SearchInput } from './search-input'
import { requests } from '../requests'

export const SearchView = () => {
    const [data, setData] = useState<Variation[]>([])
    const [loading, setLoading] = useState(false)
    const [searchParams] = useSearchParams()

    const searchKeyword = searchParams.get('keyword') || ''

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await requests.getVariations({
                    page: 1,
                    size: 1000,
                })
                setData(response.items)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const filteredData = useMemo(() => {
        if (!searchKeyword) return data
        return data
            .filter(item => item.name?.toLowerCase().includes(searchKeyword.toLowerCase()))
            .sort((a, b) => {
                const aName = a.name.toLowerCase()
                const bName = b.name.toLowerCase()
                const keyword = searchKeyword.toLowerCase()

                const aStartsWith = aName.startsWith(keyword)
                const bStartsWith = bName.startsWith(keyword)

                if (aStartsWith && !bStartsWith) return -1
                if (!aStartsWith && bStartsWith) return 1

                return aName.localeCompare(bName)
            })
    }, [data, searchKeyword])

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
                <h1>
                    {searchKeyword ? (
                        <>
                            <em>"{searchKeyword}"</em> bo'yicha qidiruv natijalari
                        </>
                    ) : (
                        'Barcha mahsulotlar'
                    )}
                </h1>
                <SearchInput />
            </Flex>

            <Table
                columns={columns}
                dataSource={filteredData}
                rowKey="id"
                loading={loading}
                pagination={{
                    pageSize: 20,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '50', '100'],
                }}
                locale={{
                    emptyText: 'Hech nima topilmadi',
                }}
            />
        </div>
    )
}
