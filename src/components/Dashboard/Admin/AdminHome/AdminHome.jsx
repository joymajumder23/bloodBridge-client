import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hooks/useAuth";
import Stats from "../../Stats/Stats";

const AdminHome = () => {
    const {user} = useAuth();
    return (
        <div>
            <Helmet>
                <title>Dashboard | Admin Home</title>
            </Helmet>
            <h1 className="text-3xl text-red-500 font-bold mt-6"><span className="text-black">Hi, Welcome </span>
                {
                    user?.displayName ? user?.displayName : "Back"
                } </h1>

                <div className="text-center mt-4">
                    <Stats></Stats>
                </div>

        </div>
    );
};

export default AdminHome;