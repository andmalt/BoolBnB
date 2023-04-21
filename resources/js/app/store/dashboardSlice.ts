import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getDashboardComponents, getIsCreate, getNumber } from '../services/functions'

const dashboard: string|null = getDashboardComponents();
const id: number | null = getNumber();
const isCreate = getIsCreate();

interface DashboardState {
    dashboard: string | null,
    id: number | null,
    isCreate: boolean,
}
const initialState: DashboardState = {
    dashboard: dashboard || "houses",
    id,
    isCreate: isCreate || false, 
}

export const dashboardSlice = createSlice({
    name: 'Dashboard',
    initialState,
    reducers: {
        setDashboard: (state, token: PayloadAction<string>) => {
            state.dashboard = token.payload;
        },
        setNumber: (state, number:PayloadAction<number|null>) => {
            state.id = number.payload;
        },
        setIsCte: (state, boolean: PayloadAction<boolean>) => {
            state.isCreate = boolean.payload;
        }
    }
})

export const { setDashboard, setNumber , setIsCte } = dashboardSlice.actions

// export const selectToken = (state: RootState) => state.auth.token

export default dashboardSlice.reducer;