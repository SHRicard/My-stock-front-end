import React, { useEffect } from "react";
import { IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../Store";
import { toggleTheme } from "../../../Store/Slices/themeSlice";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { MdLightMode } from "react-icons/md";
import { useTheme } from "@mui/material/styles";

export const BtnTheme: React.FC = () => {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    document.body.className = themeMode;
  }, [themeMode]);

  return (
    <IconButton color="inherit" onClick={() => dispatch(toggleTheme())}>
      {themeMode === "dark" ? (
        <MdLightMode
          size={25}
          style={{ color: theme.palette.background.iconTheme }}
        />
      ) : (
        <BsFillMoonStarsFill
          size={20}
          style={{ color: theme.palette.background.iconTheme }}
        />
      )}
    </IconButton>
  );
};
