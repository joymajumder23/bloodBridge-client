import { Link, useLocation, useNavigate } from "react-router-dom";
import loginUI from "../../../assets/images/bloodLogin.svg";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
    const {signIn} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        
        signIn(email, password)
        .then(result => {
            console.log(result.user);
            toast.success('Login Successfully')
              navigate(from, { replace: true });
        })
        .catch(error => {
            console.log(error.message);
        })
    }
    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center md:w-full lg:text-left">
                        <h1 className="text-5xl font-bold mb-4">Login now!</h1>
                        <img className="w-full" src={loginUI} alt="" />
                    </div>
                    <div className="card shrink-0 md:w-1/2 max-w-sm shadow-2xl bg-base-100 rounded-none">
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered rounded-none" name="email" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered rounded-none" name="password" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn bg-red-600 text-white rounded-none" type="submit" value="Login" />
                            </div>
                        </form>
                        <p className='p-6 text-center'>New Here? <Link className='font-semibold' to="/register">Create a New Account</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;