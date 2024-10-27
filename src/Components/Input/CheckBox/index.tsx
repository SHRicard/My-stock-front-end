import { Checkbox, FormControlLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { UseFormRegisterReturn } from "react-hook-form";

import React from "react";

interface ICheckProps {
  label: string;
  register: UseFormRegisterReturn;
}

export const Check: React.FC<ICheckProps> = ({ label, register }) => {
  const theme = useTheme();

  return (
    <FormControlLabel
      control={
        <Checkbox
          {...register} // Registro del formulario
          sx={{
            color: theme.palette.background.inputGrupColor?.border,
            "&.Mui-checked": {
              color: theme.palette.background.inputGrupColor?.border,
            },
          }}
        />
      }
      label={label}
      sx={{
        color: theme.palette.text.primary,
        "& .MuiFormControlLabel-label": {
          fontSize: "0.75rem", // Ajusta el tamaño del texto
        },
      }}
    />
  );
};
