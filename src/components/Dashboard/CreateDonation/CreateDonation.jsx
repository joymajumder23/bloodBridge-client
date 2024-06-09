import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../Hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useUser from "../../Hooks/useUser";

const CreateDonation = () => {
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [value, onChange] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [users] = useUser();
    console.log(users);
    
//    if(users?.status === "blocked"){
//     return users;
//    }

    useEffect(() => {
        fetch('./../districts.json')
            .then(res => res.json())
            .then(data => setDistricts(data))
    }, []);
    console.log(districts);

    useEffect(() => {
        fetch('./../upazilas.json')
            .then(res => res.json())
            .then(data => setUpazilas(data))
    }, []);

    const {mutateAsync} = useMutation({
        mutationFn: async requestData => {
            const {data} = await axiosSecure.post('/request', requestData);
            return data;
        },
        onSuccess: () => {
            toast.success('Added Successfully');
        }
    })
    const {
        register,
        handleSubmit,
        formState: { errors }, reset
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
       try {
        const requestData = {
            requesterName: user?.displayName,
            requesterEmail: user?.email,
            recipientName: data.recipientName,
            address: data.address,
            blood: data.blood,
            district: data.district,
            upazila: data.upazila,
            donationDate: startDate.toUTCString(),
            donationTime: value,
            details: data.message,
            location: data.hospital,
            status: 'pending'
        };
        console.log(requestData);
        reset();
        await mutateAsync(requestData);
       }
       catch(error) {
        console.log(error.message);
       }
    }
    return (
        <div>
            <h1 className="text-3xl font-bold p-4 text-red-500">Create Donation Request</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body w-full border">
                <div className="flex gap-5">
                    <div className="w-1/2">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Requester Name</span>
                            </label>
                            <input type="text" defaultValue={user?.displayName} className="input input-bordered max-w-xs" />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Recipient Name</span>
                            </label>
                            <input type="text" placeholder="name" className="input input-bordered w-full max-w-xs" name="recipientName"  {...register("recipientName")} required />
                            {errors.name && <span>This field is required</span>}
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Recipient District</span>
                            </label>
                            <select className="select select-bordered w-full max-w-xs" {...register("district")}>
                                <option disabled selected>Select District</option>
                                {
                                    districts.map(district => <option key={district._id} value={district.name}>{district.name}</option>)
                                }
                            </select>
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

                        <div className="flex">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Donation Date</span>
                                </label>
                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Donation Time</span>
                                </label>
                                <TimePicker onChange={onChange} value={value} />
                            </div>
                        </div>
                    </div>

                    <div className="w-1/2">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Requester Email</span>
                            </label>
                            <input type="email" defaultValue={user?.email} className="input input-bordered max-w-xs" />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input type="text" placeholder="address" className="input input-bordered max-w-xs" name="address"  {...register("address")} required />
                            {errors.name && <span>This field is required</span>}
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

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Hospital Name</span>
                            </label>
                            <input type="text" placeholder="hospital name" className="input input-bordered max-w-xs" name="hospital"  {...register("hospital")} required />
                            {errors.name && <span>This field is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Request Message</span>
                            </label>
                            <textarea className="textarea textarea-bordered w-full" placeholder="message" name="message" {...register("message")} required ></textarea>
                        </div>
                    </div>
                </div>
                <div>
                    {
                        users?.status === "blocked" ? <input disabled className="btn rounded-none bg-red-600 text-white w-full" type="submit" value="Register" /> : <input className="btn rounded-none bg-red-600 text-white w-full" type="submit" value="Register" />
                    }
                    
                </div>
            </form>
        </div>
    );
};

export default CreateDonation;