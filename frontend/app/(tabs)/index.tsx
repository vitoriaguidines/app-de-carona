import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ImageBackground, Image, Text, TouchableOpacity } from 'react-native';
import { defaultStyles } from '@/constants/Style'; 
import uffBackground from '@/assets/images/uff.png';
import uffLogo from '@/assets/images/logouff.png';
import { Link, useNavigation } from 'expo-router';
import { Entypo, Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';


const Stack = createNativeStackNavigator();

export function BuscarScreen() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleNavigateToMap = () => {
    navigation.navigate('(models)/mapa');
  };
  const handleNavigateToReserva = () => {
    navigation.navigate('(models)/reserva');
  };

  const handleDateChange = (event, date) => {
    setSelectedDate(date || selectedDate);
  };

  return (
    <View style={[defaultStyles.container, { backgroundColor: '#131514' }]}>
      <ImageBackground source={uffBackground} style={defaultStyles.uff} blurRadius={8}>
        <Image source={uffLogo} style={defaultStyles.logo} />
      </ImageBackground>
        <View style={defaultStyles.rectangle}>
          <View style={[defaultStyles.container, {flex:0, flexDirection:'row'}]}>
            <Entypo name="location-pin" size={40} color='#0F62AC' style={{marginTop: 12.5}}/>
            <TouchableOpacity style={defaultStyles.endereco} onPress={(handleNavigateToMap)}>
              <Text style={[{fontSize: 24,color: '#fff', fontWeight: 'bold',textAlign: 'center'}]}>endereco 1</Text>
            </TouchableOpacity>
          </View>
          <View style={[defaultStyles.container, {flex:0, flexDirection:'row'}]}>
          <Entypo name="location-pin" size={40} color='#0F62AC' style={{marginTop: 12.5}}/>
            <TouchableOpacity style={defaultStyles.endereco} onPress={(handleNavigateToMap)}>
              <Text style={[{fontSize: 24,color: '#fff', fontWeight: 'bold',textAlign: 'center'}]}>endereco 2</Text>
            </TouchableOpacity>
          </View>
          <View style={[defaultStyles.container, {flex:0, marginTop:12.5}]}>
          <DateTimePicker
            value={selectedDate ? new Date(selectedDate) : new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        </View>
          <TouchableOpacity style={defaultStyles.blueSection} onPress={(handleNavigateToReserva)}>
            <Text style={[{fontSize: 24,color: '#fff', fontWeight: 'bold',textAlign: 'center'}]}>Procurar</Text>
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