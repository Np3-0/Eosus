import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { useNavigate } from "react-router-dom";
import mapboxgl from 'mapbox-gl';
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase.ts";
import checkUserStatus from "../../utils/checkUserStatus.ts";
import getPostCoords from "../../utils/posts/getPostCoords.ts";
import Layout from "../Layout.tsx";
import Post from "../shared/Post.tsx";

// token for mapbox
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
    const [postCoords, setPostCoords] = useState<Array<{
        author: string;
        content: string;
        title: string;
        id: string;
        latitude: string;
        longitude: string;
        type: string;
        subType: string;
        timestamp: number;
        townName: string;
        image: string;
    }> | null>(null);

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
                setUserObj(docSnap.data() as {
                    name: string;
                    img: string;
                    email: string;
                    privacy: boolean;
                    location: string | null;
                });
            }
        };

        // gets data for map
        const fetchPostCoords = async () => {
            const coords = await getPostCoords();
            if (coords) {
                setPostCoords(
                    coords.map(({ color, latitude, longitude, ...rest }) => ({
                        ...rest,
                        color, 
                        latitude: latitude.toString(),
                        longitude: longitude.toString(),
                    }))
                );
            } else {
                setPostCoords(null);
            }
        };

        fetchUserData();
        fetchPostCoords();
    }, [user]);

    // all the map logic
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const mapContainer = document.getElementById('map');
        if (!mapContainer || !postCoords) return;

        // settings for mapbox
        const map = new mapboxgl.Map({
            container: 'map',
            center: [-74.5, 40],
            minZoom: 4,
            maxZoom: 16,
            projection: 'mercator',
            style: 'mapbox://styles/mapbox/light-v10',
            antialias: false,
        });

        map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

        // converts postCoords to GeoJSON for clustering
        const features: GeoJSON.Feature<GeoJSON.Point, { id: string; type: string; color: string }>[] = postCoords.map(post => ({
            type: "Feature",
            properties: {
                id: post.id,
                type: post.type,
                color: post.color,
            },
            geometry: {
                type: "Point",
                coordinates: [Number(post.longitude), Number(post.latitude)],
            },
        }));
        
        map.on('load', () => {
            map.addSource('posts', {
                type: 'geojson',
                data: {
                    type: "FeatureCollection",
                    features,
                },
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 75,
            });

            // Cluster circles
            map.addLayer({
                id: 'clusters',
                type: 'circle',
                source: 'posts',
                filter: ['has', 'point_count'],
                paint: {
                    'circle-color': '#902D41',
                    'circle-radius': [
                        'step',
                        ['get', 'point_count'],
                        20, 10,
                        30, 30,
                        40
                    ],
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#FFFFFF',
                },
            });

            // cluster labels
            map.addLayer({
                id: 'cluster-label',
                type: 'symbol',
                source: 'posts',
                filter: ['has', 'point_count'],
                layout: {
                    'text-field': ['get', 'point_count_abbreviated'],
                    'text-font': ['Raleway', 'Arial Unicode MS Bold'],
                    'text-size': 16,
                },
                paint: {
                    'text-color': '#FFFFFF',
                }
            });

            // Individual points
            map.addLayer({
                id: 'individual-point',
                type: 'circle',
                source: 'posts',
                filter: ['!', ['has', 'point_count']],
                paint: {
                    'circle-color': ['get', 'color'],
                    'circle-radius': 12,
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#FFFFFF',
                }
            });

            // zooms in when cluster is clicked
            map.on('click', 'clusters', (e) => {
                const features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
                if (!features[0].properties) return;
                const clusterId = features[0].properties.cluster_id;
                const source = map.getSource('posts') as mapboxgl.GeoJSONSource | undefined;
                if (source && typeof source.getClusterExpansionZoom === 'function') {
                    source.getClusterExpansionZoom(clusterId, (err, zoom) => {
                        if (err) return;
                        if (typeof zoom === 'number') {
                            map.easeTo({
                                center: ((features[0].geometry as GeoJSON.Point).coordinates as [number, number]),
                                zoom: zoom
                            });
                        }
                    });
                }
            });

            map.on('click', 'individual-point', (e) => {
                if (!e.features) return;
                const geometry = e.features[0].geometry as GeoJSON.Point;
                const coordinates = geometry.coordinates.slice();
                const popupDiv = document.createElement('div');

                const featureId = e.features[0].properties?.id;
                const post = postCoords.find(p => p.id === featureId);
                if (!post) return;
                createRoot(popupDiv).render(
                    <Post
                        title={post.title}
                        author={post.author}
                        content={post.content}
                        type={post.type}
                        subType={post.subType}
                        townName={post.townName}
                        image={post.image}
                        latitude={post.latitude}
                        longitude={post.longitude}
                        timestamp={new Date(post.timestamp)}
                        key={post.id}
                        menuEnabled={false}
                    ></Post>
                );

                new mapboxgl.Popup()
                    .setLngLat([coordinates[0], coordinates[1]])
                    .setDOMContent(popupDiv)
                    .addTo(map);
            });

            map.on('mouseenter', 'clusters', () => {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'clusters', () => {
                map.getCanvas().style.cursor = '';
            });

            map.on('mouseenter', 'individual-point', () => {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'individual-point', () => {
                map.getCanvas().style.cursor = '';
            });
        });

        return () => map.remove();
    }, [postCoords]);

    return (
        <Layout navType={1} img={userObj.img} email={userObj.email} name={userObj.name}>
            <div className="w-full h-screen pt-24">
                <div
                    id="map"
                    className="w-full h-full"
                />
            </div>
        </Layout>
    );
}