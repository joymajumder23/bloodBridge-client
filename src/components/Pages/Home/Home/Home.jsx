import Banner from "../Banner/Banner";
import Blogs from "../Blogs/Blogs";
import ContactUs from "../Contact/ContactUs";
import Featured from "../Featured/Featured";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Featured></Featured>
            <Blogs></Blogs>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;