import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import dashboardSlice from './dashboardSlice'
import messageSlice from './messageSlice'
import emailVerificationSlice from './emailVerificationSlice'


const store = configureStore({
    reducer: {
        auth: authSlice,
        dashboard: dashboardSlice,
        messages: messageSlice,
        emailVerification: emailVerificationSlice
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;