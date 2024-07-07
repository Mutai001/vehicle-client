import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookingState {
  bookings: Array<{ id: string; vehicleId: string; userId: string; status: string }>;
}

const initialState: BookingState = {
  bookings: [],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    addBooking(state, action: PayloadAction<{ id: string; vehicleId: string; userId: string; status: string }>) {
      state.bookings.push(action.payload);
    },
    cancelBooking(state, action: PayloadAction<string>) {
      const booking = state.bookings.find(b => b.id === action.payload);
      if (booking) {
        booking.status = 'cancelled';
      }
    },
  },
});

export const { addBooking, cancelBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
export type { BookingState }; // Export the type
