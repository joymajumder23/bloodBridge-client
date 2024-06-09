import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Skeleton from "../../../Shared/Skeleton/Skeleton";
import useAdmin from "../../../Hooks/useAdmin";
import useVolunteer from "../../../Hooks/useVolunteer";

const ContentManagement = () => {
    const [isAdmin] = useAdmin();
    const [isVolunteer] = useVolunteer();
    const axiosSecure = useAxiosSecure();
    const { data: blogs, isLoading, refetch } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/blogs');
            return res.data;
        }
    })
    console.log(blogs);
    if (isLoading) {
        return <Skeleton />
    }
    // published
    const handlePublished = data => {
        axiosSecure.patch(`/blogs/published/${data?._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    toast.success('Published Successfully');
                }
            })
    }

    // unpublished
    const handleUnPublished = data => {
        axiosSecure.patch(`/blogs/draft/${data?._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    toast.success('Unpublished Successfully');
                }
            })
    }

    // delete 
    const handleDelete = (data) => {
        console.log(data);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/blogs/${data._id}`)
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });

                }

            }
        });
    }
    return (
        <div>
            <h1>Contents</h1>
            <div className="flex justify-between">
                <div>All Contents</div>
                <div>
                    <Link to="/dashboard/addBlog"><button className="btn bg-red-500 text-white rounded-none">Add Blog</button></Link>
                </div>
            </div>
            <div>
                {
                    isAdmin? <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Action</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs?.map((data, index) => (
                                <tr key={data._id} className="hover">
                                    <th>{index + 1}</th>
                                    <td>{data.title}</td>
                                    {/* <td>{data.status}</td> */}
                                    <td className={`${data.status === 'published' && 'text-green-500' || data.status === 'draft' && 'text-yellow-500'}`}>{data.status}</td>
                                    <td>
                                        {
                                            data?.status === 'draft' ?
                                                <button onClick={() => handlePublished(data)} className="badge">Publish</button> : <button onClick={() => handleUnPublished(data)} className="badge">Unpublish</button>

                                        }
                                    </td>
                                    <td>
                                        <Link to={`/dashboard/reqUpdate/${data._id}`}><button><TiEdit className="text-green-500 text-xl"></TiEdit></button></Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(data)}
                                            className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                                        >
                                            <span
                                                aria-hidden='true'
                                                className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
                                            ></span>
                                            <span className='relative'><MdDelete className="text-red-500 text-xl"></MdDelete></span>
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> : 
                <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs?.map((data, index) => (
                            <tr key={data._id} className="hover">
                                <th>{index + 1}</th>
                                <td>{data.title}</td>
                                {/* <td>{data.status}</td> */}
                                <td className={`${data.status === 'published' && 'text-green-500' || data.status === 'draft' && 'text-yellow-500'}`}>{data.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
                }
            </div>
        </div>
    );
};

export default ContentManagement;