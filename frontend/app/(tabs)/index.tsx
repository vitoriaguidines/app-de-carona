import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, ImageBackground, Platform, Text, TouchableOpacity, View } from 'react-native';
import { defaultStyles } from '@/constants/Style';
import uffBackground from '@/assets/images/uff.png';
import uffLogo from '@/assets/images/logouff.png';
import { useNavigation } from 'expo-router';
import { Entypo, Feather, Octicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export function BuscarScreen() {
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');
    const [passengerCount, setPassengerCount] = useState(1);
    const [isPassengerDropdownVisible, setIsPassengerDropdownVisible] = useState(false);
    const route = useRoute();
    const { addressOrigin, addressDestiny, coordinateOrigin, coordinateDestiny } = route.params || {};

    const navigateToOriginMap = () => {
        navigation.navigate('(models)/MapaOrigem');
    };
    const navigateToDestinationMap = () => {
        navigation.navigate('(models)/MapaDestino');
    };

    const handleDateChange = (event, date) => {
        setSelectedDate(date || selectedDate);
    };

    const showDateTimePicker = () => {
        setShowDatePicker(true);
    };

    const hideDateTimePicker = () => {
        setShowDatePicker(false);
    };

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
    };

    const handlePassengerCountChange = (count) => {
        setPassengerCount(count);
        setIsPassengerDropdownVisible(false);
    };

    const togglePassengerDropdown = () => {
        setIsPassengerDropdownVisible(!isPassengerDropdownVisible);
    };

    return (
        <View style={[defaultStyles.container, { backgroundColor: '#131514' }]}>
            <ImageBackground source={uffBackground} style={defaultStyles.uffHalfHeight} blurRadius={8}>
                <Image source={uffLogo} style={defaultStyles.logo} />
            </ImageBackground>
            <View style={{ ...defaultStyles.rectangle }}>
                <View style={[defaultStyles.container, { flex: 0, flexDirection: 'row', alignItems: 'center' }]}>
                    <Entypo name="location-pin" size={40} color='#0F62AC' style={{ marginTop: 12.5 }} />
                    <TouchableOpacity style={defaultStyles.enderecoAdaptavel} onPress={navigateToOriginMap}>
                        <Text style={defaultStyles.enderecoTextAdaptavel} numberOfLines={1} ellipsizeMode="tail">
                            {addressOrigin ? addressOrigin : 'endereco 1'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={[defaultStyles.container, { flex: 0, flexDirection: 'row', alignItems: 'center' }]}>
                    <Entypo name="location-pin" size={40} color='#0F62AC' style={{ marginTop: 12.5 }} />
                    <TouchableOpacity style={defaultStyles.enderecoAdaptavel} onPress={navigateToDestinationMap}>
                        <Text style={defaultStyles.enderecoTextAdaptavel} numberOfLines={1} ellipsizeMode="tail">
                            {addressDestiny ? addressDestiny : 'endereco 2'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={[defaultStyles.container, {
                    flex: 0,
                    marginTop: 12.5,
                    flexDirection: 'row',
                    justifyContent: 'center'
                }]}>
                    <TouchableOpacity onPress={showDateTimePicker} style={{ flexDirection: 'row' }}>
                        <Feather name="calendar" size={24} color="#0F62AC" />
                        {Platform.OS === 'android' && (
                            <Text style={{ fontSize: 20, color: '#fff' }}>{formatDate(selectedDate)}</Text>
                        )}
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={selectedDate}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'default' : 'calendar'}
                            onChange={(event, date) => {
                                handleDateChange(event, date);
                                if (Platform.OS === 'android') {
                                    hideDateTimePicker();
                                }
                            }}
                        />
                    )}
                    <View style={{ marginLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                        {isPassengerDropdownVisible ? (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Octicons name="person" size={22} color={'#0F62AC'} />
                                <View style={{ backgroundColor: '#fff', borderRadius: 5, flexDirection: 'row', marginLeft: 10 }}>
                                    {[1, 2, 3, 4].map((count) => (
                                        <TouchableOpacity key={count} onPress={() => handlePassengerCountChange(count)}>
                                            <Text style={{
                                                fontSize: 20,
                                                color: '#333',
                                                paddingVertical: 2,
                                                paddingHorizontal: 10,
                                            }}>{count}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        ) : (
                            <TouchableOpacity onPress={togglePassengerDropdown} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Octicons name="person" size={22} color={'#0F62AC'} />
                                <Text style={{ fontSize: 20, color: '#fff', marginLeft: 5 }}>{passengerCount}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                <TouchableOpacity style={defaultStyles.blueSection} onPress={() => console.log("origem", coordinateOrigin, "destino", coordinateDestiny)}>
                    <Text style={[{
                        fontSize: 24,
                        color: '#fff',
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }]}>Procurar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default function Index() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Buscar"
                component={BuscarScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}
