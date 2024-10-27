import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UpdateState {
  updated: boolean;
}

const initialState: UpdateState = {
  updated: false,
};

export const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    setUpdated: (state, action: PayloadAction<boolean>) => {
      state.updated = action.payload;
    },
  },
});

export const { setUpdated } = updateSlice.actions;
export default updateSlice.reducer;
