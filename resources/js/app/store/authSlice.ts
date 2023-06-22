import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getLocalStorage } from '../services/functions'
import { User } from '../services/interfaces';
// import type { RootState } from './store'

const data = getLocalStorage();

const token: string | null = data.token;
const user: User | null = data.user;

interface AuthState {
    user:User | null
    token: string | null,
    isLoading: boolean,
    isError: boolean,
    isSuccess: boolean,
}
const initialState: AuthState = {
    user,
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
        logout: state => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.token = null;
            state.user = null;
        },
    }
})

export const { loading, error, clear, authenticated, logout } = authSlice.actions

// export const selectToken = (state: RootState) => state.auth.token

export default authSlice.reducer