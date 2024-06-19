import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, Platform, StyleSheet, Modal, ScrollView, ActivityIndicator } from 'react-native';
import { defaultStyles } from '@/constants/Style';
import { useNavigation } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Entypo, Feather } from '@expo/vector-icons';
import { useLocationContext } from '@/contexts/LocationContext';
import { LatLng } from 'react-native-maps';
import { decode } from '@googlemaps/polyline-codec';
import * as MapsServices from "@/services/MapsServices";
import { useUserContext } from "@/contexts/UserContext";
import { addTrip } from "@/services/UserServices";

const Stack = createNativeStackNavigator();

const enderecosFixos = [
    { nome: "Gragoatá", latitude: -22.898698587260142, longitude: -43.13165812467787 },
    { nome: "Valonguinho", latitude: -22.897882904985664, longitude: -43.12579655412598 },
    { nome: "Praia Vermelha", latitude: -22.904906334585597, longitude: -43.13118323580061 },
    { nome: "Direito - Tiradentes", latitude: -22.90152397925232, longitude: -43.12695170356242 },
    { nome: "Direito - Presidente Pedreira", latitude: -22.903506933498658, longitude: -43.125881995840295 },
    { nome: "Escola de Enfermagem", latitude: -22.89513444883724, longitude: -43.11667342602883 },
    { nome: "Faculdade de Farmácia", latitude: -22.904403432305337, longitude: -43.09201460332637 },
    { nome: "Faculdade de Veterinária", latitude: -22.905593449449086, longitude: -43.09826869289252 },
    { nome: "Instituto de Educação Física", latitude: -22.896352009645046, longitude: -43.129042422983154 },
    { nome: "Instituto de Arte e Comunicação Social", latitude: -22.901249196956183, longitude: -43.12783280332647 },
    { nome: "Plaza Shopping", latitude: -22.896461479262367, longitude: -43.12392978553574 },
    { nome: "Barcas", latitude: -22.893723103072162, longitude: -43.12425969725104 },
    { nome: "Terminal", latitude: -22.890698655845945, longitude: -43.125956194486164 },
];

