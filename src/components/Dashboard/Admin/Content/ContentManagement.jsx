import { Link } from "react-router-dom";

const ContentManagement = () => {
    return (
        <div>
            <h1>Contents</h1>
            <div className="flex justify-between">
                <div>All Contents</div>
                <div>
                    <Link to="/dashboard/addBlog"><button className="btn bg-red-500 text-white rounded-none">Add Blog</button></Link>
                </div>
            </div>
        </div>
    );
};

export default ContentManagement;