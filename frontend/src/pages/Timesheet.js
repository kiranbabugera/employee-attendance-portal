import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import API from "../services/api";

function Timesheet() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    const res = await API.get("/attendance");
    setData(res.data);
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN");

  const formatTime = (date) =>
    date ? new Date(date).toLocaleTimeString("en-IN") : "-";

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Timesheet 📅
      </Typography>

      <Paper sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: "#f5f5f5" }}>
              <TableCell>Date</TableCell>
              <TableCell>Check In</TableCell>
              <TableCell>Check Out</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{formatDate(row.checkIn)}</TableCell>
                <TableCell>{formatTime(row.checkIn)}</TableCell>
                <TableCell>{formatTime(row.checkOut)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default Timesheet;