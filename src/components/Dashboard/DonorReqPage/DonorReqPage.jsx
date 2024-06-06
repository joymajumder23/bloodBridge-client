import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Skeleton from "../../Shared/Skeleton/Skeleton";
import { TiEdit } from "react-icons/ti";
import { MdDelete } from "react-icons/md";

const DonorReqPage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data, isLoading, error } = useQuery({
        queryKey: ['reqData', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/request/${user?.email}`);
            console.log('API Response:', res); // Log the entire response
            return res.data;
        }
    });

    if (isLoading) {
        return <Skeleton />;
    }

    if (error) {
        return <div>Error loading data</div>;
    }

    const requestData = data ? data : []; // Wrap the single object in an array if it exists
    console.log('Request Data:', requestData); // Log the request data

    return (
        <div>
            <h1>My Donor Request</h1>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Recipient Name</th>
                                <th>Recipient Location</th>
                                <th>Donation Date</th>
                                <th>Donation Time</th>
                                <th>Donation Status</th>
                                <th>Donor</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requestData.map((data, index) => (
                                <tr key={data._id} className="hover">
                                    <th>{index + 1}</th>
                                    <td>{data.recipientName}</td>
                                    <td>{data.location}</td>
                                    <td>{data.donationDate}</td>
                                    <td>{data.donationTime}</td>
                                    <td>{data.status}</td>
                                    <td>{data.donor}</td>
                                    <td className="flex gap-2"><button><TiEdit className="text-green-500 text-xl"></TiEdit></button> <button><MdDelete className="text-red-500 text-xl"></MdDelete></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DonorReqPage;
