import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import API from "../services/api"; // ✅ make sure path is correct

function Leave() {
  const [reason, setReason] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [leaves, setLeaves] = useState([]);

  // ✅ FETCH LEAVES
  const fetchLeaves = async () => {
    try {
      const res = await API.get("/leave");
      setLeaves(res.data);
    } catch (err) {
      console.log("FETCH ERROR:", err.response?.data);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // ✅ APPLY LEAVE
  const handleApplyLeave = async () => {
    try {
      if (!reason || !fromDate || !toDate) {
        alert("All fields required");
        return;
      }

      const res = await API.post("/leave", {
        reason,
        fromDate: new Date(fromDate).toISOString().split("T")[0], // ✅ FIX
        toDate: new Date(toDate).toISOString().split("T")[0],     // ✅ FIX
      });

      alert("Leave applied successfully ✅");

      setReason("");
      setFromDate("");
      setToDate("");

      fetchLeaves();
    } catch (err) {
      console.log("ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Leave failed");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Apply Leave
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <TextField
          fullWidth
          label="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button variant="contained" onClick={handleApplyLeave}>
          Apply Leave
        </Button>
      </Paper>

      {/* ✅ LEAVE HISTORY */}
      <Typography variant="h6">Leave History</Typography>

      {leaves.map((leave) => (
        <Paper key={leave.id} sx={{ p: 2, mt: 1 }}>
          <Typography>{leave.reason}</Typography>
          <Typography>
            {leave.fromDate} → {leave.toDate}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}

export default Leave;