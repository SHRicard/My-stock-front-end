// import * as React from "react";
// import IconButton from "@mui/material/IconButton";
// import TextField from "@mui/material/TextField";
// import InputAdornment from "@mui/material/InputAdornment";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { useTheme } from "@mui/material/styles";

// export const Password = () => {
//   const [showPassword, setShowPassword] = React.useState(false);
//   const theme = useTheme();

//   const handleClickShowPassword = () => setShowPassword((show) => !show);
//   const handleMouseDownPassword = (
//     event: React.MouseEvent<HTMLButtonElement>
//   ) => {
//     event.preventDefault();
//   };

//   return (
//     <TextField
//       id="input-password"
//       label="Contraseña" // Agrega el label para que se comporte como el campo de usuario
//       placeholder="Ingrese su contraseña"
//       name="password"
//       type={showPassword ? "text" : "password"} // Alterna entre texto y contraseña
//       size="small"
//       required
//       fullWidth
//       slotProps={{
//         input: {
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton
//                 aria-label="toggle password visibility"
//                 onClick={handleClickShowPassword}
//                 onMouseDown={handleMouseDownPassword}
//                 edge="end"
//               >
//                 {showPassword ? (
//                   <Visibility
//                     style={{
//                       color: theme.palette.background.inputGrupColor?.icon,
//                     }}
//                   />
//                 ) : (
//                   <VisibilityOff
//                     style={{
//                       color: theme.palette.background.inputGrupColor?.icon,
//                     }}import * as React from "react";
// import IconButton from "@mui/material/IconButton";
// import TextField from "@mui/material/TextField";
// import InputAdornment from "@mui/material/InputAdornment";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { useTheme } from "@mui/material/styles";

// export const Password = () => {
//   const [showPassword, setShowPassword] = React.useState(false);
//   const theme = useTheme();

//   const handleClickShowPassword = () => setShowPassword((show) => !show);
//   const handleMouseDownPassword = (
//     event: React.MouseEvent<HTMLButtonElement>
//   ) => {
//     event.preventDefault();
//   };

//   return (
//     <TextField
//       id="input-password"
//       label="Contraseña" // Agrega el label para que se comporte como el campo de usuario
//       placeholder="Ingrese su contraseña"
//       name="password"
//       type={showPassword ? "text" : "password"} // Alterna entre texto y contraseña
//       size="small"
//       required
//       fullWidth
//       slotProps={{
//         input: {
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton
//                 aria-label="toggle password visibility"
//                 onClick={handleClickShowPassword}
//                 onMouseDown={handleMouseDownPassword}
//                 edge="end"
//               >
//                 {showPassword ? (
//                   <Visibility
//                     style={{
//                       color: theme.palette.background.inputGrupColor?.icon,
//                     }}
//                   />
//                 ) : (
//                   <VisibilityOff
//                     style={{
//                       color: theme.palette.background.inputGrupColor?.icon,
//                     }}
//                   />
//                 )}
//               </IconButton>
//             </InputAdornment>
//           ),
//         },
//         formHelperText: {
//           sx: {
//             color: theme.palette.text.disabled, // Cambia el color del helperText aquí
//           },
//         },
//       }}
//       sx={{
//         "& .MuiOutlinedInput-root": {
//           color: theme.palette.background.inputGrupColor?.textColor, // Color del texto
//           "& fieldset": {
//             borderColor: theme.palette.background.inputGrupColor?.border, // Borde del input
//           },
//           "&:hover fieldset": {
//             borderColor: theme.palette.background.inputGrupColor?.hoverBorder, // Borde al hacer hover
//           },
//           "&.Mui-focused fieldset": {
//             borderColor: theme.palette.background.inputGrupColor?.focusBorder, // Borde al tener foco
//           },
//         },
//       }}
//       variant="outlined"
//       helperText="Ingrese su contraseña por favor"
//     />
//   );
// };

//         formHelperText: {
//           sx: {
//             color: theme.palette.text.disabled, // Cambia el color del helperText aquí
//           },
//         },
//       }}
//       sx={{
//         "& .MuiOutlinedInput-root": {
//           color: theme.palette.background.inputGrupColor?.textColor, // Color del texto
//           "& fieldset": {
//             borderColor: theme.palette.background.inputGrupColor?.border, // Borde del input
//           },
//           "&:hover fieldset": {
//             borderColor: theme.palette.background.inputGrupColor?.hoverBorder, // Borde al hacer hover
//           },
//           "&.Mui-focused fieldset": {
//             borderColor: theme.palette.background.inputGrupColor?.focusBorder, // Borde al tener foco
//           },
//         },
//       }}
//       variant="outlined"
//       helperText="Ingrese su contraseña por favor"
//     />
//   );
// };
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useTheme } from "@mui/material/styles";
import { UseFormRegisterReturn } from "react-hook-form";

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
  const [showPassword, setShowPassword] = React.useState(false);
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
