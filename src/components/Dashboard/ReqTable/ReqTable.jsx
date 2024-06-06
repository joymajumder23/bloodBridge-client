const ReqTable = ({ reqData }) => {
    console.log(reqData);
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Recipient Name</th>
                            <th>Recipient Location</th>
                            <th>Donation Date</th>
                            <th>Donation Time</th>
                            <th>Donation Status</th>
                            <th>Donor</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                          reqData.map(data => <tr className="hover">
                                <th></th>
                                <td>Cy Ganderton</td>
                                <td>Quality Control Specialist</td>
                                <td>Blue</td>
                            </tr>  )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReqTable;