import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { isTrashed} from '../services/functions'

const isTrashedMessages: boolean = isTrashed()

interface MessageState {
    isTrashedMessages: boolean,
}
const initialState: MessageState = {
    isTrashedMessages,
}

export const messageSlice = createSlice({
    name: 'Messages',
    initialState,
    reducers: {
        setIsTrashMessages: (state, token: PayloadAction<boolean>) => {
            state.isTrashedMessages = token.payload;
        },
    }
})

export const { setIsTrashMessages } = messageSlice.actions

// export const selectToken = (state: RootState) => state.auth.token

export default messageSlice.reducer;