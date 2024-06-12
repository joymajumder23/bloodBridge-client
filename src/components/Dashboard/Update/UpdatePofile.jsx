import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdatePofile = () => {
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        formState: { errors }, reset
    } = useForm();

    useEffect(() => {
        fetch('./../districts.json')
            .then(res => res.json())
            .then(data => setDistricts(data))
    }, [])

    useEffect(() => {
        fetch('./../upazilas.json')
            .then(res => res.json())
            .then(data => setUpazilas(data))
    }, []);

    const {mutateAsync} = useMutation({
        mutationFn: async updateData => {
            const {data} = await axiosPublic.put(`/users/${user?.email}`, updateData);
            return data;
        },
        onSuccess: () => {
            toast.success('Updated Successfully');
        }
    })

    const onSubmit = async (data) => {
        console.log(data);
       try {
        const imageFile = { image: data.image[0] };
        console.log(imageFile);
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        const updateData = {
            name: data.name,
            avatar: res.data.data.display_url,
            blood: data.blood,
            district: data.district,
            upazila: data.upazila
        };
        console.log(updateData);
        reset();
        await mutateAsync(updateData);
       }
       catch(error) {
        console.log(error.message);
       }
    }
    return (
        <div>
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
                <div>
                    <input className="btn rounded-none bg-red-600 text-white w-full" type="submit" value="Update" />
                </div>
            </form>
        </div>
    );
};

export default UpdatePofile;