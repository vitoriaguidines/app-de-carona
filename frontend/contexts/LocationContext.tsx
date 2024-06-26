import React, { createContext, ReactNode, useContext, useState } from "react";
import { LocationObjectCoords } from "expo-location";
import { LatLng } from "react-native-maps";

const LocationContext = createContext<LocationContextData | null>(null);

interface LocationContextData {
    // Data
    userLocation: LocationObjectCoords | null,
    originLocation: LocationData,
    destinationLocation: LocationData,
    originLocationMotorista: LocationData,
    destinationLocationMotorista: LocationData,
    routeCoordinates:  LatLng[],
    // Functions
    setUserLocation: (location: LocationObjectCoords) => void,
    setOriginLocation: (originLocation: LocationData) => void,
    setDestinationLocation: (destinationLocation: LocationData) => void,
    setOriginLocationMotorista: (originLocation: LocationData) => void,
    setDestinationLocationMotorista: (destinationLocation: LocationData) => void,
    setRouteCoordinates: (routeCoordinates: LatLng[]) => void,
}

interface LocationContextProviderProps {
    children: ReactNode;
}

export function useLocationContext() {
    const context = useContext(LocationContext);
    if (context === null) {
        throw new Error('useLocationContext must be used within a LocationContextProvider');
    }
    return context;
}

export const LocationContextProvider = ({ children }: LocationContextProviderProps) => {
    const [contextValues, setContextValues] = useState<LocationContextData>({
        userLocation: null,
        originLocation: {
            coordinates: null,
            address: null,
        },
        destinationLocation: {
            coordinates: null,
            address: null,
        },
        originLocationMotorista: {
            coordinates: null,
            address: null,
        },
        destinationLocationMotorista: {
            coordinates: null,
            address: null,
        },
        routeCoordinates: [],
        setUserLocation: (location: LocationObjectCoords) => {
            setContextValues((prevContext) => ({
                ...prevContext,
                userLocation: location,
            }));
        },
        setOriginLocation: (originLocation: LocationData) => {
            setContextValues((prevContext) => ({
                ...prevContext,
                originLocation: originLocation,
            }));
        },
        setDestinationLocation: (destinationLocation: LocationData) => {
            setContextValues((prevContext) => ({
                ...prevContext,
                destinationLocation: destinationLocation,
            }));
        },
        setOriginLocationMotorista: (originLocation: LocationData) => {
            setContextValues((prevContext) => ({
                ...prevContext,
                originLocationMotorista: originLocation,
            }));
        },
        setDestinationLocationMotorista: (destinationLocation: LocationData) => {
            setContextValues((prevContext) => ({
                ...prevContext,
                destinationLocationMotorista: destinationLocation,
            }));
        },
        setRouteCoordinates: (routeCoordinates: LatLng[]) => {
            setContextValues((prevContext) => ({
                ...prevContext,
                routeCoordinates: routeCoordinates,
            }));
        }

    });

    return (
        <LocationContext.Provider value={contextValues}>
            {children}
        </LocationContext.Provider>
    );
}

export interface LocationData {
    coordinates: LatLng | null,
    address: string | null,
}
