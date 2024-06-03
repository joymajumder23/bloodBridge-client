import { createBrowserRouter } from "react-router-dom";
import Main from "../components/Main/Main";
import Home from "../components/Pages/Home/Home/Home";
import Login from "../components/Pages/Login/Login";
import Register from "../components/Pages/Register/Register";
import Dashboard from "../components/Layouts/Dashboard/Dashboard";
import Profile from "../components/Dashboard/Profile/Profile";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
          path: "/login",
          element: <Login></Login>
        },
        {
          path: "/register",
          element: <Register></Register>
        }
      ]
    },
    {
      path: "dashboard",
      element: <Dashboard></Dashboard>,
      children: [
        {
          path: "profile",
          element: <Profile></Profile>
        }
      ]
    }
  ]);

  export default router;