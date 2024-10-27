import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  mode: "light" | "dark";
}

const getInitialTheme = (): "light" | "dark" => {
  const savedTheme = localStorage.getItem("themeMode");
  return savedTheme === "dark" || savedTheme === "light" ? savedTheme : "light";
};

const initialState: ThemeState = {
  mode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", state.mode);
    },
    setLightTheme: (state) => {
      state.mode = "light";
      localStorage.setItem("themeMode", "light");
    },
    setDarkTheme: (state) => {
      state.mode = "dark";
      localStorage.setItem("themeMode", "dark");
    },
  },
});

export const { toggleTheme, setLightTheme, setDarkTheme } = themeSlice.actions;
export default themeSlice.reducer;
