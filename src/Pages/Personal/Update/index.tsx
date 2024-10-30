import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { CCol, CRow, CForm, CBadge } from "@coreui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import { Loading, Text } from "../../../Components";
import axios from "../../../service/httpService";
import { FormatDocument, ToLowerCase } from "../../../Utils";
import { setUpdated } from "../../../Store/Slices/updateSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URLS } from "../../../service/apiConfig";

interface IFormInput {
  name: string;
  surName: string;
  documents: string;
}

export const Update = () => {
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: "onSubmit",
    shouldUseNativeValidation: false,
  });
  const { userId } = useParams();
  const URL_ENDPOINT = API_URLS.USER_SEARCH_ID;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const theme = useTheme();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`${URL_ENDPOINT}/${userId}`);

        if (response.status >= 200 && response.status < 300) {
          const userData = response.data;
          setValue("name", userData.name);
          setValue("surName", userData.surName);
          setValue("documents", FormatDocument(userData.documents));
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al cargar los datos del trabajador.",
          confirmButtonText: "OK",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, setValue]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const URL_ENDPOINT = API_URLS.USER_SEARCH_UPDATE;

    let haveErrors = false;
    let errorMessages = "";

    if (
      data.name.length < 3 ||
      data.surName.length < 3 ||
      data.documents.length < 3
    ) {
      haveErrors = true;
      errorMessages = "Todos los campos deben tener al menos 3 caracteres.";
    }

    if (haveErrors) {
      Swal.fire({
        icon: "error",
        title: "Error en los datos",
        text: errorMessages,
        confirmButtonText: "OK",
      });
      return;
    }

    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Estás seguro de que deseas Actualizar este trabajador?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, Actualizar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Procesando...",
          text: "Por favor espera mientras se actualiza el trabajador.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const clearData = {
          name: ToLowerCase(data.name),
          surName: ToLowerCase(data.surName),
          documents: FormatDocument(data.documents),
          role: "Worker",
        };

        try {
          const response = await axios.put(
            `${URL_ENDPOINT}/${userId}`,
            clearData
          );

          if (response.status >= 200 && response.status < 300) {
            Swal.fire({
              icon: "success",
              title: "Éxito",
              text: "El trabajador ha sido Actualizado exitosamente.",
              confirmButtonText: "OK",
            });
            dispatch(setUpdated(true));
            navigate("/Dashboard/Personal");
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Hubo un problema al Actualizar el trabajador.",
              confirmButtonText: "OK",
            });
          }
        } catch (error) {
          console.error("Error al enviar los datos:", error);

          if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 409) {
              Swal.fire({
                icon: "error",
                title: "Conflicto",
                text:
                  error.response.data.error.message ||
                  "Ya existe un trabajador con ese documento.",
                confirmButtonText: "OK",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo un problema al Actualizar el trabajador.",
                confirmButtonText: "OK",
              });
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Hubo un error al enviar los datos.",
              confirmButtonText: "OK",
            });
          }
        }
      }
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <CRow className="d-flex justify-content-center align-items-center">
      <CCol md={12} className="text-center">
        <Typography id="modal-title" variant="h6" component="h2">
          Actualizar Personal
        </Typography>
        <CBadge
          style={{
            backgroundColor: theme.palette.background.color.background,
            color: theme.palette.common.white,
            boxShadow:
              theme.palette.background.color.boxShadow ||
              "0px 4px 20px rgba(138, 43, 226, 0.5)",
          }}
        >
          Personal
        </CBadge>
      </CCol>
      <CCol md={8} className="pt-5">
        <Card
          sx={{
            boxShadow: theme.palette.background.color.boxShadow,
            borderRadius: "16px",
          }}
        >
          <CardContent
            sx={{
              p: 4,
            }}
          >
            <CForm onSubmit={handleSubmit(onSubmit)}>
              <CRow>
                <CCol md={12}>
                  <Typography
                    id="modal-description"
                    sx={{
                      mt: 2,
                    }}
                  >
                    Por favor ingrese los datos del personal
                  </Typography>
                </CCol>
                <CCol md={6} className="py-2">
                  <Text
                    type="text"
                    register={register("name", {
                      required: "Este campo es obligatorio",
                    })}
                    error={!!errors.name}
                    errorMessage={errors.name?.message}
                    placeholder="Ej: Ricardo Ramirez"
                    label="Nombre"
                    helperText="*Por Favor ingrese el nombre"
                  />
                </CCol>
                <CCol md={6} className="py-2">
                  <Text
                    type="text"
                    register={register("surName", {
                      required: "Este campo es obligatorio",
                    })}
                    error={!!errors.name}
                    errorMessage={errors.name?.message}
                    placeholder="Ej: Ramirez"
                    label="Apellido"
                    helperText="*Por Favor ingrese el Apellido"
                  />
                </CCol>
                <CCol md={12} className="py-2">
                  <Text
                    type="number"
                    register={register("documents", {
                      required: "Este campo es obligatorio",
                    })}
                    error={!!errors.name}
                    errorMessage={errors.name?.message}
                    placeholder="Ej: 36.165.173"
                    label="Documentos"
                    helperText="*Por Favor ingrese el Documento"
                  />
                </CCol>

                {/* Botones */}
                <CCol md={12} className="text-end">
                  <Box sx={{ m: 1, alignItems: "end" }}>
                    <Button
                      type="submit"
                      sx={{
                        m: 1,
                        border: "1px solid",
                        fontSize: "12px",
                        color: theme.palette.background.btnGrupColor?.login,
                        borderColor:
                          theme.palette.background.btnGrupColor?.outlineBorder,
                        "&:hover": {
                          borderColor:
                            theme.palette.background.btnGrupColor?.hoverBorder,
                          backgroundColor:
                            theme.palette.background.btnGrupColor?.hoverBg,
                          color:
                            theme.palette.background.btnGrupColor?.hoverText,
                        },
                      }}
                    >
                      Actualizar Personal
                    </Button>
                  </Box>
                </CCol>
              </CRow>
            </CForm>
          </CardContent>
        </Card>
      </CCol>
    </CRow>
  );
};
