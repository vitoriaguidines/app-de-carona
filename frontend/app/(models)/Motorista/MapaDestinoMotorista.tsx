import { StyleSheet, View, Button } from 'react-native';
import React, { useEffect, useRef, useState } from "react";
import { LatLng, MapPressEvent } from "react-native-maps";
import { LocationData, useLocationContext } from "@/contexts/LocationContext";
import Mapa from "@/app/(models)/Mapas/Mapa";
import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { decode } from "@googlemaps/polyline-codec";
import * as MapsServices from "@/services/MapsServices";
import { GOOGLE_MAPS_API_KEY } from '@env';
import { useNavigation } from 'expo-router';

const MapaDestinoMotorista = () => {
    const { originLocationMotorista, destinationLocationMotorista, setDestinationLocationMotorista } = useLocationContext();
    const [routeCoordinates, setRouteCoordinates] = useState<LatLng[]>([]);

    const destinationAutoCompleteRef = useRef<any>(null);

    const navigation = useNavigation();


    const changeLocation = async(pressEvent: MapPressEvent) => {
        const coordinates = pressEvent.nativeEvent.coordinate
        const { latitude, longitude } = coordinates;
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${"AIzaSyB6fpwUEraeiYIzqi-tL34YkmUxN0fpzrI"}`);
        const data = await response.json();
        const address = data.results[0].formatted_address;

        destinationAutoCompleteRef.current?.setAddressText(address);

        const locationData: LocationData = {
            coordinates: coordinates,
            address: address,
        };
        setDestinationLocationMotorista(locationData);
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
            setDestinationLocationMotorista(newLocation);
        }
    };

    const getDirections = async () => {
        try {
            const data = await MapsServices.getRoute(originLocationMotorista, destinationLocationMotorista);
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
        if (originLocationMotorista.coordinates === null || destinationLocationMotorista.coordinates === null) return
        getDirections();
        console.log(originLocationMotorista)
        console.log(destinationLocationMotorista)
    }, [originLocationMotorista, destinationLocationMotorista]);

    const confirmRoute = () => {
        // Lógica para confirmar a rota
        console.log('Rota confirmada:', routeCoordinates);
        navigation.navigate('Motorista', {addressOrigin: originLocationMotorista.address, addressDestiny: destinationLocationMotorista.address, routeCoordinates: routeCoordinates
        });
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.searchContainer}>
                <GooglePlacesAutocomplete
                    ref={destinationAutoCompleteRef}
                    placeholder='Digite o endereço de destino'
                    fetchDetails={true}
                    onPress={handleDestinationSelection}
                    query={{
                        key: "AIzaSyB6fpwUEraeiYIzqi-tL34YkmUxN0fpzrI",
                        language: 'pt-BR',
                    }}
                    styles={{
                        ...autocompleteStyles,
                        textInputContainer: [autocompleteStyles.textInputContainer, { marginTop: 10 }],
                    }}
                />
            </View>

            <Mapa startLocation={originLocationMotorista.coordinates}
                  markerLocationOrigin={originLocationMotorista.coordinates}
                  markerLocationDestination={destinationLocationMotorista.coordinates}
                  routeCoordinates={routeCoordinates}
                  onLocationChange={changeLocation}
            />

            <View style={styles.buttonContainer}>
                <Button title="Confirmar Rota" onPress={confirmRoute} />
            </View>
        </View>
    );
};

export default MapaDestinoMotorista;

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
