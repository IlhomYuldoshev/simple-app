import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthView } from './auth-view'
import { SearchView } from './search-view'
import { VariationsView } from './variations-view'
import { useAuth } from '../context/use-auth'
import { Layout } from './layout'

export const AllRoutes = () => {
    const { isAuth } = useAuth()

    return (
        <Routes>
            <Route path="/auth" element={<AuthView />} />
            <Route path="*" element={<div />} />
            {isAuth && (
                <React.Fragment>
                    <Route element={<Layout />}>
                        <Route path="/variations" element={<VariationsView />} />
                        <Route path="/search" element={<SearchView />} />
                    </Route>
                </React.Fragment>
            )}
        </Routes>
    )
}
