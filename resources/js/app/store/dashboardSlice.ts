import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getDashboardComponents, getNumber } from '../services/functions'

const dashboard: string|null = getDashboardComponents();
const id: number|null = getNumber();

interface DashboardState {
    dashboard: string | null,
    id: number|null,
}
const initialState: DashboardState = {
    dashboard: dashboard || "houses",
    id,
}

export const dashboardSlice = createSlice({
    name: 'Dashboard',
    initialState,
    reducers: {
        setDashboard: (state, token: PayloadAction<string>) => {
            state.dashboard = token.payload;
        },
        setNumber: (state,number:PayloadAction<number|null>) => {
            state.id = number.payload;
        }
    }
})

export const { setDashboard, setNumber } = dashboardSlice.actions

// export const selectToken = (state: RootState) => state.auth.token

export default dashboardSlice.reducer;