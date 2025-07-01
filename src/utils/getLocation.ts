import axios from "axios";

export default async function getLocation() {
    if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported by this browser.");
    }

    //saving data because i gotta put it through a reverse geolocation API later
    const data = new Promise<GeolocationCoordinates>((res, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => res(position.coords),
            (error) => reject(error)
        );
    });

    // geocoding API call
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${(await data).latitude}&lon=${(await data).longitude}&format=json`);
        return response.data.address.city || response.data.address.town || response.data.address.village || "Unknown Location";
    } catch (err) {
        console.error("Error fetching location data:", err);
        return "Unknown Location";
    }
    
}