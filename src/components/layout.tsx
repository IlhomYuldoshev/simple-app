import { Button, Flex } from 'antd'
import { Link, Outlet } from 'react-router-dom'
import { SUBDOMAIN_KEY, TOKEN_KEY } from '../constants'
import { useAuth } from '../context/use-auth'
import { removeCookie } from '../utils/cookie-utils'

export const Layout = () => {
    const { setIsAuth } = useAuth()

    const logout = () => {
        removeCookie(TOKEN_KEY)
        removeCookie(SUBDOMAIN_KEY)
        setIsAuth({
            isAuth: false,
            subdomain: '',
        })
    }

    return (
        <div>
            <Flex justify="space-between" align="center">
                <Flex gap={16} align="center">
                    <Link to="/variations">Barcha mahsulotlar</Link>
                </Flex>
                <div>
                    <Button type="primary" danger onClick={logout}>
                        Chiqish
                    </Button>
                </div>
            </Flex>
            <main style={{ marginTop: '24px' }}>
                <Outlet />
            </main>
        </div>
    )
}
