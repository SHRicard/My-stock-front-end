import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeBackground {
    main?: string;
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
      icon?: string;
      border?: string;
      hoverBorder?: string;
      focusBorder?: string;
      textColor?: string;
      labelColor?: string;
      labelFocusedColor?: string;
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
    modal?: {
      background?: string;
      borderColor?: string;
      boxShadow?: string;
      textColor?: string;
    };
  }
}

export const Dark = createTheme({
  palette: {
    mode: "dark",
    background: {
      main: "#121212", // Fondo general oscuro
      iconTheme: "#FFD700",
      btnGrupColor: {
        login: "#1E88E5",
        outlineBorder: "#1E88E5",
        hoverBg: "rgba(30, 136, 229, 0.1)",
        hoverBorder: "#64B5F6",
        hoverText: "#ffffff",
        submitButton: {
          hoverBorder: "#81C784",
          hoverText: "#81C784",
        },
      },
      iconColoDollar: {
        color: "#1E88E5",
      },
      inputGrupColor: {
        icon: "#1E88E5",
        border: "#1E88E5",
        hoverBorder: "#64B5F6",
        focusBorder: "#1976D2",
        textColor: "#ffffff",
        labelColor: "#ffffff",
        labelFocusedColor: "#ffffff",
      },
      boxShadow: "0px 1px 20px 1px rgba(30, 136, 229, 0.5)",
      shadow: {
        mainColor: "#121212",
        filter: "blur(10px)",
        shadow: "0px 4px 20px 3px rgba(30, 136, 229, 0.5)",
      },
      snackbar: {
        border: "#1E88E5",
        text: "#EEEEEE",
        backgroundColor: "#424242",
        boxShadow: "0px 4px 20px rgba(30, 136, 229, 0.5)",
      },
      color: {
        background: "#1E88E5",
        boxShadow: "0px 4px 20px rgba(30, 136, 229, 0.5)",
        borderColor: "#1E88E5",
        textColor: "#ffffff",
      },
      alertPopup: {
        Success: "#66BB6A",
        Error: "#EF5350",
        color: "#ffffff",
      },
      badge: {
        backgroundColor: "#303030",
        border: `1px solid #1E88E5`,
        textColor: "#ffffff",
        fontSize: "25px",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
      },
      modal: {
        background: "#333333",
        borderColor: "#1E88E5",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
        textColor: "#ffffff",
      },
    },
    text: {
      primary: "#E0E0E0",
      secondary: "#B0BEC5",
      disabled: "#757575",
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
        focused: {
          color: "#ffffff",
        },
      },
    },
  },
});
