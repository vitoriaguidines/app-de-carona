import { StyleSheet } from 'react-native';
import React, {useEffect, useRef, useState} from "react";
import {LatLng, MapPressEvent} from "react-native-maps";
import {LocationData, useLocationContext} from "@/contexts/LocationContext";
import Mapa from "@/app/(models)/Mapas/Mapa";
import {View} from "react-native";
import {GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
// @ts-ignore
import {GOOGLE_MAPS_API_KEY} from '@env';
import { decode } from "@googlemaps/polyline-codec";
import * as MapsServices from "../../services/MapsServices"

console.log(GOOGLE_MAPS_API_KEY)
const MapaOrigem = () => {
    const {originLocation, destinationLocation, setOriginLocation, setDestinationLocation} = useLocationContext();
    const [routeCoordinates, setRouteCoordinates] = useState([]);

    const originAutoCompleteRef = useRef<any>(null);
    const destinationAutoCompleteRef = useRef<any>(null);

    const changeLocation = (pressEvent: MapPressEvent) => {
        const locationData: LocationData = {
            coordinates: pressEvent.nativeEvent.coordinate,
            address: null
        }
        setOriginLocation(locationData);
    }

    const handleOriginSelection = (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
        const latLng = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
        };
        const newLocation: LocationData = {
            coordinates: latLng,
            address: data.description
        }
        setOriginLocation(newLocation);
    };

    const handleDestinationSelection = (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
        const latLng = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
        };
        const newLocation: LocationData = {
            coordinates: latLng,
            address: data.description
        }
        setDestinationLocation(newLocation);
    };

    const getDirections = () => {
        MapsServices.getRoute(originLocation, destinationLocation).then((data) => {
            const route = data.routes[0];
            if (route) {
                const points = route.overview_polyline.points;

                const decodedPoints = decode(points, 5);

                const coordinates: LatLng[] = decodedPoints.map((point: any) => ({
                    latitude: point[0],
                    longitude: point[1]
                }));

                // @ts-ignore
                setRouteCoordinates(coordinates);
            }
        }).catch((error) => console.error('Error fetching directions:', error));
    };

    useEffect(() => {
        if (originLocation.coordinates === null || destinationLocation.coordinates === null) return
        getDirections();
    }, [originLocation, destinationLocation]);

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.searchContainer}>
                {/* Campo de Origem */}
                <GooglePlacesAutocomplete
                    ref={originAutoCompleteRef}
                    placeholder='Digite o endereço de origem'
                    fetchDetails={true}
                    onPress={handleOriginSelection}
                    query={{
                        key: GOOGLE_MAPS_API_KEY,
                        language: 'pt-BR',
                    }}
                    styles={{
                        textInputContainer: styles.textInputContainer,
                        textInput: styles.textInput,
                        predefinedPlacesDescription: styles.predefinedPlacesDescription,
                    }}
                />
                {/* Campo de Destino */}
                <GooglePlacesAutocomplete
                    ref={destinationAutoCompleteRef}
                    placeholder='Digite o endereço de destino'
                    fetchDetails={true}
                    onPress={handleDestinationSelection}
                    query={{
                        key: GOOGLE_MAPS_API_KEY,
                        language: 'pt-BR',
                    }}
                    styles={{
                        textInputContainer: [styles.textInputContainer, { marginTop: 10 }],
                        textInput: styles.textInput,
                        predefinedPlacesDescription: styles.predefinedPlacesDescription,
                    }}
                />
            </View>

            <Mapa startLocation={originLocation.coordinates}
                  markerLocation={originLocation.coordinates}
                  routeCoordinates={routeCoordinates}
                  onLocationChange={changeLocation}
            />
        </View>
    )
}
export default MapaOrigem

const styles = StyleSheet.create({
    searchContainer: {
        position: 'absolute',
        top: 20,
        left: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 15,
        borderRadius: 10,
        zIndex: 3, // Ensure search container appears above map
    },
    textInputContainer: {
        backgroundColor: 'rgba(255,255,255,0)',
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    textInput: {
        marginLeft: 0,
        marginRight: 0,
        height: 60,
        fontSize: 20,
    },
    predefinedPlacesDescription: {
        color: '#1faadb',
    },
    destinationInputContainer: {
        marginTop: 10,
    },
});