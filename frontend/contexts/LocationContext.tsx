import React, {createContext, ReactNode, useContext, useState} from "react";
import {LocationObjectCoords} from "expo-location";
import {LatLng} from "react-native-maps";


const LocationContext = createContext<LocationContextData | null>(null);

interface LocationContextData {
    //Data
    userLocation: LocationObjectCoords | null,
    originLocation: LocationData | null,
    destinationLocation: LocationData | null,
    //Functions
    setUserLocation: (location: LocationObjectCoords) => void,
    setOriginLocation: (originLocation: LocationData | null) => void,
    setDestinationLocation: (destinationLocation: LocationData | null) => void
}

interface  LocationContextProviderProps{
    children: ReactNode;
}

export function useLocationContext(){
    const context = useContext(LocationContext);
    if (context === null) {
        throw new Error('useLocationContext must be used within a LocationContextProvider');
    }
    return context;
}

export const LocationContextProvider = ({ children }: LocationContextProviderProps) => {
    const [contextValues, setContextValues] = useState<LocationContextData>({
        userLocation: null,
        originLocation: null,
        destinationLocation: null,
        setUserLocation: (location: LocationObjectCoords) => {
            setContextValues((prevContext) => ({
                ...prevContext,
                userLocation: location,
            }))
        },
        setOriginLocation: (originLocation: LocationData | null) => {
            setContextValues({
                ...contextValues,
                originLocation: originLocation,
            })
        },
        setDestinationLocation: (destinationLocation: LocationData | null) => {
            setContextValues({
                ...contextValues,
                destinationLocation: destinationLocation,
            })
        }
    });

    return(
        <LocationContext.Provider value={contextValues}>
            {children}
        </LocationContext.Provider>
    )

}

export interface LocationData {
    coordinates: LatLng | null,
    address: string | null,
}