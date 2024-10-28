import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

interface IBtn {
  text: string;
  onClick: () => void; // Propiedad para la función que se ejecutará al hacer clic
  disabled?: boolean;
  type?: "cancel" | "default"; // Añadido para distinguir entre el botón normal y el de cancelar
}

export const Btn = ({ text, onClick, disabled, type = "default" }: IBtn) => {
  const theme = useTheme(); // Usa el tema para obtener los colores personalizados

  const getButtonStyles = () => {
    if (type === "cancel") {
      return {
        fontSize: "10px",
        color: theme.palette.error.main, // Color rojo para el texto
        borderColor: theme.palette.error.main, // Color rojo para el borde
        "&:hover": {
          borderColor: theme.palette.error.dark, // Color más oscuro al hacer hover
          backgroundColor: theme.palette.error.light, // Fondo más claro al hacer hover
          color: theme.palette.error.contrastText, // Texto de contraste
        },
      };
    }

    // Estilos por defecto para botones no "cancelar"
    return {
      fontSize: "10px",
      color: theme.palette.background.btnGrupColor?.login, // Color del texto centralizado en el tema
      borderColor: theme.palette.background.btnGrupColor?.outlineBorder, // Borde centralizado en el tema
      "&:hover": {
        borderColor: theme.palette.background.btnGrupColor?.hoverBorder, // Color del borde al hacer hover
        backgroundColor: theme.palette.background.btnGrupColor?.hoverBg, // Color de fondo al hacer hover
        color: theme.palette.background.btnGrupColor?.hoverText, // Color del texto al hacer hover
      },
    };
  };

  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      variant="outlined"
      size="small"
      sx={getButtonStyles()} // Usa los estilos dependiendo del tipo
    >
      {text}
    </Button>
  );
};
