import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaRegAddressCard, FaUserNurse } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdBloodtype } from "react-icons/md";
import { BiSolidMessageAltDots } from "react-icons/bi";

const RequestDetails = () => {
    const reqDetails = useLoaderData();
    console.log(reqDetails);
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const {_id, recipientName, address, blood, district, upazila, donationDate, donationTime, location, status, requesterName, requesterEmail, details} = reqDetails;

    const donorInfo = {
        donorName: user?.displayName,
        donorEmail: user?.email
    };

     // donate
     const handleDonate = _id => {
                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to donate this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, donate it!"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const res = await axiosSecure.patch(`/request/inprogress/${_id}`, donorInfo)
                        console.log(res.data);
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Donated!",
                                text: "Your blood has donate.",
                                icon: "success"
                            });
                        }
                    }
                
            })
    }
    return (
        <div className="max-w-screen-xl mx-auto">
            <h1 className="text-xl p-2">{recipientName} Details</h1>
           <div className="lg:flex gap-2 p-2">
           <div className="card w-full bg-base-200 text-neutral-content rounded-none">
                <div className="items-center text-start text-black p-6">
                    <div className="space-y-3">
                    <div className="flex justify-between items-center">
                    <h2 className="card-title text-3xl"><span className="text-red-500"><FaUserNurse /> Recipient Name: <span className="text-black">{recipientName}</span></span></h2>
                    <p className={`badge p-6 text-white font-semibold ${status === 'pending'? 'bg-yellow-500' : status === 'inprogress'? 'bg-blue-500' : ''}`}>{status}</p>
                    </div>
                    <div className="flex justify-between flex-row-reverse items-center">
                        <div>
                        <h3><span className="text-xl font-semibold"><MdBloodtype /> Blood Group:</span> <span className="text-xl lg:text-3xl font-medium text-red-500">{blood}</span></h3>
                        </div>
                        <div>
                        <div><span className="text-2xl font-semibold flex gap-1 items-center"><FaRegAddressCard /> Address:</span>
                    <h3><span className="text-xl font-semibold">Home:</span> <span className="text-xl font-medium">{address}</span></h3>
                    <h3><span className="text-xl font-semibold">Upazila:</span> <span className="text-xl font-medium">{upazila}</span></h3>
                    <h3><span className="text-xl font-semibold">District:</span> <span className="text-xl font-medium">{district}</span></h3>
                    </div>
                        </div>
                    </div>
                    <div>
                        <span className="text-2xl font-semibold flex gap-1 items-center"><FaMapLocationDot /> Donate Location:</span>
                        <h3><span className="text-xl font-semibold">Location:</span> <span className="text-xl font-medium">{location}</span></h3>
                    </div>
                    <div>
                        <h3><span className="text-xl font-semibold">Donation Date:</span> <span className="text-xl font-medium">{donationDate}</span></h3>
                        <h3><span className="text-xl font-semibold">Donation Time:</span> <span className="text-xl font-medium">{donationTime}</span></h3>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold flex gap-1 items-center"><BiSolidMessageAltDots /> Message:</h1>
                        <p className="text-xl font-medium">{details}</p>
                    </div>
                    </div>
                    <div className="card-actions justify-end">
                        {
                            status === 'pending' && <button onClick={() => handleDonate(_id)} className="btn bg-red-500 text-white rounded-none">Donate</button>
                        }
                    </div>
                </div>
            </div>
            <div className="card lg:w-1/3 lg:h-1/3 bg-base-200 text-neutral-content rounded-none">
                <div className="card-body items-center text-center text-black">
                    <h2 className="card-title">Requested By:</h2>
                    <p><span>Name:</span> <span>{requesterName}</span></p>
                    <p><span>Email:</span> <span>{requesterEmail}</span></p>
                </div>
            </div>
           </div>
        </div>
    );
};

export default RequestDetails;