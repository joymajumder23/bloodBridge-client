import img from '../../../../assets/images/blood.jpg'

const Featured = () => {
    return (
        <div className='mx-auto max-w-screen-xl mt-24'>
            <div className='flex gap-4 justify-center'>
                <div className='text-start bg-slate-100 p-4 space-y-2'>
                    <h1 className="text-4xl"><span className='border-b-4 border-red-600'>Who</span> We Are?</h1>
                    <p>Blood Buddies is for public donation center with blood donation <br /> members in the changing health care system.
                        <ul className='space-y-4'>
                            <li>Specialist blood donors and clinical supervision.</li>
                            <li>Increasing communication with our members.</li>
                            <li>High quality assessment, diagnosis and treatment.</li>
                            <li>Examine critically to ensure alignment.</li>
                            <li>The extra care of a multi-disciplinary team.</li>
                        </ul>
                    </p>
                </div>
                  <img className='w-1/2' src={img} alt="" />
            </div>
        </div>
    );
};

export default Featured;