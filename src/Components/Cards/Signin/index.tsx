import { Typography, useTheme } from "@mui/material";
import { CAvatar, CCol, CRow } from "@coreui/react";
import { CiLock } from "react-icons/ci";

export const Signin = () => {
  const theme = useTheme();

  return (
    <CRow>
      <CCol
        md={12}
        className="d-flex justify-content-center align-items-center"
      >
        <CAvatar
          style={{
            backgroundColor: theme.palette.background.inputGrupColor?.icon,
          }}
          textColor="white"
          size="md"
        >
          <CiLock style={{ fontSize: 24, color: "#000000" }} />
        </CAvatar>
      </CCol>
      <CCol
        md={12}
        className="d-flex justify-content-center align-items-center pt-3"
      >
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          align="center"
          style={{ color: theme.palette.text.primary }}
        >
          Iniciar sesión
        </Typography>
      </CCol>
      <CCol
        md={12}
        className="d-flex justify-content-center align-items-center "
      >
        <Typography
          variant="h6"
          component="small"
          gutterBottom
          align="center"
          sx={{
            color: theme.palette.text.disabled,
            fontSize: {
              xs: "0.8rem", // Tamaño de fuente para pantallas pequeñas (extra small)
            },
          }}
        >
          Bienvenido, por favor inicie sesión para continuar
        </Typography>
      </CCol>
    </CRow>
  );
};
