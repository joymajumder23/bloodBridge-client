import { RiMenu2Line } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";
import Sidebar from "../../Dashboard/Sidebar/Sidebar";

const Dashboard = () => {
    return (
        <div className='relative min-h-screen md:flex'>
        {/* Sidebar */}
        <Sidebar />
  
        {/* Outlet --> Dynamic content */}
        <div className='flex-1 md:ml-64'>
          <div className='p-5'>
            <Outlet />
          </div>
        </div>
      </div>
    );
};

export default Dashboard;