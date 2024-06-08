import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Skeleton from "../../Shared/Skeleton/Skeleton";
import toast from "react-hot-toast";
import ReqTable from "../ReqTable/ReqTable";
import Swal from "sweetalert2";

const DonorReqPage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    console.log(user?.email);
  
    const { data, isLoading, error, refetch } = useQuery({
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

    // delete 
    const handleDelete = (data) => {
        console.log(data);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/request/${data._id}`)
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });

                }

            }
        });
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

export default DonorReqPage;
