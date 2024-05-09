import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/lib/store'
import { user_model } from '@/models'

export interface UsersState {
  user_list: user_model[];
}

const initialState: UsersState = {
    user_list: []
}

export const UsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUsersList: (state, action: PayloadAction<user_model[]>) => {
      state.user_list = action.payload
    },
    
  }
})

export const { updateUsersList } = UsersSlice.actions

export const getUsersList = (state: RootState) => state.users.user_list;

export default UsersSlice.reducer