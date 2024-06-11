import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaUsersLine } from "react-icons/fa6";
import { FaDonate } from "react-icons/fa";
import { BiSolidDonateBlood } from "react-icons/bi";

const Stats = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure('/admin-stats');
            return (res.data);
        }
    });
    return (
        <div>
            <div className="stats stats-vertical lg:stats-horizontal shadow">

                <div className="stat">
                    <div className="stat-desc"><FaUsersLine className="w-10 h-10" /></div>
                    <div className="stat-value">{stats?.users}</div>
                    <div className="stat-title">Users</div>
                </div>

                <div className="stat">
                    <div className="stat-desc"><FaDonate className="w-10 h-9 md:ml-8" />
                    </div>
                    <div className="stat-value">{stats?.totalFund}$</div>
                    <div className="stat-title">Total Funding</div>
                </div>

                <div className="stat">
                    <div className="stat-desc"><BiSolidDonateBlood className="w-10 h-9 md:ml-24"/></div>
                    <div className="stat-value">{stats?.requestTotal}</div>
                    <div className="stat-title">Total Blood Donation Request</div>
                </div>

            </div>
        </div>
    );
};

export default Stats;