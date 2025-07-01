import { TOKEN_KEY } from '../constants'
import { getCookie } from './cookie-utils'

export const makeRequest = async <ResponseType>(url: string, options: RequestInit): Promise<ResponseType> => {
    const defaultContentType = 'application/json'

    const token = getCookie(TOKEN_KEY)

    const headers = {
        'Content-Type': defaultContentType,
        Accept: defaultContentType,
        ...(token && {
            Authorization: `Bearer ${token}`,
        }),
        ...options.headers,
    }

    const response = await fetch(url, {
        ...options,
        headers,
    })

    if (!response.ok) {
        throw new Error('Request failed')
    }

    return response.json()
}
