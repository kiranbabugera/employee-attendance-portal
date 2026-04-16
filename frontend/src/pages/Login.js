import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
        }
      );

      // ✅ SAVE TOKEN
      localStorage.setItem("token", res.data.token);

      alert("Login successful");

      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f8",
      }}
    >
      <Paper sx={{ p: 4, width: 350, borderRadius: 3 }}>
        <Typography variant="h5" mb={2}>
          Login
        </Typography>

        <TextField
          fullWidth
          label="Username"
          sx={{ mb: 2 }}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          sx={{ mb: 2 }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}

export default Login;