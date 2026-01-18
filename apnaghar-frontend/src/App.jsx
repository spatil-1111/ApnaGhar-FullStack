import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Bookings from "./pages/Bookings";
import OwnerBookings from "./pages/OwnerBookings";
import OwnerAddProperty from "./pages/OwnerAddProperty";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/owner/add-property" element={<OwnerAddProperty />} />

        {/* Protected Routes */}
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />


        <Route
          path="/owner/bookings"
          element={
            <ProtectedRoute>
              <OwnerBookings />
            </ProtectedRoute>
          }
        />


        <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />



      </Routes>

      <Routes>
  {/* all your routes here */}
</Routes>

<Footer />

    </BrowserRouter>
  );
}

export default App;
