import { useForm } from "react-hook-form";
import registetImg from "../../../assets/images/BloodRegister.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { axiosPublic } from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const { createUser, updateUserProfile } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors }, reset
    } = useForm();

    useEffect(() => {
        fetch('./districts.json')
            .then(res => res.json())
            .then(data => setDistricts(data))
    }, [])

    useEffect(() => {
        fetch('./upazilas.json')
            .then(res => res.json())
            .then(data => setUpazilas(data))
    }, []);

    const onSubmit = async (data) => {
        // console.log(data);
        const imageFile = { image: data.image[0] };
        console.log(imageFile);
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(res.data);
        if (res.data.success) {
            createUser(data.email, data.password)
                .then(result => {
                    // console.log(result.user);
                    updateUserProfile(data.name, res.data.data.display_url)
                        .then(() => {
                            console.log(result.user);

                            const userInfo = {
                                name: data.name,
                                email: data.email,
                                avatar: res.data.data.display_url,
                                blood: data.blood,
                                district: data.district,
                                upazila: data.upazila,
                                status: 'active'
                            };
                            axiosPublic.post('/users', userInfo)
                                .then(res => {
                                    console.log(res.data);
                                    if (res.data.insertedId) {
                                        reset();
                                        toast.success('Registered Successfully')
                                    }
                                })
                        })
                        .catch(error => {
                            console.log(error.message);
                        })
                })
        }


    }
    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold mb-4">Sign Up now!</h1>
                        <img src={registetImg} alt="" />
                    </div>
                    <div className="card shrink-0 md:w-1/2 max-w-sm shadow-2xl bg-base-100 rounded-none">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
                                <select className="select select-bordered w-full max-w-xs" {...register("blood")}>
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

                            <div className="flex gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">District</span>
                                    </label>
                                    <select className="select select-bordered w-full max-w-xs" {...register("district")}>
                                        <option disabled selected>Select District</option>
                                        {
                                            districts.map(district => <option value={district.name}>{district.name}</option>)
                                        }
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Upazila</span>
                                    </label>
                                    <select className="select select-bordered w-full max-w-xs" {...register("upazila")}>
                                        <option disabled selected>Select Upazila</option>
                                        {
                                            upazilas.map(upazila => <option value={upazila.name}>{upazila.name}</option>)
                                        }
                                    </select>
                                </div>

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