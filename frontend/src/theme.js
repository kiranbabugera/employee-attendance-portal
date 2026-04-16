import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#6366f1" },
    secondary: { main: "#14b8a6" },
    background: { default: "#f8fafc" }
  },
  typography: {
    fontFamily: "Inter, sans-serif"
  },
  shape: {
    borderRadius: 12
  }
});

export default theme;