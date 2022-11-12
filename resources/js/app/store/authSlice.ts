import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getLocalStorage } from '../services/functions'
// import type { RootState } from './store'

const data = getLocalStorage();

const token: string | null = data.token;
const name: string | null = data.name;
const email: string | null = data.email;

interface AuthState {
    name: string | null,
    email: string | null,
    token: string | null,
    isLoading: boolean,
    isError: boolean,
    isSuccess: boolean,
}
const initialState: AuthState = {
    name: name,
    email: email,
    token: token,
    isLoading: false,
    isError: false,
    isSuccess: false
}

export const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        loading: state => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        },
        error: (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        },
        clear: state => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
        },
        authenticated: (state, token: PayloadAction<string>) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.token = token.payload;
        },
        sName: (state, name: PayloadAction<string>) => {
            state.name = name.payload;
        },
        sEmail: (state, email: PayloadAction<string>) => {
            state.email = email.payload;
        },
        logout: state => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.token = null;
            state.name = null;
            state.email = null;
        },
    }
})

export const { loading, error, clear, authenticated, logout, sEmail, sName } = authSlice.actions

// export const selectToken = (state: RootState) => state.auth.token

export default authSlice.reducer