import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CreateDonation = () => {
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
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


    const {
        register,
        handleSubmit,
        formState: { errors }, reset
    } = useForm();

    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body w-full border">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Recipient Name</span>
                    </label>
                    <input type="text" placeholder="name" className="input input-bordered w-full" name="name"  {...register("name")} required />
                    {errors.name && <span>This field is required</span>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="email" className="input input-bordered" name="email" {...register("email")} required />
                    {errors.email && <span>This field is required</span>}
                </div>

                <div className="form-control w-full">
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
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Recipient District</span>
                        </label>
                        <select className="select select-bordered w-full max-w-xs" {...register("district")}>
                            <option disabled selected>Select District</option>
                            {
                                districts.map(district => <option key={district._id}  value={district.name}>{district.name}</option>)
                            }
                        </select>
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Recipient Upazila</span>
                        </label>
                        <select className="select select-bordered w-full max-w-xs" {...register("upazila")}>
                            <option disabled selected>Select Upazila</option>
                            {
                                upazilas.map(upazila => <option key={upazila._id} value={upazila.name}>{upazila.name}</option>)
                            }
                        </select>
                    </div>

                </div>

                <div>
                    <input className="btn rounded-none bg-red-600 text-white w-full" type="submit" value="Register" />
                </div>
            </form>
        </div>
    );
};

export default CreateDonation;