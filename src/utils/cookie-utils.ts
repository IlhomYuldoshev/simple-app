export const getCookie = (name: string) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift()
    return null
}

export const setCookie = (name: string, value: string, expires: number) => {
    document.cookie = `${name}=${value}; path=/; max-age=${expires}`
}

export const removeCookie = (name: string) => {
    document.cookie = `${name}=; path=/; max-age=0`
}
