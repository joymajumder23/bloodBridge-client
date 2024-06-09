import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { MdBloodtype, MdHomeWork } from 'react-icons/md'
import useAuth from "../../Hooks/useAuth";
import { FaHome } from 'react-icons/fa'
import useAdmin from '../../Hooks/useAdmin'
import useVolunteer from '../../Hooks/useVolunteer'

const Sidebar = () => {
  const { logOut } = useAuth()
  const [isActive, setActive] = useState(false)
  const [isAdmin] = useAdmin();
  const [isVolunteer] = useVolunteer();

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }
  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Link to='/'>
              <img
                // className='hidden md:block'
                src=''
                alt='logo'
                width='100'
                height='100'
              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
          }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            {/* <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto'>
              <Link to='/'>
                <img
                  // className='hidden md:block'
                  src='https://i.ibb.co/4ZXzmq5/logo.png'
                  alt='logo'
                  width='100'
                  height='100'
                />
              </Link>
            </div> */}
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            <nav>
              {
                isAdmin ? <>
                  {/* Admin Home */}
                  <NavLink
                    to='/dashboard/adminHome'
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                      }`
                    }
                  >
                    <MdHomeWork className='w-5 h-5' />

                    <span className='mx-4 font-medium'>Admin Home</span>
                  </NavLink>
                  {/* All Users */}
                  <NavLink
                    to='all-users'
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                      }`
                    }
                  >
                    <MdHomeWork className='w-5 h-5' />

                    <span className='mx-4 font-medium'>All Users</span>
                  </NavLink>
                  {/* All Blood Donation Request */}
                  <NavLink
                    to='all-blood-donation'
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                      }`
                    }
                  >
                    <MdHomeWork className='w-5 h-5' />

                    <span className='mx-4 font-medium'>All Blood Donation Request</span>
                  </NavLink>
                  {/* Content Management*/}
                  <NavLink
                    to='content-management'
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                      }`
                    }
                  >
                    <MdHomeWork className='w-5 h-5' />

                    <span className='mx-4 font-medium'>Content Management</span>
                  </NavLink>
                  
                  {/* Add Blog */}
                  {/* <NavLink
                    to='addBlog'
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                      }`
                    }
                  >
                    <MdHomeWork className='w-5 h-5' />

                    <span className='mx-4 font-medium'>Add Blog</span>
                  </NavLink> */}
                </> : isVolunteer? <>
                {/* Statistics */}
                <NavLink
                    to='/dashboard/volunteerHome'
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                      }`
                    }
                  >
                    <FaHome className='w-5 h-5' />

                    <span className='mx-4 font-medium'>Volunteer Home</span>
                  </NavLink>

                  {/* Content Management*/}
                  <NavLink
                    to='content-management'
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                      }`
                    }
                  >
                    <MdHomeWork className='w-5 h-5' />

                    <span className='mx-4 font-medium'>Content Management</span>
                  </NavLink>
                   {/* All Blood Donation Request */}
                   <NavLink
                    to='all-blood-donation'
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                      }`
                    }
                  >
                    <MdHomeWork className='w-5 h-5' />

                    <span className='mx-4 font-medium'>All Blood Donation Request</span>
                  </NavLink>
                </> : <>
                  {/* Home */}
                  <NavLink
                    to='/dashboard/donorsHome'
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                      }`
                    }
                  >
                    <FaHome className='w-5 h-5' />

                    <span className='mx-4 font-medium'>Donor Home</span>
                  </NavLink>

                  {/* Add Room */}
                  <NavLink
                    to='create-donation-request'
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                      }`
                    }
                  >
                    <MdBloodtype className='w-5 h-5' />

                    <span className='mx-4 font-medium'>Create Donation</span>
                  </NavLink>

                  {/* My Listing */}
                  <NavLink
                    to='donor-request'
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                      }`
                    }
                  >
                    <MdHomeWork className='w-5 h-5' />

                    <span className='mx-4 font-medium'>My Donor Request</span>
                  </NavLink>
                </>
              }

            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          <NavLink
            to='/dashboard/profile'
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
              }`
            }
          >
            <FcSettings className='w-5 h-5' />

            <span className='mx-4 font-medium'>Profile</span>
          </NavLink>
          {/* Home */}
          <NavLink
            to='/'
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
              }`
            }
          >
            <FaHome className='w-5 h-5' />

            <span className='mx-4 font-medium'>Home</span>
          </NavLink>
          <button
            onClick={logOut}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5' />

            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar