import { useEffect, useState } from "react";

const useDistricts = () => {
    const [districts, setDistricts] = useState([]);
    useEffect(() => {
        fetch('./districts.json')
        .then(res => res.json())
        .then(data => setDistricts(data))
    },[])
    return districts;
};

export default useDistricts;