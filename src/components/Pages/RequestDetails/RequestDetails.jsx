import { useLoaderData } from "react-router-dom";

const RequestDetails = () => {
    const reqDetails = useLoaderData();
    console.log(reqDetails);
    const {recipientName, address, blood, district, upazila, donationDate, donationTime, location, status, requesterName, requesterEmail} = reqDetails;
    return (
        <div className="max-w-screen-xl mx-auto">
            <h1 className="text-xl">{recipientName} Details</h1>
           <div className="flex gap-2">
           <div className="card w-full bg-base-200 text-neutral-content rounded-none">
                <div className="items-center text-start text-black p-6">
                    <div>
                    <div className="flex justify-between items-center">
                    <h2 className="card-title text-3xl"><span className="text-red-500">Recipient Name: <span className="text-black">{recipientName}</span></span></h2>
                    <p className="badge p-6">{status}</p>
                    </div>
                    <div className="flex justify-between flex-row-reverse items-center">
                        <div>
                        <h3><span className="text-xl font-semibold">Blood Group:</span> <span className="text-xl lg:text-3xl font-medium text-red-500">{blood}</span></h3>
                        </div>
                        <div>
                        <div><span className="text-2xl font-semibold">Address:</span>
                    <h3><span className="text-xl font-semibold">Home:</span> <span className="text-xl font-medium">{address}</span></h3>
                    <h3><span className="text-xl font-semibold">Upazila:</span> <span className="text-xl font-medium">{upazila}</span></h3>
                    <h3><span className="text-xl font-semibold">District:</span> <span className="text-xl font-medium">{district}</span></h3>
                    </div>
                        </div>
                    </div>
                    <div>
                        <span className="text-2xl font-semibold">Donate Location:</span>
                        <h3><span className="text-xl font-semibold">Location:</span> <span className="text-xl font-medium">{location}</span></h3>
                    </div>
                    <div>
                        <h3><span className="text-xl font-semibold">Donation Date:</span> <span className="text-xl font-medium">{donationDate}</span></h3>
                        <h3><span className="text-xl font-semibold">Donation Time:</span> <span className="text-xl font-medium">{donationTime}</span></h3>
                    </div>
                    </div>
                    <div className="card-actions justify-end">
                        <button className="btn bg-red-500 text-white rounded-none">Donate</button>
                    </div>
                </div>
            </div>
            <div className="card w-1/3 h-1/3 bg-base-200 text-neutral-content rounded-none">
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