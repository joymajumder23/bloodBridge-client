import { MdDelete } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import { Link } from "react-router-dom";

const ReqTable = ({ requestData, handleDelete }) => {
    
    console.log(requestData);

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Recipient Name</th>
                            <th>Recipient Location</th>
                            <th>Donation Date</th>
                            <th>Donation Time</th>
                            <th>Donation Status</th>
                            <th>Donor</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requestData?.map((data, index) => (
                            <tr key={data._id} className="hover">
                                <th>{index + 1}</th>
                                <td>{data.recipientName}</td>
                                <td>{data.location}</td>
                                <td>{data.donationDate}</td>
                                <td>{data.donationTime}</td>
                                <td className={`${data.status === 'inprogress' && 'text-blue-500' || data.status === 'pending' && 'text-yellow-500'}`}>{data.status}</td>
                                <td><p className="font-medium">{data.donorName}</p>
                                    <br /> 
                                    {data.donorEmail}</td>
                                <td>
                                    <Link to={`/dashboard/reqUpdate/${data._id}`}><button><TiEdit className="text-green-500 text-xl"></TiEdit></button></Link>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(data._id)}
                                        className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                                    >
                                        <span
                                            aria-hidden='true'
                                            className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
                                        ></span>
                                        <span className='relative'><MdDelete className="text-red-500 text-xl"></MdDelete></span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReqTable;