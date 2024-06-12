import { useEffect, useState } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';


const AllFunding = () => {
    const axiosPublic = useAxiosPublic();
    const [fundData, setFundData] = useState([]);
    useEffect(() => {
        axiosPublic.get('/fund')
            .then(res => setFundData(res.data))
    }, [axiosPublic]);
    console.log(fundData);

    return (
        <div className='max-w-screen-xl mx-auto mt-12'>
            <Helmet>
                <title>Home | Funding</title>
            </Helmet>
            <div className='flex justify-between p-2'>
            <h1 className='text-3xl font-bold'>All Funding</h1>
            <Link to="/funding"><button className='btn bg-red-500 text-white rounded-none'>Give Fund</button></Link>
            </div>

            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Email</th>
                                <th>Transaction Id</th>
                                <th>Date</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fundData?.map((data, index) => (
                                <tr key={data._id} className="hover">
                                    <th>{index + 1}</th>
                                    <td>{data.email}</td>
                                    <td>{data.transactionId}</td>
                                    <td>{data.date}</td>
                                    <td>{data.fund} $</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllFunding;