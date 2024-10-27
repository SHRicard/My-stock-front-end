import React, { useState } from "react";
import {
  Dialog,
  Snackbar,
  Alert,
  useTheme,
  Typography,
  IconButton,
  Divider,
  Badge,
  CircularProgress,
} from "@mui/material";
import axios from "../../service/httpService";

import { CCard, CCardBody, CCardText, CCol, CRow } from "@coreui/react";
import { Btn, BtnMini } from "../Buttons";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { setUpdated } from "../../Store/Slices/updateSlice";

interface IProduct {
  id: string;
  name: string;
  quantity: number;
  description: string;
  dimension: string;
  productType: string;
  price: string;
}

interface PopupFormProps {
  open: boolean;
  onClose: () => void;
  currentProduct: IProduct;
  resetFilter: () => void;
}

export const PopupProduct: React.FC<PopupFormProps> = ({
  open,
  onClose,
  currentProduct,
  resetFilter,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [count, setCount] = useState<number>(0);

  const dispatch = useDispatch();
  const theme = useTheme();

  const updateCountProducts = () => {
    const newCountsProducts = {
      registerId: currentProduct.id,
      count: count,
    };
    const URL_ENDPOINT = import.meta.env.VITE_PRODUCTS_UPDATE_COUNT;

    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await axios.post(URL_ENDPOINT, newCountsProducts, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200 || response.status === 204) {
          setSnackbarMessage("Los datos fueron enviados correctamente.");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          onClose();
          setCount(0);
          resetFilter();
          dispatch(setUpdated(true));
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
    }, 3000);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  const restCount = () => {
    setCount(0);
  };

  const isClose = () => {
    restCount();
    onClose();
  };

  return (
    <CRow className="d-flex justify-content-center align-items-center">
      <Dialog open={open} onClose={isClose}>
        <CCard
          style={{
            maxWidth: "20rem",
            backgroundColor: theme.palette.background.main,
            color: theme.palette.text.primary,
            borderColor: theme.palette.background.inputGrupColor?.border,
            border: `1px solid ${theme.palette.background.inputGrupColor?.border}`,
          }}
        >
          <CCol className="text-center py-2">
            <Typography
              variant="body1"
              component="strong"
              sx={{
                color: theme.palette.text.primary,
                flexGrow: 1,
                textAlign: "start",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              Control de Ingreso - Egreso
            </Typography>
          </CCol>

          <CCol>
            <Divider
              sx={{
                border: `1px solid ${theme.palette.background.inputGrupColor?.border}`, // Puedes ajustar el grosor del divider
              }}
            />
          </CCol>
          <CCardBody>
            <CCardText>
              <CCol className="text-center">
                <Typography
                  variant="body1"
                  component="p"
                  sx={{
                    color: theme.palette.text.primary,
                    flexGrow: 1,
                    textAlign: "center",
                    fontSize: "0.8rem",
                    fontWeight: "lighter",
                  }}
                >
                  📦 Aquí usted puede subir o bajar el stock actual del
                  producto.
                </Typography>
              </CCol>
              <CCol className="text-center py-5">
                <Badge
                  showZero={true}
                  badgeContent={count}
                  sx={{
                    "& .MuiBadge-badge": {
                      border: theme.palette.background.badge?.border,
                      backgroundColor:
                        theme.palette.background.badge?.backgroundColor,
                      color: theme.palette.background.badge?.textColor,
                      fontSize: theme.palette.background.badge?.fontSize,
                      width: theme.palette.background.badge?.width,
                      height: theme.palette.background.badge?.height,
                      borderRadius:
                        theme.palette.background.badge?.borderRadius,
                    },
                  }}
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
                <>
                  <CRow className="d-flex justify-content-center">
                    <CCol className="col-auto">
                      <BtnMini onClick={increment} type="Sumar" />
                    </CCol>
                    <CCol className="col-auto">
                      <BtnMini onClick={decrement} type="Restar" />
                    </CCol>
                  </CRow>
                  <CRow className="pt-3">
                    <CCol className="text-center">
                      <Typography
                        variant="body1"
                        component="p"
                        sx={{
                          color: theme.palette.text.primary,
                          flexGrow: 1,
                          textAlign: "center",
                          fontSize: "0.8rem",
                          fontWeight: "lighter",
                        }}
                      >
                        El stock actual del producto es de{" "}
                        {currentProduct?.quantity} unidades.
                      </Typography>
                    </CCol>
                  </CRow>
                  <CRow className="pt-3 py-1 p-5">
                    <Btn
                      disabled={!count}
                      onClick={updateCountProducts}
                      text="Actualizar Stock"
                    />
                  </CRow>
                  <CRow className="py-1 p-5">
                    <Btn onClick={isClose} text="Cancelar" />
                  </CRow>
                </>
              )}
            </CCardText>
          </CCardBody>
        </CCard>
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
