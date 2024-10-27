import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTheme } from "@mui/material";

interface IBtnSmall {
  text: string;
  onClick?: () => void;
  key?: number;
}

export const BtnBackup = ({ text, onClick, key }: IBtnSmall) => {
  const theme = useTheme();
  return (
    <LoadingButton
      key={key}
      onClick={onClick}
      loading={false}
      loadingPosition="start"
      variant="outlined"
      size="small"
      sx={{
        marginY: "4px",
        marginX: "4px",
        fontSize: "0.5rem",
        border: `2px solid ${theme.palette.background.inputGrupColor?.focusBorder}`,
        color: theme.palette.background.alertPopup?.color,
      }}
    >
      {text}
    </LoadingButton>
  );
};
