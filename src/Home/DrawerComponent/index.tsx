import React, { useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { BsCashCoin } from "react-icons/bs";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { FaHome, FaList, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../Components";
import { useDispatch } from "react-redux";
import { logout } from "../../Store/Slices/authSilice";
import { IntegrationNotistack } from "../../Components/DolarSnackbar";
import { FaFileContract } from "react-icons/fa6";

const drawerWidth = 240;

// Mixin para Drawer abierto (sin cambios)
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,

  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

// Mixin para Drawer cerrado (sin cambios)
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

// Estilización del Drawer para que se superponga al contenido
const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  position: "absolute", // Esto hace que el Drawer se superponga al contenido
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// Header del Drawer
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface DrawerComponentProps {
  open: boolean;
  handleDrawerClose: () => void;
}

export const DrawerComponent = ({
  open,
  handleDrawerClose,
}: DrawerComponentProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [showSnackbar, setShowSnackbar] = useState(false);

  const routes = [
    "/Dashboard",
    "/Dashboard/Personal",
    "/Dashboard/Producto",
    "/Dashboard/Registro",
  ];
  const navItems = ["Dashboard", "Personal", "Productos", "Registro"];
  const navIcons: JSX.Element[] = [
    <FaHome
      key="home"
      size={19}
      style={{ color: theme.palette.text.primary }}
    />,
    <FaUser
      key="user"
      size={19}
      style={{ color: theme.palette.text.primary }}
    />,
    <FaList
      key="list"
      size={19}
      style={{ color: theme.palette.text.primary }}
    />,
    <FaFileContract
      key="envelope"
      size={19}
      style={{ color: theme.palette.text.primary }}
    />,
  ];

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const handleShowSnackbar = () => {
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
    }, 5000);
  };
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          <Logo src="/poly.png" alt="Logo" />
        </div>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List
        style={{
          height: "100%",
        }}
      >
        {navItems.map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            sx={{
              display: "block",
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => handleNavigation(routes[index])}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {navIcons[index]}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List sx={{ mt: "auto" }}>
        <ListItem disablePadding>
          <ListItemButton onClick={handleShowSnackbar}>
            <ListItemIcon>
              <BsCashCoin
                size={25}
                style={{
                  color: theme?.palette?.background?.iconColoDollar?.color,
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Cotización"
              sx={{
                opacity: open ? 1 : 0,
                color: theme?.palette?.background?.iconColoDollar?.color,
                "& .MuiTypography-root": {
                  fontSize: "20px",
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List sx={{ mt: "auto" }}>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <FaSignOutAlt
                size={19}
                style={{ color: theme.palette.text.primary }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Cerrar Sesión"
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      {showSnackbar && <IntegrationNotistack />}
    </Drawer>
  );
};
