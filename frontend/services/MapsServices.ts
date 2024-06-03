import {LocationData} from "@/contexts/LocationContext";

// @ts-ignore
import {GOOGLE_MAPS_API_KEY} from '@env';

export const getRoute = async (originLocation:LocationData, destinationLocation:LocationData) => {
    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/directions/json?origin=${originLocation.coordinates?.latitude},${originLocation.coordinates?.longitude}&destination=${destinationLocation.coordinates?.latitude},${destinationLocation.coordinates?.longitude}&key=${'AIzaSyCX2fMAC8vF73oKU9Vg3NVXizsqOaHUn1c'}`
        );
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}