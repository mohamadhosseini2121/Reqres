import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '@/lib/store';
import {user_filter_model, user_model} from '@/models';
import {userApi} from '@/services/userApiService';

export interface UsersState {
  userList: user_model[];
  isLoading: boolean;
  error: string;
}

const initialState: UsersState = {
  userList: [],
  isLoading: false,
  error: '',
};

export const UsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUsers(state, action: PayloadAction<user_model[]>) {
      state.userList = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export function getUsersFromServer(filters: Partial<user_filter_model>) {
  return async function (dispatch: any) {
    dispatch(setLoading(true));
    try {
      const response = await userApi().getList(filters);
      dispatch(updateUsers(response.data));
      dispatch(setError(''));
      return response;
    } catch (e) {
      dispatch(setError('There is a problem with getting users list'));
      console.error(e);
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function getUserFromServer(id: number) {
  return async function (dispatch: any) {
    dispatch(setLoading(true));
    try {
      const response = await userApi().getById(id);
      console.log('response', response);
      dispatch(setError(''));
      return response.data;
    } catch (e) {
      dispatch(setError(`There is a problem with getting users with id ${id}`));
      console.error(e);
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function createUser(user: Partial<user_model>) {
  return async function (dispatch: any) {
    dispatch(setLoading(true));
    try {
      await userApi().save(user);
      dispatch(setError(''));
    } catch (e: any) {
      dispatch(setError(`There is a problem with saving user data`));
      console.error(e.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function deleteUser(id: number) {
  return async function (dispatch: any) {
    dispatch(setLoading(true));
    try {
      await userApi().remove(id);
      dispatch(setError(''));
    } catch (e: any) {
      dispatch(setError(`There is a problem with saving user data`));
      console.error(e.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function UpdateUser(user: Partial<user_model>) {
  return async function (dispatch: any) {
    dispatch(setLoading(true));
    try {
      await userApi().save(user);
      dispatch(setError(''));
    } catch (e: any) {
      dispatch(setError(`There is a problem with updating user`));
      console.error(e.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export const getUsersState = (state: RootState) => state.users;

export const {updateUsers, setLoading, setError} = UsersSlice.actions;
export default UsersSlice.reducer;
