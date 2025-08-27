import axios from "axios";

export async function getLocation() {
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

export async function getCoords(town: string) {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?city=${town}&format=json`);
        // edge cases
        if (response.data.length === 0) {
            return "N/A";
        } if (response.data.length > 6) {
            return "OVER";
        }
        if (response.data.length === 1) {
            const { lat, lon } = response.data[0] || {};
            return { latitude: lat, longitude: lon };
        }

        type NominatimResult = {
            lat: string;
            lon: string;
            display_name: string;
        };

        const modData = response.data.map((item: NominatimResult) => ({
            lat: item.lat,
            long: item.lon,
            name: item.display_name
        }));

        // give it back to the caller for processing.
        return modData;

    } catch (err) {
        console.error("Error fetching coordinates:", err);
        return { latitude: 0, longitude: 0 };
    }
}