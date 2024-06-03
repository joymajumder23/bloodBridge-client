import { useForm } from "react-hook-form";
import registetImg from "../../../assets/images/BloodRegister.svg";
import { Link } from "react-router-dom";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }, reset
    } = useForm();
    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold mb-4">Sign Up now!</h1>
                        <img src={registetImg} alt="" />
                    </div>
                    <div className="card shrink-0 md:w-1/2 max-w-sm shadow-2xl bg-base-100 rounded-none">
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="name" className="input input-bordered" name="name"  {...register("name")} required />
                                {errors.name && <span>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" name="email" {...register("email")} required />
                                {errors.email && <span>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Avatar</span>
                                </label>
                                <input type="file" placeholder="" className="file-input file-input-bordered w-full max-w-xs" {...register("image")} required />
                                {errors.image && <span>This field is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Blood Group</span>
                                </label>
                                <select className="select select-bordered w-full max-w-xs">
                                    <option disabled selected>Select Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>



                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" name="password" {...register("password", { minLength: 6, maxLength: 20, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/ })} required />
                                {errors.password?.type === 'minLength' && <span>Password must be 6 characters</span>}
                                {errors.password?.type === 'pattern' && <span>One Uppercase and One Lowercase and One Special Character</span>}
                            </div>
                            <div>
                                <input className="btn rounded-none bg-red-600 text-white w-full" type="submit" value="Register" />
                            </div>
                        </form>
                        <p className='p-6 text-center'>Already have an account? <Link className='font-semibold' to="/login">Go to login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;