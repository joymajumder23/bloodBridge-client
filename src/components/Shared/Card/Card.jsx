import { TbListDetails } from "react-icons/tb";
import { Link } from "react-router-dom";

const Card = ({ req }) => {
    const { _id, blood, recipientName, location, donationDate, status } = req;
    return (
        <div>
            <div className="card card-side bg-base-100 shadow-xl">
                {/* <figure><img src={image} alt="Movie" /></figure> */}
                <div className="card-body">
                    <h2 className="card-title text-3xl text-red-500">{blood}</h2>
                    <p className="badge bg-yellow-500 text-white p-2">{status}</p>
                    <div>
                        <h3 className="font-medium"><span className="text-red-500">Recipient Name:</span> <span>{recipientName}</span></h3>
                        <p className="font-medium"><span className="text-red-500">Location:</span> <span>{location}</span></p>
                        <p className="font-medium"><span className="text-red-500">Date:</span> <span>{donationDate}</span></p>
                    </div>
                    <div className="card-actions justify-end">
                        <Link><button className="btn bg-red-500 rounded-none text-white"><TbListDetails /> View Details</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;