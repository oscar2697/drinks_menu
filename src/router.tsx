import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout"
import { lazy, Suspense } from "react"
import GenerateAI from "./views/GenerateAI"

const IndexPage = lazy(() => import('./views/IndexPage'))
const FavoritesPage = lazy(() => import('./views/FavoritesPage'))

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={<IndexPage />} index />
                    <Route path='/favorites' element={ <FavoritesPage />} />
                    <Route path='/generate' element={<GenerateAI />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter
