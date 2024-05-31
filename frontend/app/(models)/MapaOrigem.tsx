import { StyleSheet, View, Button } from 'react-native';
import React, { useEffect, useRef, useState } from "react";
import { LatLng, MapPressEvent } from "react-native-maps";
import { LocationData, useLocationContext } from "@/contexts/LocationContext";
import Mapa from "@/app/(models)/Mapas/Mapa";
import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { decode } from "@googlemaps/polyline-codec";
import * as MapsServices from "../../services/MapsServices";
import { GOOGLE_MAPS_API_KEY } from '@env';

const MapaOrigem = () => {
    const { originLocation, destinationLocation, setOriginLocation, setDestinationLocation } = useLocationContext();
    const [routeCoordinates, setRouteCoordinates] = useState<LatLng[]>([]);

    const originAutoCompleteRef = useRef<any>(null);
    const destinationAutoCompleteRef = useRef<any>(null);


    const changeLocation = async(pressEvent: MapPressEvent) => {
        const coordinates = pressEvent.nativeEvent.coordinate
        const { latitude, longitude } = coordinates;
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCX2fMAC8vF73oKU9Vg3NVXizsqOaHUn1c`);
        const data = await response.json();
        const address = data.results[0].formatted_address;

        originAutoCompleteRef.current?.setAddressText(address);

        const locationData: LocationData = {
            coordinates: coordinates,
            address: address,
        };
        setOriginLocation(locationData);
    };

    const handleOriginSelection = (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
        if (details) {
            const latLng = {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
            };
            const newLocation: LocationData = {
                coordinates: latLng,
                address: data.description
            };
            setOriginLocation(newLocation);
        }
    };

    const handleDestinationSelection = (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
        if (details) {
            const latLng = {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
            };
            const newLocation: LocationData = {
                coordinates: latLng,
                address: data.description
            };
            setDestinationLocation(newLocation);
        }
    };

    const getDirections = async () => {
        try {
            const data = await MapsServices.getRoute(originLocation, destinationLocation);
            const route = data.routes[0];
            if (route) {
                const points = route.overview_polyline.points;
                const decodedPoints = decode(points, 5);

                const coordinates: LatLng[] = decodedPoints.map((point: any) => ({
                    latitude: point[0],
                    longitude: point[1]
                }));

                setRouteCoordinates(coordinates);
            }
        } catch (error) {
            console.error('Error fetching directions:', error);
        }
    };

    useEffect(() => {
        if (originLocation.coordinates === null || destinationLocation.coordinates === null) return
        getDirections();
        console.log(originLocation)
        console.log(destinationLocation)
    }, [originLocation, destinationLocation]);

    const confirmRoute = () => {
        // Lógica para confirmar a rota
        console.log('Rota confirmada:', routeCoordinates);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.searchContainer}>
                <GooglePlacesAutocomplete
                    ref={originAutoCompleteRef}
                    placeholder='Digite o endereço de origem'
                    fetchDetails={true}
                    onPress={handleOriginSelection}
                    query={{
                        key: 'AIzaSyCX2fMAC8vF73oKU9Vg3NVXizsqOaHUn1c',
                        language: 'pt-BR',
                    }}
                    styles={autocompleteStyles}
                />
                <GooglePlacesAutocomplete
                    ref={destinationAutoCompleteRef}
                    placeholder='Digite o endereço de destino'
                    fetchDetails={true}
                    onPress={handleDestinationSelection}
                    query={{
                        key: 'AIzaSyCX2fMAC8vF73oKU9Vg3NVXizsqOaHUn1c',
                        language: 'pt-BR',
                    }}
                    styles={{
                        ...autocompleteStyles,
                        textInputContainer: [autocompleteStyles.textInputContainer, { marginTop: 10 }],
                    }}
                />
            </View>

            <Mapa startLocation={originLocation.coordinates}
                  markerLocationOrigin={originLocation.coordinates}
                  markerLocationDestination={destinationLocation.coordinates}
                  routeCoordinates={routeCoordinates}
                  onLocationChange={changeLocation}
            />

            <View style={styles.buttonContainer}>
                <Button title="Confirmar Rota" onPress={confirmRoute} />
            </View>
        </View>
    );
};

export default MapaOrigem;

const styles = StyleSheet.create({
    searchContainer: {
        position: 'absolute',
        top: 20,
        left: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 15,
        borderRadius: 10,
        zIndex: 3,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 10,
        right: 10,
        zIndex: 3,
    },
});

const autocompleteStyles = {
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
};
