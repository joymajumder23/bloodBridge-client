import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Skeleton from "../../Shared/Skeleton/Skeleton";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [displayUsers, setDisplayUsers] = useState([]);
    const [filter, setFilter] = useState('all');

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })
    console.log(users);

     // filter
     const handleUsersFilter = filter => {
        if (filter === 'all') {
            setDisplayUsers(users);
        }
        else if (filter === 'active') {
            const draftBlogs = users.filter(blog => blog.status === 'active');
            setDisplayUsers(draftBlogs);
        }
        else if (filter === 'blocked') {
            const draftPublish = users.filter(blog => blog.status === 'blocked');
            setDisplayUsers(draftPublish);
        }
    }

    const handleSelectChange = (event) => {
        const selectedFilter = event.target.value;
        setFilter(selectedFilter);
    };
    
    useEffect(() => {
        handleUsersFilter(filter);
    }, [users, filter]);

    if (isLoading) {
        return <Skeleton />;
    }
    const handleMakeAdmin = data => {
        axiosSecure.patch(`/users/admin/${data?._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    toast.success('Admin Successfully');
                }
            })
    }

    const handleMakeVolunteer = data => {
        axiosSecure.patch(`/users/volunteer/${data?._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    toast.success('Volunteer Successfully');
                }
            })
    }

    const handleActive = data => {
        axiosSecure.patch(`/users/active/${data?._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    toast.success('Active Successfully');
                }
            })
    }

    const handleBlocked = data => {
        axiosSecure.patch(`/users/blocked/${data?._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    toast.success('Blocked Successfully');
                }
            })
    }


    return (
        <div>
            <h1 className="text-3xl font-bold">All Users</h1>
            <div>
                <select onChange={handleSelectChange} value={filter} className="select select-bordered w-full max-w-xs">
                    <option selected value="all">All</option>
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action Role</th>
                            <th>Action Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            displayUsers.map((data, index) => <tr key={data._id}>
                                <th>
                                    <label>
                                        {index + 1}
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={data?.avatar} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{data?.name}</div>
                                            <div className="text-sm opacity-50">{data?.upazila}, {data?.district}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{data?.email}</td>
                                <td>{data?.role}</td>
                                <td className={`badge ${data?.status === 'active' ? 'bg-green-500' : 'bg-red-500'} text-white`}>{data?.status}</td>
                                <td>
                                    {
                                        data.role !== 'admin' && <button onClick={() => handleMakeAdmin(data)} className="badge">Admin</button>
                                    }
                                    {
                                        data.role !== 'volunteer' && <button onClick={() => handleMakeVolunteer(data)} className="badge">Volunteer</button>
                                    }
                                </td>
                                <td>
                                    {
                                        data.status !== 'active' && <button onClick={() => handleActive(data)} className="badge">Unblock</button>
                                    }
                                    {
                                        data.status !== 'blocked' && <button onClick={() => handleBlocked(data)} className="badge">Block</button>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;