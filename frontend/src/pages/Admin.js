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
  Button,
} from "@mui/material";
import API from "../services/api";

function Admin() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    const res = await API.get("/leave");
    setLeaves(res.data);
  };

  const handleApprove = async (id) => {
    await API.post(`/leave/approve/${id}`);
    fetchLeaves();
  };

  const handleReject = async (id) => {
    await API.post(`/leave/reject/${id}`);
    fetchLeaves();
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Admin Panel 👨‍💼
      </Typography>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {leaves.map((leave) => (
              <TableRow key={leave.id}>
                <TableCell>{leave.userId}</TableCell>
                <TableCell>{leave.reason}</TableCell>
                <TableCell>
                  <Button
                    color="success"
                    onClick={() => handleApprove(leave.id)}
                  >
                    Approve
                  </Button>

                  <Button
                    color="error"
                    onClick={() => handleReject(leave.id)}
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default Admin;