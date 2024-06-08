import { TbListDetails } from "react-icons/tb";
import { Link } from "react-router-dom";

const Card = ({ blog }) => {
    const { _id, title, image } = blog;
    return (
        <div>
            <div className="card card-side bg-base-100 shadow-xl">
                <figure><img src={image} alt="Movie" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <div className="card-actions justify-end">
                        <Link><button className="btn bg-red-500 rounded-none text-white"><TbListDetails /> View Details</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;