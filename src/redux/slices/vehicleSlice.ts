import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VehicleState {
  vehicles: Array<{ id: string; model: string; available: boolean }>;
}

const initialState: VehicleState = {
  vehicles: [],
};

const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    addVehicle(state, action: PayloadAction<{ id: string; model: string; available: boolean }>) {
      state.vehicles.push(action.payload);
    },
    removeVehicle(state, action: PayloadAction<string>) {
      state.vehicles = state.vehicles.filter(vehicle => vehicle.id !== action.payload);
    },
  },
});

export const { addVehicle, removeVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;
export type { VehicleState }; // Export the type
