import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useUpazila from '../../../Hooks/useUpazila';
import useDistricts from '../../../Hooks/useDistricts';
import Card from '../../../Shared/Card/Card';

const Search = () => {
    const axiosPublic = useAxiosPublic();
    const [blood, setBlood] = useState('');
    // const [district, setDistrict] = useState([]);
    // const [upazila, setUpazila] = useState([]);
    const [donors, setDonors] = useState([]);
    const upazila = useUpazila();
    const district = useDistricts();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axiosPublic.get('/requests', {
          params: { blood }
        });
        setDonors(response.data);
      } catch (error) {
        console.error('Error fetching donors', error);
      }
    };
  console.log(donors)
//   useEffect(() => {
//     fetch('./../upazilas.json')
//         .then(res => res.json())
//         .then(data => setUpazila(data))
// }, []);
    console.log(upazila);

    // useEffect(() => {
    //   fetch('./../districts.json')
    //   .then(res => res.json())
    //   .then(data => setDistrict(data))
    // }, []);
    console.log(district);
    return (
        <div className='max-w-screen-xl mx-auto mt-6 space-y-3'>
          <h1 className='text-4xl font-bold'>Search by Blood Group</h1>
        <form onSubmit={handleSubmit}>
           <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-xl font-semibold">Blood Group</span>
                            </label>
                            <select onChange={(e) => setBlood(e.target.value)} className="select select-bordered w-full max-w-xs rounded-none">
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
                        
          {/* <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Recipient Upazila</span>
                            </label>
                            <select onChange={(e) => setUpazila(e.target.value)} className="select select-bordered w-full max-w-xs">
                                <option disabled selected>Select Upazila</option>
                                {
                                    upazila.map(upazilas => <option key={upazilas._id} value={upazilas.name}>{upazilas.name}</option>)
                                }
                            </select>
                        </div> */}

                        {/* <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Recipient District</span>
                            </label>
                            <select onChange={(e) => setDistrict(e.target.value)} className="select select-bordered w-full max-w-xs" >
                                <option disabled selected>Select District</option>
                                {
                                    district.map(districts => <option key={districts._id} value={districts.name}>{districts.name}</option>)
                                }
                            </select>
                        </div> */}
          <button className='btn bg-red-500 text-white rounded-none mt-2' type="submit">Search</button>
        </form>
        <div className='mt-6'>
          {donors.length > 0 && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
              {
                donors.map(donor => <Card key={donor._id} req={donor}></Card>)
              }
            </div>
          )}
        </div>
      </div>
    );
};

export default Search;