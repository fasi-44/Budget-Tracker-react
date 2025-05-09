import './index.css';
import './assets/styles/header.css'
import './assets/styles/register.css'
import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import './assets/styles/user.css'
import Loading from './components/utils/loading';
import AuthService from './services/auth.service'
import { ThemeContext, useTheme } from './contexts/ThemeContext.js';
import EditSavedTransaction from './pages/user/editSavedTransaction.js';

const Login = lazy(() => import('./pages/auth/login/login.js'))
const Dashboard = lazy(() => import('./pages/user/dashboard.js'))
const Transactions = lazy(() => import("./pages/user/transactions.js"))
const NewTransaction = lazy(() => import("./pages/user/newTransaction.js"))
const EditTransaction = lazy(() => import("./pages/user/editTransaction.js"))
const UnAuthorizedAccessPage = lazy(() => import('./pages/auth/unAuthorized.js'))
const AdminCategoriesManagement = lazy(() => import('./pages/admin/categories.js'))
const NotFoundPage = lazy(() => import('./pages/auth/notFound'))
const NewCategory = lazy(() => import('./pages/admin/newCategory.js'))
const EditCategory = lazy(() => import('./pages/admin/editCategory.js'))
const UserStatistics = lazy(() => import('./pages/user/statistics.js'))

function App() {

    const [isDarkMode, toggleTheme] = useTheme()

    const ProtectedRoute = ({ isAllowed, redirectPath = '/unauthorized', children }) => {
        if (!isAllowed) {
            return <Navigate to={redirectPath} replace />;
        }

        return children ? children : <Outlet />
    }

    return (
        <Suspense fallback={<LoadingSpinner />}>
            <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
                <RoutesWrapper isDarkMode={isDarkMode}>
                    <Routes>
                        <Route element={<ProtectedRoute isAllowed={AuthService.getCurrentUser()} />}>
                            <Route path="/user/dashboard" element={<Dashboard />} />
                            <Route path="/user/newTransaction" element={<NewTransaction />} />
                            <Route path="/user/transactions" element={<Transactions />} />
                            <Route path="/user/newTransaction" element={<NewTransaction />} />
                            <Route path="/user/editTransaction/:transactionId" element={<EditTransaction />} />
                            <Route path="/user/editSavedTransaction/:transactionId" element={<EditSavedTransaction />} />
                            <Route path='/user/statistics' element={<UserStatistics />} />
                        </Route>

                        <Route element={<ProtectedRoute isAllowed={AuthService.getCurrentUser()} />}>
                            <Route path='/admin/categories' element={<AdminCategoriesManagement />} />
                            <Route path='/admin/newCategory' element={<NewCategory />} />
                            <Route path='/admin/editCategory/:categoryId' element={<EditCategory />} />
                        </Route>

                        <Route path="/" element={<Login />} />
                        <Route path="/unauthorized" element={<UnAuthorizedAccessPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </RoutesWrapper>
            </ThemeContext.Provider>
        </Suspense>

    );
}


function RoutesWrapper({ children, isDarkMode }) {
    return (
        <div className={isDarkMode ? "dark" : "light"}>
            {children}
        </div>
    )

}

function LoadingSpinner() {
    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <Loading />
        </div>
    )
}

export default App;
