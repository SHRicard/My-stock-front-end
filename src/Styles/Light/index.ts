import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeBackground {
    main?: string;
    primary?: string;
    secondary?: string;
    iconTheme?: string;
    btnGrupColor?: {
      login?: string;
      outlineBorder?: string;
      hoverBg?: string;
      hoverBorder?: string;
      hoverText?: string;
      submitButton?: {
        hoverBorder?: string;
        hoverText?: string;
      };
    };
    inputGrupColor?: {
      icon?: string; // Color del ícono del input
      border?: string; // Color del borde del input
      hoverBorder?: string; // Color del borde en hover del input
      focusBorder?: string; // Color del borde cuando el input tiene foco
      textColor?: string; // Color del texto del input
      labelColor?: string; // Color del label del input
      labelFocusedColor?: string; // Color del label cuando está enfocado
    };
    boxShadow: string;
    shadow?: {
      mainColor?: string;
      filter?: string;
      shadow?: string;
    };
    snackbar: {
      border?: string;
      text?: string;
      backgroundColor?: string;
      boxShadow?: string;
    };
    color: {
      background?: string;
      borderColor?: string;
      textColor?: string;
      boxShadow?: string;
    };
    alertPopup?: {
      Success?: string;
      Error?: string;
      color?: string;
    };
    badge?: {
      backgroundColor: string;
      border?: string;
      textColor?: string;
      fontSize?: string;
      width?: string;
      height?: string;
      borderRadius?: string;
    };
    iconColoDollar?: {
      color?: string;
    };
  }
}
export const Light = createTheme({
  palette: {
    mode: "light",
    background: {
      main: "#FAFAFA", // Fondo claro
      primary: "#FFFFFF",
      secondary: "#E8E8E8",
      iconTheme: "#333333",
      btnGrupColor: {
        login: "#1565C0", // Azul intenso
        outlineBorder: "#1565C0",
        hoverBg: "rgba(21, 101, 192, 0.1)",
        hoverBorder: "#0D47A1",
        hoverText: "#FFFFFF",
        submitButton: {
          hoverBorder: "#004BA0",
          hoverText: "#004BA0",
        },
      },
      iconColoDollar: {
        color: "#1565C0",
      },
      inputGrupColor: {
        icon: "#1565C0",
        border: "#1565C0",
        hoverBorder: "#0D47A1",
        focusBorder: "#004BA0",
        textColor: "#333333",
        labelColor: "#333333",
        labelFocusedColor: "#1565C0",
      },
      boxShadow: "0px 4px 20px 3px rgba(21, 101, 192, 0.4)",
      shadow: {
        mainColor: "#FFFFFF",
        filter: "blur(10px)",
        shadow: "0px 4px 20px 3px rgba(21, 101, 192, 0.4)",
      },
      snackbar: {
        border: "#2E7D32", // Verde oscuro
        text: "#212121",
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 4px 20px rgba(46, 125, 50, 0.4)",
      },
      color: {
        background: "#1565C0",
        boxShadow: "0px 4px 20px 3px rgba(21, 101, 192, 0.5)",
        borderColor: "#1565C0",
        textColor: "#FFFFFF",
      },
      alertPopup: {
        Success: "#388E3C",
        Error: "#D32F2F", // El rojo permanece solo para errores
        color: "#333333",
      },
      badge: {
        backgroundColor: "#FFA000", // Naranja vibrante
        border: "#FFA000",
        textColor: "#333333",
        fontSize: "25px",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
      },
    },
    text: {
      primary: "#212121",
      secondary: "#616161",
      disabled: "#9E9E9E",
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#212121",
        },
        focused: {
          color: "#1565C0",
        },
      },
    },
  },
});
