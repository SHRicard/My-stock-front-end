import axios from "./httpService";

interface LoginData {
  username: string;
  password: string;
  rememberMe: boolean;
}

export const loginUser = async (loginData: LoginData) => {
  const URL_LOGIN = import.meta.env.VITE_LOGIN;
  try {
    const response = await axios.post(URL_LOGIN, {
      username: loginData.username,
      password: loginData.password,
      rememberMe: true,
    });

    if (response.data.token) {
      sessionStorage.setItem("authToken", response.data.token);
      sessionStorage.setItem("username", response.data.name);
    }

    return response.data;
  } catch (error: any) {
    console.error("Error en la solicitud:", error);
    throw new Error(error.response?.data?.message || "Error de autenticación");
  }
};
