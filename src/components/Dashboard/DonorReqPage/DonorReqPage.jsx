import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import ReqTable from "../ReqTable/ReqTable";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Skeleton from "../../Shared/Skeleton/Skeleton";

const DonorReqPage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const { data: reqData = [], isLoading } = useQuery({
        queryKey: ['reqData', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/request/${user?.email}`);
            return res.data;
        }
    })
    console.log(reqData);
    
if(isLoading){
    return <Skeleton></Skeleton>;
}
    return (
        <div>
            <h1>My Donor Request</h1>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
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
                            {
                                reqData?.map(data => <tr key={data._id} className="hover">
                                    <th></th>
                                    <td>{data.blood}</td>
                                    <td>Quality Control Specialist</td>
                                    <td>Blue</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DonorReqPage;