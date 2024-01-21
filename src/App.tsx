import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home";
import Navbar from "./components/Navbar";
import Login from "./screens/Login";
import ProtectedRoute from "./components/Providers/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
