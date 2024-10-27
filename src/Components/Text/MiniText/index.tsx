import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

interface IMiniText {
  text: string;
}

export const MiniText = ({ text }: IMiniText) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/recuperar-contraseña"); // La URL de destino al hacer clic
  };

  return (
    <Typography
      onClick={handleClick}
      sx={{
        cursor: "pointer",
        textDecoration: "underline",
        color: theme.palette.text.primary,
        fontSize: {
          xs: "0.8rem", // Tamaño de fuente para pantallas pequeñas (extra small)
        },
      }}
    >
      {text}
    </Typography>
  );
};
