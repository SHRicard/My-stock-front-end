import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./Store";
import { AppRoutes } from "./Routers";
import { Dark, Light } from "./Styles";
import { jwtDecode } from "jwt-decode";
import { login } from "./Store/Slices/authSilice";

export const App = () => {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const URL_ENDPOINT = import.meta.env.VITE_PING;
  useEffect(() => {
    document.body.className = themeMode === "dark" ? "dark" : "light";
  }, [themeMode]);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);

        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          dispatch(login({ username: decodedToken.username }));
        } else {
          sessionStorage.removeItem("authToken");
        }
      } catch (error) {
        console.error("Error al decodificar el token", error);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        fetch(URL_ENDPOINT).catch((error) => console.log("Ping error:", error));
      },
      5 * 60 * 1000
    );
    return () => clearInterval(intervalId);
  }, []);

  const appliedTheme = themeMode === "dark" ? Dark : Light;

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          backgroundColor: appliedTheme.palette.background.main,
        }}
      >
        <AppRoutes />
      </Box>
    </ThemeProvider>
  );
};
