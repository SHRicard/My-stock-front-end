import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { BarComponent } from "./BarComponent";
import { DrawerComponent } from "./DrawerComponent";
import { ContentComponent } from "./ContentComponent";
import { useLocation } from "react-router-dom";

export const Home = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (open) {
      handleDrawerClose();
    }
  }, [location]);

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
      <CssBaseline />
      <BarComponent open={open} handleDrawerOpen={handleDrawerOpen} />
      <DrawerComponent open={open} handleDrawerClose={handleDrawerClose} />
      <ContentComponent>{children}</ContentComponent>
    </Box>
  );
};
