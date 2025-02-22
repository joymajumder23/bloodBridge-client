import { FaRegHospital } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { MdDateRange } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { Link } from "react-router-dom";

const Card = ({ req }) => {
    const { _id, blood, recipientName, location, donationDate, status } = req;
    return (
        <div>
            <div className="card bg-base-100 shadow-xl w-full hover:shadow-2xl hover:scale-[1.05] transition-all rounded-none">
                {/* <figure><img src={image} alt="Movie" /></figure> */}
                <div className="card-body">
                    <h2 className="card-title text-3xl text-red-500">{blood}</h2>
                    <p className="badge bg-yellow-500 text-white p-2">{status}</p>
                    <div>
                        <h3 className="font-medium flex gap-1 items-center"><FiUser></FiUser> <span className="text-red-500">Recipient Name: </span> <span>{recipientName}</span></h3>
                        <p className="font-medium flex gap-1 items-center"><FaRegHospital/> <span className="text-red-500">Location:</span> <span>{location}</span></p>
                        <p className="font-medium flex gap-1 items-center"><MdDateRange/> <span className="text-red-500">Date:</span> <span>{donationDate}</span></p>
                    </div>
                    <div className="card-actions justify-end">
                        <Link to={`/request-details/${_id}`}><button className="btn bg-red-500 rounded-none text-white"><TbListDetails /> View Details</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;