const MotoristaScreen = () => {
    const { originLocationMotorista, destinationLocationMotorista, routeCoordinates, setOriginLocationMotorista, setDestinationLocationMotorista, setRouteCoordinates } = useLocationContext();
    const { userId, userVehicles, loadUserVehicles } = useUserContext();
    const navigation = useNavigation();
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [isTimePickerVisible, setIsTimePickerVisible] = useState(Platform.OS === 'ios');
    const [isOriginModalVisible, setIsOriginModalVisible] = useState(false);
    const [isDestinationModalVisible, setIsDestinationModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            loadUserVehicles().then(() => setLoading(false));
        }
    }, [userId]);

    const handleSelectOrigin = (location) => {
        setOriginLocationMotorista({ address: location.nome, coordinates: { latitude: location.latitude, longitude: location.longitude } });
        setIsOriginModalVisible(false);
    };

    const handleSelectDestination = (location) => {
        setDestinationLocationMotorista({ address: location.nome, coordinates: { latitude: location.latitude, longitude: location.longitude } });
        setIsDestinationModalVisible(false);
    };

    const handleTimeChange = (event, time) => {
        setSelectedTime(time || selectedTime);
    };

    const showTimePicker = () => {
        setIsTimePickerVisible(true);
    };

    const hideTimePicker = () => {
        setIsTimePickerVisible(false);
    };

    const handleNavigateToOriginMap = () => {
        navigation.navigate('(models)/Motorista/MapaOrigemMotorista');
    };

    const handleNavigateToDestinationMap = () => {
        navigation.navigate('(models)/Motorista/MapaDestinoMotorista');
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

    const handleSubmit = async () => {
        if (!userId) {
            console.error("User ID not found");
            return;
        }

        const selectedVehicle = userVehicles.length > 0 ? userVehicles[0] : null;
        if (!selectedVehicle) {
            console.error("Nenhum veículo encontrado para o usuário.");
            return;
        }

        const tripData = {
            origem: originLocationMotorista.address,
            destino: destinationLocationMotorista.address,
            horario: selectedTime.toISOString(),
            motorista_id: userId,
            carro_id: selectedVehicle.veiculo_id,
            vagas: 4, // Ou outro valor baseado em sua lógica
            status: 'ativa',
        };

        try {
            const response = await addTrip(tripData);
            console.log(response.data);
        } catch (error) {
            console.error('Erro ao adicionar viagem:', error);
        }
    };

    if (loading) {
        return (
            <View style={[defaultStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#0F62AC" />
            </View>
        );
    }

    return (
        <View style={[defaultStyles.container, { backgroundColor: '#131514', justifyContent: 'center' }]}>
            {/* O código restante permanece inalterado */}
            <Modal visible={isOriginModalVisible} transparent={true} animationType="slide"
                onRequestClose={() => {
                    setIsOriginModalVisible(false);
                }}>
                <View style={styles.modalView}>
                    <ScrollView>
                        {enderecosFixos.map((location, index) => (
                            <TouchableOpacity key={index} onPress={() => handleSelectOrigin(location)}>
                                <Text style={styles.dropdownItem}>{location.nome}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setIsOriginModalVisible(false)}>
                        <Text style={styles.closeButtonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal visible={isDestinationModalVisible} transparent={true} animationType="slide"
                onRequestClose={() => {
                    setIsDestinationModalVisible(false);
                }}>
                <View style={styles.modalView}>
                    <ScrollView>
                        {enderecosFixos.map((location, index) => (
                            <TouchableOpacity key={index} onPress={() => handleSelectDestination(location)}>
                                <Text style={styles.dropdownItem}>{location.nome}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setIsDestinationModalVisible(false)}>
                        <Text style={styles.closeButtonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <Text style={[{fontSize: 30, color: '#fff', fontWeight: 'bold', textAlign: 'left'}]}>De onde você vai
                sair?</Text>
            <View style={[defaultStyles.container, {flex: 0, flexDirection: 'row'}]}>
                <TouchableOpacity style={defaultStyles.motorista} onPress={handleNavigateToOriginMap}>
                    <Text style={[{fontSize: 15, color: '#626262', textAlign: 'center'}]} numberOfLines={1} ellipsizeMode="tail">{originLocationMotorista.address ? originLocationMotorista.address : 'Insira o endereço completo'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdownTrigger} onPress={() => setIsOriginModalVisible(true)}>
                    <Entypo name="chevron-down" size={24} color='#000' />
                </TouchableOpacity>
            </View>
            <View style={defaultStyles.separator}/>
            <Text style={[{fontSize: 30, color: '#fff', fontWeight: 'bold', textAlign: 'left'}]}>Pra onde você
                vai?</Text>
            <View style={[defaultStyles.container, {flexDirection: 'row', flex: 0}]}>
                <TouchableOpacity style={defaultStyles.motorista} onPress={handleNavigateToDestinationMap}>
                    <Text style={[{fontSize: 15, color: '#626262', textAlign: 'center'}]} numberOfLines={1} ellipsizeMode="tail">{destinationLocationMotorista.address ? destinationLocationMotorista.address : 'Insira o endereço completo'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdownTrigger} onPress={() => setIsDestinationModalVisible(true)}>
                    <Entypo name="chevron-down" size={24} color='#000' />
                </TouchableOpacity>
            </View>
            <View style={defaultStyles.separator}/>
            <Text style={[{fontSize: 30, color: '#fff', fontWeight: 'bold', textAlign: 'left'}]}>Horário de
                Partida</Text>
            {/* Seletor de hora */}
            {Platform.OS === 'android' && (
                <TouchableOpacity onPress={showTimePicker} style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Feather name="clock" size={24} color="#0F62AC"/>
                    <Text style={{fontSize: 20, color: '#fff'}}>{selectedTime.toLocaleTimeString()}</Text>
                </TouchableOpacity>
            )}
            {isTimePickerVisible && (
                <DateTimePicker
                    value={selectedTime}
                    mode="time"
                    display={Platform.OS === 'ios' ? 'spinner' : 'clock'}
                    onChange={(event, time) => {
                        handleTimeChange(event, time);
                        if (Platform.OS === 'android') {
                            hideTimePicker();
                        }
                    }}
                />
            )}
            <TouchableOpacity style={defaultStyles.proximo} onPress={handleSubmit}>
                <Text style={[{fontSize: 15, color: '#ffff', textAlign: 'center', fontWeight: 'bold'}]}>Próximo</Text>
            </TouchableOpacity>

        </View>
    );
}

export default function Motorista() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Motorista"
                component={MotoristaScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    dropdownTrigger: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderColor: '#0F62AC',
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 12,
        backgroundColor: '#0F62AC'
    },
    modalView: {
        flex: 1,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    dropdownItem: {
        padding: 10,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#0F62AC',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
});
