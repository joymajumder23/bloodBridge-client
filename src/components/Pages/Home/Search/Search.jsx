import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useUpazila from '../../../Hooks/useUpazila';
import useDistricts from '../../../Hooks/useDistricts';

const Search = () => {
    const axiosPublic = useAxiosPublic();
    const [blood, setBlood] = useState('');
    const [district, setDistrict] = useState([]);
    const [upazila, setUpazila] = useState([]);
    const [donors, setDonors] = useState([]);
    // const upazilas = useUpazila();
    // const districts = useDistricts();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axiosPublic.get('/requests', {
          params: { blood, district, upazila }
        });
        setDonors(response.data);
      } catch (error) {
        console.error('Error fetching donors', error);
      }
    };
  console.log(donors)
  useEffect(() => {
    fetch('./../upazilas.json')
        .then(res => res.json())
        .then(data => setUpazila(data))
}, []);
    console.log(upazila);

    useEffect(() => {
      fetch('./../districts.json')
      .then(res => res.json())
      .then(data => setDistrict(data))
    }, []);
    console.log(district);
    return (
        <div>
        <form onSubmit={handleSubmit}>
          <label>
            Blood Group:
            <select value={blood} onChange={(e) => setBlood(e.target.value)}>
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </label>
          <label>
            District:
            <select value={district} onChange={(e) => setDistrict(e.target.value)}>
              <option value="">Select District</option>
              {
                district?.map(data => <option value={data.name}>{data.name}</option>)
              }
            </select>
          </label>
          <label>
            Upazila:
            <select value={upazila} onChange={(e) => setUpazila(e.target.value)}>
              <option value="">Select Upazila</option>
              {
                upazila?.map(data => <option value={data.name}>{data.name}</option>)
              }
            </select>
          </label>
          <button type="submit">Search</button>
        </form>
        <div>
          {donors.length > 0 && (
            <ul>
              {donors.map((donor) => (
                <li key={donor._id}>{donor.name} - {donor.bloodGroup} - {donor.district} - {donor.upazila}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
};

export default Search;