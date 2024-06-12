import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
const DonorsHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: reqData = [], isLoading, error, refetch } = useQuery({
        queryKey: ['reqData'],
        queryFn: async () => {
            const res = await axiosSecure.get('/request');
            return res.data;
        }
    });
    const requestData = reqData.filter(data => data.requesterEmail !== user?.email);
    console.log(requestData);

    const donorInfo = {
        donorName: user?.displayName,
        donorEmail: user?.email
    };

    // donate
    const handleDonate = data => {
        axiosSecure.patch(`/request/inprogress/${data?._id}`, donorInfo)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    toast.success('Donate Successfully');
                }
            })
    }
    // done
    const handleDone = data => {
        axiosSecure.patch(`/request/done/${data?._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    toast.success('Done Successfully');
                }
            })
    }

    // cancel
    const handleCancel = data => {
        axiosSecure.patch(`/request/cancel/${data?._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    toast.success('Canceled Successfully');
                }
            })
    }
    return (
        <div>
            <Helmet>
                <title>Dashboard | Donor Home</title>
            </Helmet>
            <h1 className="text-3xl text-red-500 font-bold mt-6"><span className="text-black">Hi, Welcome </span>
                {
                    user?.displayName ? user?.displayName : "Back"
                } </h1>

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
                                <th>Donate</th>
                                <th>Action</th>
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
                                    {
                                        data?.status === 'pending' && 
                                        <td> {
                                            data.status !== 'inprogress' && <button onClick={() => handleDonate(data)} className="badge bg-yellow-500 text-white">Donate</button>
                                        }</td>
                                    }
                                    {
                                        data?.status === 'inprogress' && <td>
                                        {
                                            data.status !== 'done' && <button  onClick={() => handleDone(data)} className="badge bg-green-500 text-white">Done</button>
                                        }
                                    </td>
                                    }
                                    {
                                        data?.status === 'inprogress' && 
                                         <td>
                                         {
                                                 data.status !== 'cancel' && <button  onClick={() => handleCancel(data)} className="badge bg-red-500 text-white">Cancel</button>
                                             }
                                         </td>
                                    }
                                   
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DonorsHome;