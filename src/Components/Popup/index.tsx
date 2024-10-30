import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  CircularProgress,
  Snackbar,
  Alert,
  useTheme,
  Typography,
  IconButton,
} from "@mui/material";
import axios from "../../service/httpService";
import { CAlert, CBadge, CCol, CForm, CRow } from "@coreui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Text } from "../Input";
import { Btn, BtnSubmit } from "../Buttons";
import { Capitalize } from "../../Utils";
import CloseIcon from "@mui/icons-material/Close";
import { IWorkRecord } from "../../interface";
import { API_URLS } from "../../service/apiConfig";

interface FormData {
  details: string;
}

interface IPopup {
  open: boolean;
  onClose: () => void;
  currentUser?: IWorkRecord;
  isReset: () => void;
}

export const Popup: React.FC<IPopup> = ({
  open,
  onClose,
  currentUser,
  isReset,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const URL_ENDPOINT = API_URLS.WORK_RECORDS_ADD_DETAILS;

    const newDetails = {
      registerId: currentUser?.id,
      details: data.details,
    };

    setLoading(true);

    setTimeout(async () => {
      try {
        const response = await axios.post(URL_ENDPOINT, {
          newDetails,
        });

        if (response.status === 200 || response.status === 204) {
          setSnackbarMessage("Los datos fueron enviados correctamente.");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          onClose();
          reset();
          isReset();
        } else {
          throw new Error("Error en el envío de datos");
        }
      } catch (error) {
        setSnackbarMessage(
          "Hubo un problema al enviar los datos. Inténtalo nuevamente."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        console.error("Error al enviar los datos:", error);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const isClose = (reason: string) => {
    if (reason !== "backdropClick") {
      reset();
      onClose();
    }
  };
  return (
    <CRow>
      <Dialog
        open={open}
        onClose={isClose}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            color: theme.palette.text.primary,
            borderColor: theme.palette.background.inputGrupColor?.border,
            borderRadius: "8px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            border: `1px solid ${theme.palette.background.inputGrupColor?.border}`,
          },
        }}
      >
        <CCol className="text-center pt-3 fs-5">Agregar Nota</CCol>
        <CCol className="text-center">
          <CBadge
            style={{
              backgroundColor: theme.palette.background.color.background,
              color: theme.palette.common.white,
              boxShadow: theme.palette.background.color.boxShadow,
            }}
          >
            {Capitalize((currentUser as IWorkRecord)?.profile?.name)}{" "}
            {Capitalize((currentUser as IWorkRecord)?.profile?.surName)}
          </CBadge>
        </CCol>
        <DialogContent>
          <CForm onSubmit={handleSubmit(onSubmit)}>
            <CCol xs={10} md={12} className="mx-auto py-3">
              <CAlert color="warning" className="text-center">
                <Typography id="modal-title" sx={{ color: "#000" }}>
                  Recuerda que puedes enviar todos los detalles que necesites
                  siempre y cuando el trabajador esté en su horario de trabajo.
                  Cada detalle que envíes se adjuntará automáticamente al
                  documento diario generado para ese trabajador. Esto permite
                  llevar un seguimiento completo de las actividades y cualquier
                  observación o comentario importante quedará registrado junto a
                  la jornada laboral.
                </Typography>
              </CAlert>
            </CCol>

            <CCol md={12} className="py-2">
              <Text
                rows={6}
                type="details"
                register={register("details", {
                  required: "Este campo es obligatorio",
                })}
                error={!!errors.details}
                errorMessage={errors.details?.message}
                placeholder={`Ej: El Personal ${Capitalize((currentUser as IWorkRecord)?.profile?.name)} ${Capitalize((currentUser as IWorkRecord)?.profile?.surName)} pido un adelanto de 50.000$`}
                label="Detalle"
                helperText="*Por Favor ingrese el Detalle"
                disabled={loading}
              />
            </CCol>
            {loading ? (
              <CCol md={12} className="text-center">
                <CircularProgress size={30} style={{ color: "red" }} />
                <Typography
                  id="modal-title"
                  sx={{ color: theme.palette.text.primary }} // Aplicamos color del texto
                >
                  Enviando...
                </Typography>
              </CCol>
            ) : (
              <CRow className="d-flex justify-content-end align-items-center">
                <CCol className="col-auto">
                  <Btn onClick={onClose} text="Cancelar" type="cancel" />
                </CCol>
                <CCol className="col-auto">
                  <BtnSubmit text="Enviar Nota" />
                </CCol>
              </CRow>
            )}
          </CForm>
        </DialogContent>
      </Dialog>

      {snackbarOpen && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            position: "fixed",
          }}
        >
          <Alert
            severity={snackbarSeverity}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleCloseSnackbar}
              >
                <CloseIcon />
              </IconButton>
            }
            sx={{
              borderRadius: "8px",
              minHeight: "80px",
              display: "flex",
              boxShadow: theme.palette.background.color.boxShadow,
              alignItems: "center",
              border:
                snackbarSeverity === "success"
                  ? `2px solid ${theme.palette.background.alertPopup?.Success}`
                  : `2px solid ${theme.palette.background.alertPopup?.Error}`,
              color: theme.palette.background.alertPopup?.color,
            }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      )}
    </CRow>
  );
};
