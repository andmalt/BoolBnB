import React from 'react'
import ReactDom from 'react-dom/client'
import App from "./app/routes/Navigation"
import { BrowserRouter } from 'react-router-dom'
import store from './app/store/store'
import { Provider } from 'react-redux'
import './app/i18n'

const rootElement = document.getElementById('root') as HTMLElement

const root = ReactDom.createRoot(rootElement)

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
)