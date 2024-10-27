import * as React from "react";
import { TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { UseFormRegisterReturn } from "react-hook-form";

interface IText {
  label: string;
  placeholder: string;
  helperText: string;
  register: UseFormRegisterReturn;
  error?: boolean;
  errorMessage?: string;
  value?: string;
  type: "text" | "number" | "details";
  rows?: number;
  disabled?: boolean;
}

export const Text = ({
  label,
  placeholder,
  helperText,
  register,
  error,
  errorMessage,
  value,
  rows,
  disabled,
}: IText) => {
  const theme = useTheme();

  return (
    <TextField
      disabled={disabled}
      multiline={!!rows}
      rows={rows}
      label={label}
      variant="outlined"
      size="small"
      fullWidth
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
        "& .MuiFormHelperText-root": {
          color: error ? theme.palette.error.main : theme.palette.text.disabled,
        },
      }}
      placeholder={placeholder}
      helperText={error === true ? errorMessage : helperText}
      slotProps={{
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
