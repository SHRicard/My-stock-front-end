import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useTheme } from "@mui/material/styles";
import { UseFormRegisterReturn } from "react-hook-form";
import { useState } from "react";

interface PasswordProps {
  register: UseFormRegisterReturn;
  error: boolean;
  errorMessage?: string;
  placeholder: string;
  label: string;
  helperText: string;
}

export const Password: React.FC<PasswordProps> = ({
  register,
  error,
  errorMessage,
  placeholder,
  label,
  helperText,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <TextField
      id="input-password"
      label={label} // Usa la prop label
      placeholder={placeholder}
      {...register}
      error={error}
      helperText={error ? errorMessage : helperText}
      type={showPassword ? "text" : "password"} // Alterna entre texto y contraseña
      fullWidth
      size="small"
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? (
                  <Visibility
                    style={{
                      color: theme.palette.background.inputGrupColor?.icon,
                    }}
                  />
                ) : (
                  <VisibilityOff
                    style={{
                      color: theme.palette.background.inputGrupColor?.icon,
                    }}
                  />
                )}
              </IconButton>
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
          color: theme.palette.background.inputGrupColor?.textColor,
          "& fieldset": {
            borderColor: theme.palette.background.inputGrupColor?.border,
          },
          "&:hover fieldset": {
            borderColor: theme.palette.background.inputGrupColor?.hoverBorder,
          },
          "&.Mui-focused fieldset": {
            borderColor: theme.palette.background.inputGrupColor?.focusBorder,
          },
        },
      }}
      variant="outlined"
    />
  );
};
