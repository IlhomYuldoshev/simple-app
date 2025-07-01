import { BrowserRouter } from 'react-router-dom'
import { AllRoutes } from './components/all-routes'
import { AuthProvider } from './context/auth-provider'

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AllRoutes />
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
