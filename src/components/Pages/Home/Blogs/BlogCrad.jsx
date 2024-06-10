import { Link } from "react-router-dom";

const BlogCrad = ({blog}) => {
    const {_id, title, image, status} = blog;
    return (
        <div>
            <div className="card w-full bg-base-100 shadow-xl">
                <figure><img src={image} alt="" /></figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {title}
                    </h2>
                    <div className="badge badge-outline">{status}</div>
                    <div className="card-actions justify-end flex-1">
                      <Link to={`/blog-details/${_id}`}><button className="btn bg-red-500 text-white rounded-none">View Blog</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCrad;