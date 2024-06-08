import { useForm } from "react-hook-form";
import JoditEditor from 'jodit-react';
import { useRef, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBlog = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    var htmlString = content;
    var plainContent = htmlString.replace(/<[^>]+>/g, '');
    console.log(plainContent);
    const {
        register,
        handleSubmit,
        formState: { errors }, reset
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        
        const imageFile = { image: data.image[0] };
        console.log(imageFile);
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(res.data);
        if (res.data.success){
            try {
                const newBlog = {
                    title: data?.title,
                    image: res.data.data.display_url,
                    details: plainContent,
                    status: "draft"
                };
                console.log(newBlog);
                axiosSecure.post('/blogs', newBlog)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        reset();
                        toast.success('Added Successfully')
                    }
                })
                
                // await mutateAsync(requestData);
            }
            catch (error) {
                console.log(error.message);
            }
            
        }
        reset();
       
    }
    return (
        <div>
            <h1>Add Blog</h1>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body w-full border">
                    <div className="flex">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input name="title" type="text" className="input input-bordered max-w-xs" {...register("title")} />
                            {errors.title && <span>This field is required</span>}
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Thumbnail</span>
                            </label>
                            <input type="file" placeholder="" className="file-input file-input-bordered w-full max-w-xs" {...register("image")} required />
                            {errors.image && <span>This field is required</span>}
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Request Message</span>
                        </label>
                        {/* <textarea className="textarea textarea-bordered w-full" placeholder="message" name="message" {...register("message")} required ></textarea> */}
                        <JoditEditor ref={editor}
                            value={content} 
                            onChange={newContent => setContent(newContent)}/>
                    </div>
                    <input className="btn bg-red-500 text-white rounded-none" type="submit" value="Add Blog" />
                </form>
            </div>
        </div>
    );
};

export default AddBlog;