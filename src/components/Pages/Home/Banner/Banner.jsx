import { Link } from "react-router-dom";
import Slider from "../../../Shared/Slider/Slider";

const Banner = () => {
    return (
        <div>
            <div className="relative">
                <Slider></Slider>
            </div>

            <div className="absolute -mt-[130px] lg:-mt-[500px] ml-16 lg:ml-24 z-10">
                <h1 className="text-white text-xs md:text-2xl">Donate Blood, Save Life!</h1>
                <h1 className="text-white text-xs md:text-6xl uppercase">Donate Blood <br /> and inspires others.</h1>
                <div className="flex gap-5">
                    <Link to="/register"><button className="btn w-32 rounded-none bg-red-600 text-white">Join as a donor</button></Link>
                    <Link to="/search"><button className="btn rounded-none bg-red-600 text-white">Search Donors</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;