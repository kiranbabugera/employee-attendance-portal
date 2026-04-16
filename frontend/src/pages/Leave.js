import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import API from "../services/api";

function Leave() {
  const [reason, setReason] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await API.get("/leave");
      setLeaves(res.data);
    } catch (err) {
      console.log("Error fetching leaves");
    }
  };

  const handleSubmit = async () => {
    // ✅ VALIDATION
    if (!reason || !fromDate || !toDate) {
      alert("Please fill all fields");
      return;
    }

    if (new Date(fromDate) > new Date(toDate)) {
      alert("From date cannot be after To date");
      return;
    }

    try {
      await API.post("/leave", {
        reason,
        fromDate,
        toDate,
      });

      alert("Leave applied successfully");

      setReason("");
      setFromDate("");
      setToDate("");

      fetchLeaves();
    } catch (err) {
      console.log(err);
      alert("Leave failed");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Apply Leave
      </Typography>

      {/* FORM */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <TextField
          label="Reason"
          fullWidth
          sx={{ mb: 2 }}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <TextField
          type="date"
          fullWidth
          sx={{ mb: 2 }}
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <TextField
          type="date"
          fullWidth
          sx={{ mb: 2 }}
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

        <Button variant="contained" onClick={handleSubmit}>
          Apply Leave
        </Button>
      </Paper>

      {/* TABLE */}
      <Typography variant="h6" mb={2}>
        Leave History
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Reason</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {leaves.map((leave) => (
            <TableRow key={leave.id}>
              <TableCell>
                {new Date(leave.fromDate).toDateString()}
              </TableCell>
              <TableCell>
                {new Date(leave.toDate).toDateString()}
              </TableCell>
              <TableCell>{leave.reason}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default Leave;