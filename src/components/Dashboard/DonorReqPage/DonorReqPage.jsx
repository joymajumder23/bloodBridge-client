import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Skeleton from "../../Shared/Skeleton/Skeleton";
import ReqTable from "../ReqTable/ReqTable";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const DonorReqPage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    console.log(user?.email);
    const [displayRequest, setDisplayRequest] = useState([]);
    const [filter, setFilter] = useState('all');

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['reqData', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/request/${user?.email}`);
            console.log('API Response:', res); // Log the entire response
            return res.data;
        }
    });

    const requestData = data ? data : []; // Wrap the single object in an array if it exists
    console.log('Request Data:', requestData); // Log the request data

    // filter
    const handleUsersFilter = filter => {
        if (filter === 'all') {
            setDisplayRequest(requestData);
        }
        else if (filter === 'pending') {
            const pendingReq = requestData.filter(data => data.status === 'pending');
            setDisplayRequest(pendingReq);
        }
        else if (filter === 'inprogress') {
            const inproReq = requestData.filter(data => data.status === 'inprogress');
            setDisplayRequest(inproReq);
        }
        else if (filter === 'done') {
            const doneReq = requestData.filter(data => data.status === 'done');
            setDisplayRequest(doneReq);
        }
        else if (filter === 'cenceled') {
            const cancelReq = requestData.filter(data => data.status === 'cenceled');
            setDisplayRequest(cancelReq);
        }
    }

    const handleSelectChange = (event) => {
        const selectedFilter = event.target.value;
        setFilter(selectedFilter);
    };

    useEffect(() => {
        handleUsersFilter(filter);
    }, [requestData, filter]);

    if (isLoading) {
        return <Skeleton />;
    }

    if (error) {
        return <div>Error loading data</div>;
    }

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
            <h1 className="text-3xl font-bold">My Donor Request</h1>
            <div>
                <select onChange={handleSelectChange} value={filter} className="select select-bordered w-full max-w-xs">
                    <option selected value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">Inprogress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>
            <div>
                <ReqTable displayRequest={displayRequest} handleDelete={handleDelete}></ReqTable>
            </div>
        </div>
    );
};

export default DonorReqPage;
