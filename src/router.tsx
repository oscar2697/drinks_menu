import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout"
import { lazy, Suspense } from "react"

const IndexPage = lazy(() => import('./views/IndexPage'))
const FavoritesPage = lazy(() => import('./views/FavoritesPage'))

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route 
                        path='/' 
                        element={
                            <Suspense fallback='Loading...'>
                                <IndexPage />
                            </Suspense>
                        } 
                        index 
                    />

                    <Route
                        path='/favorites'
                        element={
                            <Suspense fallback='Loading...'>
                                <FavoritesPage />
                            </Suspense>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter
