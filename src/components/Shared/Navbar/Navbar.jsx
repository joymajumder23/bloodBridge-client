import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
    const { user, logOut } = useAuth();

    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/blood-donation-req">Donation Request</NavLink></li>
        <li><NavLink to="/blog">Blog</NavLink></li>
        {
            user ? <li><NavLink to="/funding">Funding</NavLink></li> : <li><NavLink to="/login">Login</NavLink></li>
        }
    </>;

    const signOutUser = () => {
        logOut()
        .then(() => {
            toast.success('Logout');
        })
    }
    return (
        <div>
            <div className="navbar bg-base-100 z-10">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user && <div className="dropdown dropdown-end z-10">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                {
                                    user && <li><Link to="/dashboard"><a>Dashboard</a></Link></li>
                                }
                                <li onClick={signOutUser}><a>Logout</a></li>
                            </ul>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;