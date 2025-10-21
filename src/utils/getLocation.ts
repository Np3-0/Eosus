import axios from "axios";

export async function getLocation() {
    // Check if geolocation is supported
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

    // sends coords to api to get location name
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${(await data).latitude}&lon=${(await data).longitude}&format=json`);
        return response.data.address.city || response.data.address.town || response.data.address.village || "Unknown Location";
    } catch (err) {
        console.error("Error fetching location data:", err);
        return "Unknown Location";
    }
    
}

// gets coords from town name
export async function getCoords(town: string) {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?city=${town}&format=json`);
        // edge cases
        if (response.data.length === 0) {
            return "N/A";
        } if (response.data.length > 10) {
            return "OVER";
        }
       
        const { lat, lon, name } = response.data[0] || {};
        return { latitude: lat, longitude: lon, name: name };
        

    } catch (err) {
        console.error("Error fetching coordinates:", err);
        return { latitude: 0, longitude: 0 };
    }
}