export type AuthBody = {
    _username: string
    _password: string
    _subdomain: string
}
export type AuthResponse = {
    token: string
    expires_at: string
    lifetime: number
}
