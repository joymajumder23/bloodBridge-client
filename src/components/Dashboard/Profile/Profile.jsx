import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    console.log(user?.email);
    const { data: profile = [] } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user?.email}`);
            return res.data;
        }
    });
    console.log(profile);

    return (
        <div className="flex gap-6">
            <div>
                <div className="card card-compact w-96 bg-base-100 shadow-xl p-6">
                    <figure><img className={`rounded-full border-4 ${profile?.
                        status === 'active'? 'border-green-600': ""}`}src={profile?.avatar} alt="Shoes" /></figure>
                    <div className="card-body text-center">
                        <h2 className="text-3xl font-bold">{profile?.name}</h2>
                        <p>{profile?.email}</p>
                        <div className={`badge text-center text-white ${profile?.
                        status === 'active'? 'bg-green-600': ""}`}>{profile?.status}</div>
                    </div>
                </div>
            </div>
            <div>
                <div className="card card-compact w-96 bg-base-100 shadow-xl p-6">
                   <div className="flex justify-between items-center">
                   <h1 className="text-4xl">Profile</h1>
                   <button className="btn text-red-600"><FaEdit></FaEdit></button>
                   </div>
                    <div className="card-body">
                        <div>
                            <label htmlFor="">Name</label>
                        <h2 className="card-title">{profile?.name}</h2>
                        </div>
                        <div>
                            <label htmlFor="">Email</label>
                        <h2 className="card-title">{profile?.email}</h2>
                        </div>
                        <div>
                            <label htmlFor="">Address</label>
                       <div className="flex gap-4 items-center">
                       <div>
                            <label htmlFor="">Upazila</label>
                        <h2 className="card-title">{profile?.upazila}</h2>
                        </div>
                        <div>
                            <label htmlFor="">District</label>
                        <h2 className="card-title">{profile?.district}</h2>
                        </div>
                       </div>
                        </div>
                       
                    </div>
                </div>

                {/* <form className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" defaultValue={profile?.name} className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" defaultValue={profile?.email} className="input input-bordered" required />
                    </div>
                   
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form> */}
            </div>
        </div>
    );
};
export default Profile;