import { useLoaderData } from "react-router-dom";

const BlogDetails = () => {
    const blogDetails = useLoaderData();
    console.log(blogDetails);
    const {title, image, details} = blogDetails;
    return (
        <div className="max-w-screen-xl mx-auto mt-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 p-2">Details:</h1>
            <div>
                <div className="card card-compact w-full bg-base-100 shadow-xl p-2">
                    <figure><img className="w-full h-full lg:h-[500px]" src={image} alt="" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-2xl">{title}</h2>
                        <p className="text-xl">{details}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;