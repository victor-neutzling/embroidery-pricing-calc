import { extendTheme } from "@mui/joy/styles";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: "#F4F9FC",
          100: "#E3F0F7",
          200: "#CFE3F0",
          300: "#B3CEE5",
          400: "#8FB6D6",
          500: "#6C9EC7",
          600: "#4F86B8",
          700: "#3B6A95",
          800: "#2A4D6F",
          900: "#1A324A",
          solidColor: "#FFFFFF",
          solidBg: "#6C9EC7",
          solidHoverBg: "#4F86B8",
          solidActiveBg: "#3B6A95",
        },

        neutral: {
          50: "#FAFBFC",
          100: "#F1F3F5",
          200: "#E1E5EA",
          300: "#C9D1D9",
          400: "#9AA6B2",
          500: "#6B7785",
          600: "#4A5563",
          700: "#2F3A45",
          800: "#1F2933",
          900: "#111827",
        },

        success: {
          100: "#DFF5E3",
          500: "#66BB6A",
          700: "#2E7D32",
        },

        danger: {
          100: "#FDE2E1",
          500: "#E57373",
          700: "#C62828",
        },

        warning: {
          100: "#FFF4CC",
          500: "#F4C542",
          700: "#C89E2F",
        },

        info: {
          500: "#64B5F6",
        },

        background: {
          body: "#F7FAFC",
          surface: "#FFFFFF",
          level1: "#EEF4F8",
          level2: "#E5EDF3",
        },

        text: {
          primary: "#1F2933",
          secondary: "#4A5563",
          tertiary: "#7B8794",
        },

        divider: "#CBD5DF",
      },
    },

    dark: {
      palette: {
        background: {
          body: "#0F1720",
          surface: "#1B2632",
        },
      },
    },
  },

  fontFamily: {
    body: "Inter, sans-serif",
    display: "Inter, sans-serif",
  },

  radius: {
    sm: "6px",
    md: "10px",
    lg: "14px",
  },
});

export default theme;
