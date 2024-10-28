import { TextField, InputAdornment } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useTheme } from "@mui/material/styles";
import { UseFormRegisterReturn } from "react-hook-form";

interface UserNameProps {
  register: UseFormRegisterReturn;
  error: boolean;
  errorMessage?: string;
  placeholder: string;
  label: string;
  helperText: string;
}

export const UserName: React.FC<UserNameProps> = ({
  register,
  error,
  errorMessage,
  placeholder,
  label,
  helperText,
}) => {
  const theme = useTheme();

  return (
    <TextField
      id="input-with-icon-textfield"
      label={label}
      placeholder={placeholder}
      {...register}
      error={error}
      helperText={error ? errorMessage : helperText}
      fullWidth
      size="small"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle
                style={{
                  color: theme.palette.background.inputGrupColor?.icon,
                }}
              />
            </InputAdornment>
          ),
        },
        formHelperText: {
          sx: {
            color: theme.palette.text.disabled, // Cambia el color del helperText aquí
          },
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          color: theme.palette.background.inputGrupColor?.textColor, // Color del texto
          "& fieldset": {
            borderColor: theme.palette.background.inputGrupColor?.border, // Borde del input
          },
          "&:hover fieldset": {
            borderColor: theme.palette.background.inputGrupColor?.hoverBorder, // Borde al hacer hover
          },
          "&.Mui-focused fieldset": {
            borderColor: theme.palette.background.inputGrupColor?.focusBorder, // Borde al tener foco
          },
        },
      }}
      variant="outlined"
    />
  );
};
