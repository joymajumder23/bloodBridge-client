import axios from "axios";

export const axiosPublic = axios.create({
    baseURL: 'https://blood-donation-server-ecru.vercel.app'
})
const useAxiosPublic = () => {
    
    return axiosPublic;
};

export default useAxiosPublic;