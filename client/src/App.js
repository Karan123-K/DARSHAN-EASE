import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

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
import Organizer from "./pages/Organizer";

function App() {

  return (

    <AuthProvider>

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


          {/* Admin/Organizer Dashboard */}

          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard/>
              </ProtectedRoute>
            }
          />

          <Route
            path="/organizer"
            element={
              <ProtectedRoute requiredRole="organizer">
                <Organizer/>
              </ProtectedRoute>
            }
          />


          {/* Organizer Manage Slots */}

          <Route
            path="/organizer/slots"
            element={
              <ProtectedRoute requiredRole="organizer">
                <AdminSlots/>
              </ProtectedRoute>
            }
          />


          {/* Organizer View Bookings */}

          <Route
            path="/organizer/bookings"
            element={
              <ProtectedRoute requiredRole="organizer">
                <AdminBookings/>
              </ProtectedRoute>
            }
          />


          {/* Organizer Booking Statistics */}

          <Route
            path="/organizer/stats"
            element={
              <ProtectedRoute requiredRole="organizer">
                <AdminStats/>
              </ProtectedRoute>
            }
          />


          {/* Admin Manage Temples */}

          <Route
            path="/admin/temples"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminTemples/>
              </ProtectedRoute>
            }
          />


          {/* Admin Manage Slots */}

          <Route
            path="/admin/slots"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminSlots/>
              </ProtectedRoute>
            }
          />


          {/* Admin View Bookings */}

          <Route
            path="/admin/bookings"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminBookings/>
              </ProtectedRoute>
            }
          />


          {/* Admin Booking Statistics */}

          <Route
            path="/admin/stats"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminStats/>
              </ProtectedRoute>
            }
          />

        </Routes>

      </BrowserRouter>

    </AuthProvider>

  );

}

export default App;