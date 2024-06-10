import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Card from "../../Shared/Card/Card";

const BloodDonationReq = () => {
    const axiosPublic = useAxiosPublic();

    const {data: reqData} = useQuery({
        queryKey: ['reqData'],
        queryFn: async () => {
            const res = await axiosPublic.get('/request');
            return res.data;
        }
    });
    console.log(reqData);

    const pendingReqData = reqData?.filter(data => data?.status === 'pending');
    console.log(pendingReqData);
    return (
        <div className="max-w-screen-xl mx-auto mt-6">
            <h1 className="text-3xl md:text-4xl mb-6">Donation Request</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 p-2">
                {
                    pendingReqData?.map(req => <Card key={req._id} req={req}></Card>)
                }
            </div>
        </div>
    );
};

export default BloodDonationReq;