import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Leave from "./pages/Leave";
import Timesheet from "./pages/Timesheet";

import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Leave */}
        <Route
          path="/leave"
          element={
            <PrivateRoute>
              <Layout>
                <Leave />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Timesheet */}
        <Route
          path="/timesheet"
          element={
            <PrivateRoute>
              <Layout>
                <Timesheet />
              </Layout>
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;