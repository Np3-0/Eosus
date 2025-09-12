export default function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
    function toRad(x: number) {
        return x * Math.PI / 180;
    }

    const R = 6371;

    const rlat1 = toRad(lat1);
    const rlon1 = toRad(lon1);
    const rlat2 = toRad(lat2);
    const rlon2 = toRad(lon2);

    const dLat = rlat2 - rlat1;
    const dLon = rlon2 - rlon1;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rlat1) * Math.cos(rlat2) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};
