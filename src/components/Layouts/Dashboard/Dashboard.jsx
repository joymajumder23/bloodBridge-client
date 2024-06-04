import { RiMenu2Line } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center">
                    {/* Page content here */}
                    <div>
                    <Outlet></Outlet>
                    </div>
                    <label htmlFor="my-drawer-2" className="btn drawer-button lg:hidden"><RiMenu2Line></RiMenu2Line></label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li><NavLink to="/dashboard/donorsHome">Donor Home</NavLink></li>
                        <li><NavLink to="/dashboard/profile">Profile</NavLink></li>
                        <li><NavLink to="/dashboard/create-donation-request">Create Donation Request</NavLink></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;