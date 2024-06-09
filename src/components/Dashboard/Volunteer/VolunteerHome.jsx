import useAuth from "../../Hooks/useAuth";
import Skeleton from "../../Shared/Skeleton/Skeleton";

const VolunteerHome = () => {
    const {user, loading} = useAuth();

    if(loading) {
        return <Skeleton />
    }
    
    return (
        <div>
            <h1 className="text-3xl text-red-500 font-bold mt-6"><span className="text-black">Hi, Welcome </span>
                {
                    user?.displayName ? user?.displayName : "Back"
                } </h1>
        </div>
    );
};

export default VolunteerHome;