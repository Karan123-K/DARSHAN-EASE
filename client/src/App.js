import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Temples from "./pages/Temples";
import TempleDetails from "./pages/TempleDetails";
import Dashboard from "./pages/Dashboard";

import AdminDashboard from "./pages/AdminDashboard";
import AdminSlots from "./pages/AdminSlots";
import AdminTemples from "./pages/AdminTemples";
import AdminBookings from "./pages/AdminBookings";
import AdminStats from "./pages/AdminStats";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Public Pages */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/temples" element={<Temples />} />

        <Route path="/temple/:id" element={<TempleDetails />} />


        {/* User Dashboard */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          }
        />


        {/* Admin Dashboard */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard/>
            </ProtectedRoute>
          }
        />


        {/* Admin Manage Temples */}

        <Route
          path="/admin/temples"
          element={
            <ProtectedRoute>
              <AdminTemples/>
            </ProtectedRoute>
          }
        />


        {/* Admin Manage Slots */}

        <Route
          path="/admin/slots"
          element={
            <ProtectedRoute>
              <AdminSlots/>
            </ProtectedRoute>
          }
        />


        {/* Admin View Bookings */}

        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute>
              <AdminBookings/>
            </ProtectedRoute>
          }
        />


        {/* Admin Booking Statistics */}

        <Route
          path="/admin/stats"
          element={
            <ProtectedRoute>
              <AdminStats/>
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;