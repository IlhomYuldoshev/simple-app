import { Button, Flex, Input } from 'antd'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const SearchInput = () => {
    const [searchParams] = useSearchParams()
    const [search, setSearch] = useState(() => searchParams.get('keyword') || '')
    const navigate = useNavigate()

    const goToSearch = () => {
        navigate(`/search?keyword=${search}`)
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (search) {
            goToSearch()
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <Flex justify="space-between" align="center" gap={16}>
                <Input
                    placeholder="Qidirish uchun matn kiriting"
                    style={{ width: 300 }}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <Button type="primary" htmlType="submit" onClick={goToSearch}>
                    Qidirish
                </Button>
            </Flex>
        </form>
    )
}
