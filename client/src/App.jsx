import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SortFlights from "./pages/SortFlights";
import AddFlight from "./pages/AddFlight";
import DeleteFlight from "./pages/DeleteFlight";
import NotFoundPage from "./pages/NotFoundPage";
import AuthProvider from "./context/AuthProvider";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <main>
      <AuthProvider>
        <Sidebar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/controlpanel"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/controlpanel/sort"
            element={
              <ProtectedRoute>
                <SortFlights />
              </ProtectedRoute>
            }
          />
          <Route
            path="/controlpanel/add"
            element={
              <ProtectedRoute>
                <AddFlight />
              </ProtectedRoute>
            }
          />
          <Route
            path="/controlpanel/delete"
            element={
              <ProtectedRoute>
                <DeleteFlight />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </main>
  );
}

export default App;
