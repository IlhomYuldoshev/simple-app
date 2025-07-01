import qs from 'qs'
import { SUBDOMAIN_KEY } from '../constants'
import type { AuthBody, AuthResponse } from '../types/auth'
import type { GetVariationsBody, GetVariationsResponse } from '../types/variations'
import { getCookie } from '../utils/cookie-utils'
import { makeRequest } from '../utils/make-request'

const getBaseUrl = (subdomain?: string): string => {
    if (subdomain) {
        return `https://${subdomain}.ox-sys.com`
    } else {
        const _subdomain = getCookie(SUBDOMAIN_KEY)

        if (_subdomain) {
            return `https://${_subdomain}.ox-sys.com`
        } else {
            throw new Error('No subdomain found')
        }
    }
}

export const requests = {
    auth(body: AuthBody) {
        const URL = `${getBaseUrl(body._subdomain)}/security/auth_check`

        return makeRequest<AuthResponse>(URL, {
            method: 'POST',
            body: qs.stringify(body),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
    },
    getVariations(params: GetVariationsBody) {
        const URL = `${getBaseUrl()}/variations?${qs.stringify(params)}`

        return makeRequest<GetVariationsResponse>(URL, {
            method: 'GET',
        })
    },
}
