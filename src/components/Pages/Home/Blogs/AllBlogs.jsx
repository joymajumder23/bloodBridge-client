import { useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import BlogCrad from "./BlogCrad";
import Skeleton from "../../../Shared/Skeleton/Skeleton";
import { Helmet } from "react-helmet-async";

const AllBlogs = () => {
    const axiosPublic = useAxiosPublic();
    const [blogData, setBlogData] = useState([]);
    const { data, isLoading } = useQuery({
        queryKey: [''],
        queryFn: async () => {
            const res = await axiosPublic.get('/blogs');
            setBlogData(res.data);
        }
    })
    console.log(blogData);
    const blogFilter = blogData.filter(data => data.status === 'published');
    if(isLoading) {
        return <Skeleton />;
    }
    return (
        <div>
            <Helmet>
                <title>Home | Blog</title>
            </Helmet>
             <div className="max-w-screen-xl mx-auto mt-12 text-center">
            <h1 className="text-4xl font-bold mb-6">Blogs</h1>
            <div className="grid gid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    blogFilter?.map(blog => <BlogCrad key={blog._id} blog={blog}></BlogCrad>)
                }
            </div>
        </div>
        </div>
    );
};

export default AllBlogs;