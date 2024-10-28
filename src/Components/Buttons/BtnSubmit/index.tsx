import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

interface IBtn {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const BtnSubmit = ({ text, onClick, disabled }: IBtn) => {
  const theme = useTheme();

  return (
    <Button
      type="submit"
      disabled={disabled}
      onClick={onClick}
      variant="outlined"
      size="small"
      sx={{
        fontSize: "10px",
        color: theme.palette.background.btnGrupColor?.login, // Color del texto normal
        borderColor: theme.palette.background.btnGrupColor?.outlineBorder, // Borde normal
        "&:hover": {
          borderColor:
            theme.palette.background.btnGrupColor?.submitButton?.hoverBorder, // Borde verde en hover
          color: theme.palette.background.btnGrupColor?.submitButton?.hoverText, // Texto verde en hover
        },
      }}
    >
      {text}
    </Button>
  );
};
