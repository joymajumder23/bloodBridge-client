import { useLoaderData } from "react-router-dom";

const BlogDetails = () => {
    const blogDetails = useLoaderData();
    console.log(blogDetails);
    const {title, image, details} = blogDetails;
    return (
        <div className="max-w-screen-xl mx-auto mt-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 p-2">Details:</h1>
            <div>
                <div className="card card-compact w-full bg-base-100 shadow-xl p-2">
                    <figure><img className="w-full" src={image} alt="" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{title}</h2>
                        <p>{details}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;