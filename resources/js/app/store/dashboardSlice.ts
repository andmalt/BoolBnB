import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getDashboardComponents } from '../services/functions'

const data = getDashboardComponents();

const dashboard: string | null = data;

interface DashboardState {
    dashboard: string | null,
}
const initialState: DashboardState = {
    dashboard: dashboard||"houses"
}

export const dashboardSlice = createSlice({
    name: 'Dashboard',
    initialState,
    reducers: {
        change: (state, token: PayloadAction<string>) => {
            state.dashboard = token.payload;
       }
    }
})

export const { change } = dashboardSlice.actions

// export const selectToken = (state: RootState) => state.auth.token

export default dashboardSlice.reducer