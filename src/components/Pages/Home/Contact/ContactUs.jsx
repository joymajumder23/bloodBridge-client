import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

const ContactUs = () => {
    return (
        <div className="max-w-screen-xl mx-auto mt-24">
            <h1 className="text-4xl text-center">Contact Us</h1>
            <div className="lg:flex gap-4">
                <div className="lg:w-1/2 p-2">
                    <form className="space-y-4" action="">
                        <input type="text" placeholder="Name" className="input input-bordered w-full rounded-none" /> <br />
                        <input type="text" placeholder="Email" className="input input-bordered w-full rounded-none" /> <br />
                        <input type="text" placeholder="Subject" className="input input-bordered w-full rounded-none" /> <br />
                        <textarea className="textarea textarea-bordered w-full rounded-none" placeholder="Message"></textarea>
                    </form>
                </div>
                <div className="lg:w-1/2 p-2">
                    <h1>Our Location</h1>
                    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[51.505, -0.09]}>
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