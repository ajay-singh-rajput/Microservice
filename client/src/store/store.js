import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reducer/userSlice'
import emailListSlice from './reducer/emailListSlice'

export const store = configureStore({
  reducer: {
    UserReducer:userSlice,
    EmailListReducer:emailListSlice
  },
})