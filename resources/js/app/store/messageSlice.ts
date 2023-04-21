import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { isTrashed} from '../services/functions'

const isTrashedMessages: boolean = isTrashed()

interface DashboardState {
    isTrashedMessages: boolean,
}
const initialState: DashboardState = {
    isTrashedMessages,
}

export const dashboardSlice = createSlice({
    name: 'Messages',
    initialState,
    reducers: {
        setIsTrashMessages: (state, token: PayloadAction<boolean>) => {
            state.isTrashedMessages = token.payload;
        },
    }
})

export const { setIsTrashMessages } = dashboardSlice.actions

// export const selectToken = (state: RootState) => state.auth.token

export default dashboardSlice.reducer;