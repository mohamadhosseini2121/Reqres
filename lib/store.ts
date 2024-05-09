import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/users/UserSlice';


export const makeStore = () => {
  return configureStore({
    reducer: {
        users: userReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']