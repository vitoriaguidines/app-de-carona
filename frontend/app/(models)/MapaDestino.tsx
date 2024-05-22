import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React, { useState, useRef, useLayoutEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';

const MapaOrigem = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const autocompleteRef = useRef();
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Selecione o Local de Destino',
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Buscar', { addressDestiny: selectedLocation.address })}>
                    <Ionicons name="checkmark" size={28} color={'#50C878'}/>
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    const handleSelectLocation = (data, details = null) => {
        console.log(data, details);
        const selectedAddress = data.description;
        setSelectedLocation({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            address: data.description
        });
        navigation.navigate('Buscar', { addressDestiny: selectedAddress })
    };

    const handleMapPress = async (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        
        // Fazer uma solicitação de reversão geográfica para obter o endereço correspondente às coordenadas clicadas
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=inserir_key`);
        const data = await response.json();
        const address = data.results[0].formatted_address;

        // Atualizar o texto no GooglePlacesAutocomplete com o endereço obtido
        autocompleteRef.current?.setAddressText(address);

        // Atualizar o estado com as coordenadas e o endereço selecionados
        setSelectedLocation({
            latitude,
            longitude,
            address
        });
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
                <GooglePlacesAutocomplete
                    ref={autocompleteRef}
                    placeholder='Digite o endereço...'
                    fetchDetails={true}
                    onPress={handleSelectLocation}
                    query={{
                        key: 'inserir key',
                        language: 'pt-BR',
                    }}
                    styles={{
                        container: {
                            flex: 0,
                        },
                        textInputContainer: {
                            width: '100%',
                            backgroundColor: 'rgba(0,0,0,0)',
                            borderTopWidth: 0,
                            borderBottomWidth: 0,
                        },
                        textInput: {
                            marginLeft: 0,
                            marginRight: 0,
                            height: 38,
                            color: '#5d5d5d',
                            fontSize: 16,
                        },
                        predefinedPlacesDescription: {
                            color: '#1faadb',
                        },
                    }}
                />
            </View>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: selectedLocation ? selectedLocation.latitude : -22.9122921,
                    longitude: selectedLocation ? selectedLocation.longitude : -43.2061464,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={handleMapPress}
            >
                {selectedLocation && (
                    <Marker
                        coordinate={{
                            latitude: selectedLocation.latitude,
                            longitude: selectedLocation.longitude,
                        }}
                        title={selectedLocation.address}
                    />
                )}
            </MapView>
        </View>
    );
};

export default MapaOrigem;
