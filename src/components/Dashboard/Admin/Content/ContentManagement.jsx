import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Skeleton from "../../../Shared/Skeleton/Skeleton";
import useAdmin from "../../../Hooks/useAdmin";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const ContentManagement = () => {
    const [isAdmin] = useAdmin();
    const axiosSecure = useAxiosSecure();
    const [displayBlogs, setDisplayBlogs] = useState([]);
    const [filter, setFilter] = useState('all');

    const { data: blogs, isLoading, refetch } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/blogs');
            return res.data;
        }
    })

    // filter
    const handleBlogsFilter = filter => {
        if (filter === 'all') {
            setDisplayBlogs(blogs);
        }
        else if (filter === 'draft') {
            const draftBlogs = blogs.filter(blog => blog.status === 'draft');
            setDisplayBlogs(draftBlogs);
        }
        else if (filter === 'published') {
            const draftPublish = blogs.filter(blog => blog.status === 'published');
            setDisplayBlogs(draftPublish);
        }
    }
    
    useEffect(() => {
        handleBlogsFilter(filter);
    }, [blogs, filter]);

    const handleSelectChange = (event) => {
        const selectedFilter = event.target.value;
        setFilter(selectedFilter);
    };

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
            <Helmet>
                <title>Dashboard | Contents</title>
            </Helmet>
            <h1 className="text-3xl font-bold">Contents</h1>
            <div className="flex justify-between">
                <div className="flex items-center gap-6"><h1 className="text-xl font-bold">All Contents</h1>
                    <div>
                        <div>
                            <select onChange={handleSelectChange} value={filter} className="select select-bordered w-full max-w-xs">
                                <option selected value="all">All</option>
                                <option value="draft">Draft</option>
                                <option value="published">Publish</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <Link to="/dashboard/addBlog"><button className="btn bg-red-500 text-white rounded-none">Add Blog</button></Link>
                </div>
            </div>
            <div>
                {
                    isAdmin ? <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayBlogs?.map((data, index) => (
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