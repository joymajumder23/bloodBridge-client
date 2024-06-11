import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
const Error = () => {
    return (
        <div className="text-center">
            <div className="bg-[url('./assets/images/thelasemia.jpg')] bg-center bg-cover h-full p-12">
                <h1 className="text-9xl font-bold text-white text-center">404</h1>
                <p className="text-3xl font-bold text-white text-center">Not Found</p>
            </div>
            <Link to="/"><button className="btn bg-red-500 text-white rounded-none mt-6"><FaArrowLeft></FaArrowLeft>Go to home</button></Link>
        </div>
    );
};

export default Error;