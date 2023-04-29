import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getLengthMessagesRead, isTrashed} from '../services/functions'

const isTrashedMessages: boolean = isTrashed()
const lengthMessagesRead: number =  getLengthMessagesRead()

interface MessageState {
    isTrashedMessages: boolean,
    lengthMessagesRead: number,
}
const initialState: MessageState = {
    isTrashedMessages,
    lengthMessagesRead,
}

export const messageSlice = createSlice({
    name: 'Messages',
    initialState,
    reducers: {
        setIsTrashMessages: (state, token: PayloadAction<boolean>) => {
            state.isTrashedMessages = token.payload;
        },
        setMessagesNotRead: (state , number: PayloadAction<number>) => {
            state.lengthMessagesRead = number.payload
        }
    }
})

export const { setIsTrashMessages , setMessagesNotRead } = messageSlice.actions

// export const selectToken = (state: RootState) => state.auth.token

export default messageSlice.reducer;