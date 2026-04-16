import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import API from "../services/api";

function Dashboard() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [leavesData, setLeavesData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const att = await API.get("/attendance");
      const leaves = await API.get("/leave");

      setAttendanceData(att.data);
      setLeavesData(leaves.data);
    } catch (err) {
      console.log("Error loading data");
    }
  };

  // ✅ UNIQUE PRESENT DAYS
  const uniqueDays = new Set(
    attendanceData.map((item) =>
      new Date(item.checkIn).toDateString()
    )
  );
  const presentDays = uniqueDays.size;

  // ✅ LEAVE DAYS CALCULATION
  const calculateLeaveDays = () => {
    let total = 0;

    leavesData.forEach((leave) => {
      const start = new Date(leave.fromDate);
      const end = new Date(leave.toDate);

      const diff =
        (end - start) / (1000 * 60 * 60 * 24) + 1;

      total += diff;
    });

    return total;
  };

  const handleCheckIn = async () => {
    try {
      await API.post("/attendance/checkin");
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  const handleCheckOut = async () => {
    try {
      await API.post("/attendance/checkout");
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Dashboard
      </Typography>

      {/* STATS */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography>Total Present Days</Typography>
            <Typography variant="h4">{presentDays}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography>Total Leaves</Typography>
            <Typography variant="h4">
              {calculateLeaveDays()}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* ACTIONS */}
      <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<AccessTimeIcon />}
            onClick={handleCheckIn}
          >
            Check In
          </Button>

          <Button
            variant="outlined"
            onClick={handleCheckOut}
          >
            Check Out
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default Dashboard;