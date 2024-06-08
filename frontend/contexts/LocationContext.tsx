import React, { createContext, ReactNode, useContext, useState } from "react";
import { LocationObjectCoords } from "expo-location";
import { LatLng } from "react-native-maps";

interface LocationData {
    coordinates: LatLng | null;
    address: string | null;
}

interface LocationContextData {
    // Data
    userLocation: LocationObjectCoords | null;
    originLocation: LocationData;
    destinationLocation: LocationData;
    // Functions
    setUserLocation: (location: LocationObjectCoords) => void;
    setOriginLocation: (originLocation: LocationData) => void;
    setDestinationLocation: (destinationLocation: LocationData) => void;
}

export const LocationContext = createContext<LocationContextData | null>(null);

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
        setUserLocation: (location: LocationObjectCoords) => {
            setContextValues((prevContext) => ({
                ...prevContext,
                userLocation: location,
            }))
        },
        setOriginLocation: (originLocation: LocationData) => {
            setContextValues((prevContext) => ({
                ...prevContext,
                originLocation: originLocation,
            }))
        },
        setDestinationLocation: (destinationLocation: LocationData) => {
            setContextValues((prevContext) => ({
                ...prevContext,
                destinationLocation: destinationLocation,
            }))
        }

    });

    return (
        <LocationContext.Provider value={contextValues}>
            {children}
        </LocationContext.Provider>
    )
}

// New Driver Location Context
interface DriverLocationContextData extends LocationContextData {
    driverLocation: LocationData;
    setDriverLocation: (location: LocationData) => void;
}

export const DriverLocationContext = createContext<DriverLocationContextData | null>(null);

export function useDriverLocationContext() {
    const context = useContext(DriverLocationContext);
    if (context === null) {
        throw new Error('useDriverLocationContext must be used within a DriverLocationContextProvider');
    }
    return context;
}

export const DriverLocationContextProvider = ({ children }: LocationContextProviderProps) => {
    const [contextValues, setContextValues] = useState<DriverLocationContextData>({
        userLocation: null,
        originLocation: {
            coordinates: null,
            address: null,
        },
        destinationLocation: {
            coordinates: null,
            address: null,
        },
        driverLocation: {
            coordinates: null,
            address: null,
        },
        setUserLocation: (location: LocationObjectCoords) => {
            setContextValues((prevContext) => ({
                ...prevContext,
                userLocation: location,
            }))
        },
        setOriginLocation: (originLocation: LocationData) => {
            setContextValues((prevContext) => ({
                ...prevContext,
                originLocation: originLocation,
            }))
        },
        setDestinationLocation: (destinationLocation: LocationData) => {
            setContextValues((prevContext) => ({
                ...prevContext,
                destinationLocation: destinationLocation,
            }))
        },
        setDriverLocation: (driverLocation: LocationData) => {
            setContextValues((prevContext) => ({
                ...prevContext,
                driverLocation: driverLocation,
            }))
        },
    });

    return (
        <DriverLocationContext.Provider value={contextValues}>
            {children}
        </DriverLocationContext.Provider>
    )
}
