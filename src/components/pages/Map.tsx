import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import Layout from "../Layout";
import Container from "../shared/Container";
import { useNavigate } from "react-router-dom";
import checkUserStatus from "../../utils/checkUserStatus";
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN;

export default function Map() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [userObj, setUserObj] = useState<{
        name: string;
        img: string;
        email: string;
        privacy: boolean;
        location: string | null;
    }>({
        name: "",
        img: "",
        email: "",
        privacy: false,
        location: null,
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            if (firebaseUser) {
                checkUserStatus(navigate);
            } else {
                navigate("/signup");
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    useEffect(() => {
        if (!user) return;
        const fetchUserData = async () => {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserObj(
                    docSnap.data() as {
                        name: string;
                        img: string;
                        email: string;
                        privacy: boolean;
                        location: string | null;
                    });
            }
        };
        fetchUserData();
    }, [user]);

    useEffect(() => {
        const mapContainer = document.getElementById('map');
        if (!mapContainer) return;

        const map = new mapboxgl.Map({
            container: 'map',
            center: [-74.5, 40],
            zoom: 9,
            projection: 'mercator', 
            style: 'mapbox://styles/mapbox/streets-v11',
        });

        return () => map.remove();
    }, []);

    return (
        <Layout navType={1} img={userObj.img} email={userObj.email} name={userObj.name}>
            <Container className="min-h-screen flex flex-col mt-24 items-center">
                <div id="map" style={{ width: "100vw", height: "100vh" }}>

                </div>
            </Container>
        </Layout>
    );
}