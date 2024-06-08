import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import {defaultStyles} from '@/constants/Style';
import {useNavigation} from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Feather} from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const MotoristaScreen = () => {
    const route = useRoute();
    const { addressOrigin, addressDestiny, coordinateOrigin, coordinateDestiny } = route.params || {};

    const navigation = useNavigation();
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [isTimePickerVisible, setIsTimePickerVisible] = useState(Platform.OS === 'ios');

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

    const handleNavigateToReserva = () => {
        navigation.navigate('(models)/reserva');
    };

    return (
        <View style={[defaultStyles.container, {backgroundColor: '#131514', justifyContent: 'center'}]}>
            <Text style={[{fontSize: 30, color: '#fff', fontWeight: 'bold', textAlign: 'left'}]}>De onde você vai
                sair?</Text>
            <View style={[defaultStyles.container, {flex: 0, flexDirection: 'row'}]}>
                <TouchableOpacity style={defaultStyles.motorista} onPress={handleNavigateToOriginMap}>
                    <Text style={[{fontSize: 15, color: '#626262', textAlign: 'center'}]} numberOfLines={1} ellipsizeMode="tail">{addressOrigin ? addressOrigin : 'Insira o endereço completo'}</Text>
                </TouchableOpacity>
            </View>
            <View style={defaultStyles.separator}/>
            <Text style={[{fontSize: 30, color: '#fff', fontWeight: 'bold', textAlign: 'left'}]}>Pra onde você
                vai?</Text>
            <View style={[defaultStyles.container, {flexDirection: 'row', flex: 0}]}>
                <TouchableOpacity style={defaultStyles.motorista} onPress={handleNavigateToDestinationMap}>
                    <Text style={[{fontSize: 15, color: '#626262', textAlign: 'center'}]} numberOfLines={1} ellipsizeMode="tail">{addressDestiny ? addressDestiny : 'Insira o endereço completo'}</Text>
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
            <TouchableOpacity style={defaultStyles.proximo} onPress={() => console.log("1", coordinateOrigin, "2", coordinateDestiny)}>
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
