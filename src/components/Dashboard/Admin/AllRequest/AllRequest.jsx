import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Skeleton from "../../../Shared/Skeleton/Skeleton";
import ReqTable from "../../ReqTable/ReqTable";

const AllRequest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    console.log(user?.email);
  
    // delete
    const { mutateAsync } = useMutation({
        mutationFn: async _id => {
            console.log(_id);
            const {data} = await axiosSecure.delete(`/request/${_id}`);
            return data;
        },
        onSuccess: (data) => {
            refetch();
            toast.success("Deleted Successfully");
        }
    })

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['reqData', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/request');
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

    // delete
    const handleDelete = async _id => {
        console.log(_id);
        try{
           await mutateAsync(_id);
        }
        catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div>
            <h1>My Donor Request</h1>
            <div>
               <ReqTable requestData={requestData} handleDelete={handleDelete}></ReqTable>
            </div>
        </div>
    );
};

export default AllRequest;