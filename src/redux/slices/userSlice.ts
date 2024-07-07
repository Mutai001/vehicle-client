import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  users: Array<{ id: string; name: string; email: string }>;
}

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<{ id: string; name: string; email: string }>) {
      state.users.push(action.payload);
    },
    removeUser(state, action: PayloadAction<string>) {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
export type { UserState }; // Export the type
