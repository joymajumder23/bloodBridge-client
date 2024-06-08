import useAuth from "../../../Hooks/useAuth";

const AdminHome = () => {
    const {user} = useAuth();
    return (
        <div>
            <h1 className="text-3xl text-red-500 font-bold mt-6"><span className="text-black">Hi, Welcome </span>
                {
                    user?.displayName ? user?.displayName : "Back"
                } </h1>

        </div>
    );
};

export default AdminHome;