// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
    Navigate,
} from 'react-router-dom'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import HomePage from './pages/homePage/HomePage.jsx'
import GameRoomsPage from './pages/gameRooms/GameRoomsPage.jsx'
import GameRoomsIdPage from './pages/gameRoomsId/GameRoomsIdPage.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route
                path="/"
                element={<Navigate to="/home" replace={true} />}
            ></Route>

            {/* home page / auth page */}
            <Route path="home" element={<HomePage />}></Route>

            {/* authorized pages */}
            <Route path="rooms" element={<GameRoomsPage />}></Route>
            <Route path="rooms/:id" element={<GameRoomsIdPage />}></Route>
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    //     <Provider store={store}>
    //         <RouterProvider router={router} />
    //     </Provider>
    // </React.StrictMode>

    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)
