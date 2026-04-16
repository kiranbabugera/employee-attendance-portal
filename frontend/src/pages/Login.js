import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// ✅ Correct API import
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // ✅ Basic validation
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        username,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      alert("Login successful ✅");

      // ✅ Redirect
      navigate("/dashboard");
    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data);

      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
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
          value={username}
          sx={{ mb: 2 }}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          sx={{ mb: 2 }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Paper>
    </Box>
  );
}

export default Login;