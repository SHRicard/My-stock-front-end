import React from "react";
import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

interface ContentComponentProps {
  children?: React.ReactNode;
}

export const ContentComponent: React.FC<ContentComponentProps> = ({
  children,
}) => {
  const theme = useTheme();

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: { xs: 2, sm: 3 }, // Espaciado adaptable a diferentes tamaños de pantalla
        backgroundColor: theme.palette.background.main,
        overflowY: "auto", // Agregar scroll si el contenido es más grande que la pantalla
        display: "flex",
        flexDirection: "column", // Mantiene el contenido organizado en columnas
        minHeight: "100vh", // Asegura que el contenido tome toda la altura de la pantalla
        gap: 2, // Añade un espacio entre los elementos hijos
        marginLeft: `calc(${theme.spacing(7)} + 1px)`, // Desplazamiento hacia la derecha del tamaño del Drawer cerrado
        transition: "margin-left 0.3s ease", // Transición suave para el desplazamiento
      }}
    >
      <DrawerHeader />
      {children ? (
        children
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: theme.palette.text.secondary,
          }}
        >
          <p>No hay contenido para mostrar</p>
        </Box>
      )}
    </Box>
  );
};
