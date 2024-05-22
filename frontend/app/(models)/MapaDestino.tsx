<<<<<<< HEAD
import { MapaOrigem } from './MapaOrigem.1';

export default MapaOrigem;
=======
import React, {useRef, useState} from "react";
import MapView, {LatLng, MapPressEvent} from "react-native-maps";
import {LocationData, useLocationContext} from "@/contexts/LocationContext";
import {useRoute} from "@react-navigation/core";
import Mapa from "@/app/(models)/Mapas/Mapa";
import {View} from "react-native";

const MapaDestino = () => {
    const {destinationLocation, setDestinationLocation} = useLocationContext();

    const changeLocation = (pressEvent: MapPressEvent) => {
        const locationData: LocationData = {
            coordinates: pressEvent.nativeEvent.coordinate,
            address: null
        }
        setDestinationLocation(locationData);
    }

    return(
        <View>
            <Mapa startLocation={destinationLocation.coordinates}
                  markerLocation={destinationLocation.coordinates}
                  onLocationChange={changeLocation}
            />
        </View>
    )
}
export default MapaDestino
>>>>>>> ac87cb8887976577e7e6f01538a43a2c36b2d6d9
