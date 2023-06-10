import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getEmailVerification, setEmailVerification } from '../services/functions'

const isVerificated: boolean =  getEmailVerification()

interface EmailState {
    emailVerification: boolean,
}
const initialState: EmailState = {
    emailVerification : isVerificated
}

export const emailVerificationSlice = createSlice({
    name: 'EmailVerificated',
    initialState,
    reducers: {
        setIsEmailVerification: (state , boolean: PayloadAction<boolean>) => {
            state.emailVerification = boolean.payload
            setEmailVerification(boolean.payload)
        }
    }
})

export const { setIsEmailVerification } = emailVerificationSlice.actions

export default emailVerificationSlice.reducer;