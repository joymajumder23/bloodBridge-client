import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "../../Shared/Skeleton/Skeleton";

const AllBloodReqPage = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: reqData = [], isLoading, refetch } = useQuery({
        queryKey: ['reqData'],
        queryFn: async () => {
            const res = await axiosSecure.get('/request');
            return res.data;
        }
    });
    if(isLoading) {
        return <Skeleton />;
    }
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
    );
};

export default AllBloodReqPage;