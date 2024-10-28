import { useDispatch } from "react-redux";
import { login } from "../../Store/Slices/authSilice";
import { BtnSubmit, Password, Signin, UserName } from "../../Components";
import { CContainer, CRow, CCol, CCard, CCardBody, CForm } from "@coreui/react";
import { useTheme } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { AppDispatch } from "../../Store";
import { loginUser } from "../../service/authService";

interface IFormInput {
  username: string;
  password: string;
  rememberMe: boolean;
}

export const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: "onSubmit",
    shouldUseNativeValidation: false,
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { username, password, rememberMe } = data;

    try {
      const response = await loginUser({ username, password, rememberMe });
      console.log({ response });

      if (!response.success) {
        if (response.message.includes("Usuario")) {
          setError("username", {
            type: "manual",
            message: "Usuario no encontrado",
          });
        } else if (response.message.includes("Contraseña")) {
          setError("password", {
            type: "manual",
            message: "Contraseña incorrecta",
          });
        }
        return;
      }

      sessionStorage.setItem("authToken", response.token);
      dispatch(login({ username })); // Pasa el username obtenido del formulario
    } catch (error) {
      setError("username", {
        type: "manual",
        message: "Error de autenticación",
      });
      const errorMessage = (error as Error).message ?? "Error desconocido";
      console.error("Error en la autenticación:", errorMessage);
    }
  };

  return (
    <CContainer
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100"
    >
      <CRow className="d-flex justify-content-center align-items-center">
        <CCol xs={12} md={10}>
          <CCard
            style={{
              backgroundColor: theme.palette.background.shadow?.mainColor,
              boxShadow: theme.palette.background.shadow?.shadow,
            }}
          >
            <CCardBody>
              <Signin />
              <CForm onSubmit={handleSubmit(onSubmit)}>
                <CRow className="d-flex justify-content-center align-items-center">
                  <CCol xs={12} md={10} className="py-2">
                    <UserName
                      register={register("username", {
                        required: "Este campo es obligatorio",
                      })}
                      error={!!errors.username}
                      errorMessage={errors.username?.message}
                      placeholder="ej: ana_admin"
                      label="Usuario"
                      helperText="*Por favor ingrese su Usuario"
                    />
                  </CCol>

                  <CCol xs={12} md={10} className="py-2">
                    <Password
                      register={register("password", {
                        required: "La contraseña es obligatoria",
                      })}
                      error={!!errors.password}
                      errorMessage={errors.password?.message}
                      placeholder="Ingrese su contraseña"
                      label="Contraseña"
                      helperText="Ingrese su contraseña por favor"
                    />
                  </CCol>
                </CRow>

                <CCol xs={12} className="pt-4 text-center">
                  <BtnSubmit text="Iniciar Sección" />
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};
