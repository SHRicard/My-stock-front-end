import * as React from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useDollarData } from "../../Hooks";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export const DolarSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { dollarData, fetchDollarData } = useDollarData();
  const theme = useTheme();
  const [snackbarShown, setSnackbarShown] = React.useState(false);

  React.useEffect(() => {
    fetchDollarData();
  }, [fetchDollarData]);

  React.useEffect(() => {
    if (dollarData && !snackbarShown) {
      const { blue } = dollarData;

      enqueueSnackbar(
        <Typography>
          Dólar Blue - Compra: {blue.compra} | Venta: {blue.venta} <br />
          <span
            style={{
              fontSize: "0.85em",
              display: "block",
              textAlign: "center",
              fontWeight: "bold",
              color: theme?.palette?.error.main,
            }}
          >
            Datos extraídos de Dolar Hoy.
          </span>
        </Typography>,
        {
          variant: "success",
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
          style: {
            border: `1px solid ${theme?.palette?.background.snackbar?.border}`,
            color: theme?.palette?.background.snackbar?.text,
            backgroundColor:
              theme?.palette?.background.snackbar?.backgroundColor,
            boxShadow: theme?.palette?.background.snackbar?.boxShadow,
          },
          autoHideDuration: 5000, // Duración automática del snackbar
        }
      );
      setSnackbarShown(true);
    }
  }, [dollarData, enqueueSnackbar, snackbarShown, theme]);

  return null;
};

export const IntegrationNotistack = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <DolarSnackbar />
    </SnackbarProvider>
  );
};
