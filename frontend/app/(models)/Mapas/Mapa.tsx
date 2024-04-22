import {View, Text} from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import MapView, {LatLng, MapPressEvent, Marker, PROVIDER_GOOGLE} from 'react-native-maps'

import {defaultStyles} from '@/constants/Style'
import {LocationData, useLocationContext} from "@/contexts/LocationContext";

// Niterói Coordinates
const defaultCoordinates = {
    latitude: -22.885528,
    longitude: -43.104283,
};

const Mapa:React.FC<MapaType> = (props: MapaType) => {

    const {userLocation} = useLocationContext();

    console.log(userLocation)

    return (
        <View>
            <MapView style={defaultStyles.map}
                     provider={PROVIDER_GOOGLE}
                     onPress={props.onLocationChange}
                     initialRegion={{
                         latitude: props.startLocation === null ?
                             (userLocation === null ? defaultCoordinates.latitude : userLocation.latitude)
                             : props.startLocation!.latitude,

                         longitude: props.startLocation === null ?
                             (userLocation === null ? defaultCoordinates.longitude : userLocation.longitude)
                             : props.startLocation!.longitude,

                         latitudeDelta: 0.0922,
                         longitudeDelta: 0.0421,
                     }}>

                {props.markerLocation !== null && (
                    <Marker
                        coordinate={props.markerLocation}
                    />
                )}
            </MapView>
        </View>
    )
}

export default Mapa;

export type MapaType = {
    startLocation: LatLng | null,
    markerLocation: LatLng | null,
    onLocationChange: (event: MapPressEvent) => void,
}