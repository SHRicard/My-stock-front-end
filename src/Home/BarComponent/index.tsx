import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { BtnTheme } from "../../Components";
import { HiWorker } from "../../Utils";

const name = sessionStorage.getItem("username") || "trabajador";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  handleDrawerOpen: () => void;
}

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: theme.palette.background.primary,
  color: theme.palette.text.primary,
  boxShadow: theme.palette.background.boxShadow,
  ...(open && {
    marginLeft: 240,
    width: `calc(100% - 240px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const BarComponent = ({ open, handleDrawerOpen }: AppBarProps) => (
  <AppBar
    position="fixed"
    open={open}
    handleDrawerOpen={function (): void {
      throw new Error("Function not implemented.");
    }}
  >
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{ marginRight: 5, ...(open && { display: "none" }) }}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        variant="body1"
        component="strong"
        sx={{
          flexGrow: 1,
          textAlign: "start",
          fontSize: "1rem",
          fontWeight: "bold",
        }}
      >
        {HiWorker(name)}
      </Typography>

      <IconButton color="inherit" aria-label="end action">
        <BtnTheme />
      </IconButton>
    </Toolbar>
  </AppBar>
);
