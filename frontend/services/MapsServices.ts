import {LocationData} from "@/contexts/LocationContext";

// @ts-ignore
import {GOOGLE_MAPS_API_KEY} from '@env';

export const getRoute = async (originLocation:LocationData, destinationLocation:LocationData) => {
    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/directions/json?origin=${originLocation.coordinates?.latitude},${originLocation.coordinates?.longitude}&destination=${destinationLocation.coordinates?.latitude},${destinationLocation.coordinates?.longitude}&key=${'AIzaSyB6fpwUEraeiYIzqi-tL34YkmUxN0fpzrI'}`
        );
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}