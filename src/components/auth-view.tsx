import { Alert, Button, Form, Input } from 'antd'
import { useState } from 'react'
import { SUBDOMAIN_KEY, TOKEN_KEY } from '../constants'
import { useAuth } from '../context/use-auth'
import { requests } from '../requests'
import { setCookie } from '../utils/cookie-utils'

export const AuthView = () => {
    const [form] = Form.useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const { setIsAuth } = useAuth()

    const onFinish = async (values: { _username: string; _password: string; _subdomain: string }) => {
        try {
            setIsLoading(true)
            const response = await requests.auth(values)
            const cookieExpirySeconds = response.lifetime

            setCookie(SUBDOMAIN_KEY, values._subdomain, cookieExpirySeconds)
            setCookie(TOKEN_KEY, response.token, cookieExpirySeconds)
            setIsAuth({
                isAuth: true,
                subdomain: values._subdomain,
            })
        } catch (error) {
            console.log(error)
            setError(`Foydalanuvchi nomi yoki parol noto'g'ri`)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>
                <h1 style={{ textAlign: 'center' }}>Kirish</h1>
                <Form
                    form={form}
                    name="auth"
                    onFinish={onFinish}
                    style={{
                        width: 400,
                        padding: 24,
                        background: '#fff',
                        borderRadius: 8,
                        boxShadow: '0 2px 8px #f0f1f2',
                    }}
                >
                    <Form.Item name="_username" rules={[{ required: true, message: 'Foydalanuvchi nomini kiriting' }]}>
                        <Input placeholder="Foydalanuvchi nomi" />
                    </Form.Item>
                    <Form.Item name="_password" rules={[{ required: true, message: 'Parolni kiriting' }]}>
                        <Input.Password placeholder="Parol" />
                    </Form.Item>
                    <Form.Item name="_subdomain" rules={[{ required: true, message: 'Subdomainni kiriting' }]}>
                        <Input placeholder="Subdomain" />
                    </Form.Item>
                    {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={isLoading}>
                            Kirish
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
