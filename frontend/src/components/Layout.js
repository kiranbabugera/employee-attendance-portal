import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box, Drawer, List, ListItemButton, ListItemText,
  AppBar, Toolbar, Typography, Button
} from "@mui/material";

const drawerWidth = 240;

function Layout({ children }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      
      {/* Topbar */}
      <AppBar
        position="fixed"
        sx={{
          background: "white",
          color: "black",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography fontWeight="600">Employee System</Typography>

          <Button variant="outlined" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            background: "#0f172a",
            color: "#cbd5f5"
          }
        }}
      >
        <Toolbar />
        <List>
          {["Dashboard", "Timesheet", "Leave"].map((text) => (
            <ListItemButton
              key={text}
              component={Link}
              to={`/${text.toLowerCase()}`}
              sx={{
                "&:hover": {
                  background: "#1e293b"
                }
              }}
            >
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* Content */}
      <Box sx={{ flexGrow: 1, p: 4, bgcolor: "#f8fafc", minHeight: "100vh" }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default Layout;