import { TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { UseFormRegisterReturn } from "react-hook-form";

interface IDateInput {
  label: string;
  placeholder: string;
  helperText: string;
  register: UseFormRegisterReturn;
  error?: boolean;
  errorMessage?: string;
  value?: string;
  disabled?: boolean;
}

export const DateInput = ({
  label,
  placeholder,
  helperText,
  register,
  error,
  errorMessage,
  value,
  disabled,
}: IDateInput) => {
  const theme = useTheme();

  return (
    <TextField
      disabled={disabled}
      label={label}
      variant="outlined"
      size="small"
      fullWidth
      type="date" // Cambiamos el tipo a "date"
      value={value}
      sx={{
        "& .MuiOutlinedInput-root": {
          color: theme.palette.text.primary,
          borderRadius: "4px",
          "& fieldset": {
            borderColor: error
              ? theme.palette.error.main
              : theme.palette.background.inputGrupColor?.border,
          },
          "&:hover fieldset": {
            borderColor: error
              ? theme.palette.error.dark
              : theme.palette.background.inputGrupColor?.focusBorder,
          },
          "&.Mui-focused fieldset": {
            borderColor: error
              ? theme.palette.error.main
              : theme.palette.background.inputGrupColor?.focusBorder,
          },
        },
        "& .MuiInputAdornment-root .MuiSvgIcon-root": {
          color: theme.palette.text.primary, // Cambiar el color del icono a blanco
        },

        "& .MuiFormHelperText-root": {
          color: error ? theme.palette.error.main : theme.palette.text.disabled,
        },
      }}
      placeholder={placeholder}
      helperText={error === true ? errorMessage : helperText}
      slotProps={{
        inputLabel: {
          shrink: true, // Ahora se coloca aquí
        },
        formHelperText: {
          sx: {
            color: theme.palette.text.primary,
          },
        },
      }}
      {...(register && register)}
      error={error}
    />
  );
};
