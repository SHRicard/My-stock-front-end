import { jwtDecode } from "jwt-decode";

// Función para verificar si el token JWT es válido
export const isTokenValid = (): boolean => {
  const token =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  if (!token) return false; // No hay token almacenado

  try {
    const decodedToken: any = jwtDecode(token); // Decodificamos el token
    const currentTime = Date.now() / 1000; // Tiempo actual en segundos

    if (decodedToken.exp < currentTime) {
      // Si el token ha expirado, lo eliminamos
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");
      return false; // El token ha expirado
    }
    return true; // El token es válido
  } catch (error) {
    console.error("Token inválido:", error);
    return false;
  }
};
