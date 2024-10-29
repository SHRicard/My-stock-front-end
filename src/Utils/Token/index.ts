import { jwtDecode } from "jwt-decode";

export const isTokenValid = (): boolean => {
  const token = sessionStorage.getItem("authToken");
  if (!token) return false;

  try {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      sessionStorage.removeItem("authToken");
      return false;
    }
    return true;
  } catch (error) {
    console.error("Token inválido:", error);
    return false;
  }
};
