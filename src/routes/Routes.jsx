import { createBrowserRouter } from "react-router-dom";
import Main from "../components/Main/Main";
import Home from "../components/Pages/Home/Home/Home";
import Login from "../components/Pages/Login/Login";
import Register from "../components/Pages/Register/Register";
import Dashboard from "../components/Layouts/Dashboard/Dashboard";
import Profile from "../components/Dashboard/Profile/Profile";
import DonorsHome from "../components/Dashboard/DonorsHome/DonorsHome";
import CreateDonation from "../components/Dashboard/CreateDonation/CreateDonation";
import DonorReqPage from "../components/Dashboard/DonorReqPage/DonorReqPage";
import AllUsers from "../components/Dashboard/AllUsers/AllUsers";
import PrivateRoute from "../components/Private/PrivateRoute";
import ReqUpdate from "../components/Dashboard/ReqUpdate/ReqUpdate";
import AdminHome from "../components/Dashboard/Admin/AdminHome/AdminHome";
import AllRequest from "../components/Dashboard/Admin/AllRequest/AllRequest";
import ContentManagement from "../components/Dashboard/Admin/Content/ContentManagement";
import AddBlog from "../components/Dashboard/Admin/Content/AddBlog";
import VolunteerHome from "../components/Dashboard/Volunteer/VolunteerHome";
import BloodDonationReq from "../components/Pages/BloodDonationReq/BloodDonationReq";
import RequestDetails from "../components/Pages/RequestDetails/RequestDetails";

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
          path: "/blood-donation-req",
          element: <BloodDonationReq></BloodDonationReq>
        },
        {
          path: "/request-details/:id",
          element: <RequestDetails></RequestDetails>,
          loader: ({params}) => fetch(`http://localhost:5000/request/requester/${params.id}`)
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
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        {
          path: "profile",
          element: <Profile></Profile>
        },
        {
          path: "donorsHome",
          element: <DonorsHome></DonorsHome>
        },
        {
          path: "create-donation-request",
          element: <CreateDonation></CreateDonation>
        },
        {
          path: "donor-request",
          element: <DonorReqPage></DonorReqPage>
        },
        {
          path: "all-users",
          element: <AllUsers></AllUsers>
        },
        {
          path: "reqUpdate/:id",
          element: <ReqUpdate></ReqUpdate>,
          loader: ({params}) => fetch(`http://localhost:5000/request/requester/${params.id}`)
        },
        // Admin
        {
          path: "adminHome",
          element: <AdminHome></AdminHome>
        },
        {
          path: "all-blood-donation",
          element: <AllRequest></AllRequest>
        },
        {
          path: "content-management",
          element: <ContentManagement></ContentManagement>
        },
        {
          path: "addBlog",
          element: <AddBlog></AddBlog>
        },
        // Volunteer
        {
          path: "volunteerHome",
          element: <VolunteerHome></VolunteerHome>
        }
      ]
    }
  ]);

  export default router;