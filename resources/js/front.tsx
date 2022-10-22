import React from 'react'
import ReactDom from 'react-dom'
import App from './app/routes/Index'
import { BrowserRouter } from 'react-router-dom'
import store from './app/util/store'
import { Provider } from 'react-redux'

ReactDom.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)