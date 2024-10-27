import React from "react";
import { Button, Typography } from "@mui/material";
import { FaStreetView } from "react-icons/fa6";
import { useTheme } from "@mui/material/styles";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { BiPowerOff } from "react-icons/bi";
import { FaFolderPlus } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";

interface IBtn {
  onClick?: () => void; // Propiedad para la función que se ejecutará al hacer clic
  type:
    | "data"
    | "delete"
    | "update"
    | "onWorker"
    | "offWorker"
    | "addData"
    | "Sumar"
    | "Restar";
  disabled?: boolean;
}

export const BtnMini = ({ onClick, type, disabled }: IBtn) => {
  const theme = useTheme();

  return (
    <Button
      sx={{
        fontSize: "10px",
        color: theme.palette.background.btnGrupColor?.login, // Color del texto centralizado en el tema
        borderColor: theme.palette.background.btnGrupColor?.outlineBorder, // Borde centralizado en el tema
        "&:hover": {
          borderColor: theme.palette.background.btnGrupColor?.hoverBorder, // Color del borde al hacer hover
          backgroundColor: theme.palette.background.btnGrupColor?.hoverBg, // Color de fondo al hacer hover
          color: theme.palette.background.btnGrupColor?.hoverText, // Color del texto al hacer hover
        },
      }}
      disabled={disabled}
      variant="outlined"
      size="small"
      onClick={onClick}
    >
      <Typography variant="subtitle2" noWrap component="strong">
        {type === "data" && <FaStreetView />}
        {type === "delete" && <RiDeleteBin5Line />}
        {type === "update" && <FaEdit />}
        {type === "onWorker" && (
          <BiPowerOff style={{ color: "limegreen" }} size={20} />
        )}
        {type === "offWorker" && (
          <BiPowerOff style={{ color: "red" }} size={20} />
        )}
        {type === "addData" && (
          <FaFolderPlus style={{ color: "green" }} size={20} />
        )}
        {type === "Sumar" && <FaPlusCircle size={15} />}
        {type === "Restar" && <FaMinusCircle size={15} />}
      </Typography>
    </Button>
  );
};
