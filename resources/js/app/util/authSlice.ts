import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface AuthState {
    name: string | null,
    email: string | null,
    token: string | null,
    isLoading: boolean,
    isError: boolean,
    isSuccess: boolean
}

const initialState: AuthState = {
    name: null,
    email: null,
    token: null,
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
        error: state => {
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
        logout: state => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.token = null;
        }


    }
})

export const { loading, error, clear, authenticated, logout } = authSlice.actions

export const selectToken = (state: RootState) => state.auth.token

export default authSlice.reducer