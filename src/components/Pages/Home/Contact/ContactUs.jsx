import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

const ContactUs = () => {
    const position = [22.3568944, 91.7899716];
    return (
        <div className="max-w-screen-xl mx-auto mt-24">
            <h1 className="text-4xl text-center font-bold">Contact Us</h1>
            <div className="lg:flex items-center gap-4">
                <div className="lg:w-1/2 p-2 mt-6">
                    <form className="space-y-4" action="">
                        <input type="text" placeholder="Name" className="input input-bordered w-full rounded-none" /> <br />
                        <input type="text" placeholder="Email" className="input input-bordered w-full rounded-none" /> <br />
                        <input type="text" placeholder="Subject" className="input input-bordered w-full rounded-none" /> <br />
                        <textarea className="textarea textarea-bordered w-full rounded-none" placeholder="Message"></textarea>
                        <input className='btn bg-red-500 text-white rounded-none' type="submit" value="Send" />
                    </form>
                </div>
                <div className="lg:w-1/2 p-2">
                    <h1 className='text-xl font-semibold'>Our Location</h1>
                    <MapContainer style={{ height: '50vh', width: '100%' }}  center={position} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;