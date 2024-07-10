import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import StoreContextProvider from './context/StoreContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
       <StoreContextProvider>
            <App />
            <ToastContainer position="top-center" />
        </StoreContextProvider>
    </BrowserRouter>


)
