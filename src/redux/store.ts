import { configureStore, EnhancedStore, Action } from '@reduxjs/toolkit';
import authReducer, { AuthState } from './slices/authSlice';
import vehicleReducer, { VehicleState } from './slices/vehicleSlice';
import bookingReducer, { BookingState } from './slices/bookingSlice';
import userReducer, { UserState } from './slices/userSlice';

const store: EnhancedStore<{
  auth: AuthState;
  vehicle: VehicleState;
  booking: BookingState;
  user: UserState;
}, Action, []> = configureStore({
  reducer: {
    auth: authReducer,
    vehicle: vehicleReducer,
    booking: bookingReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
