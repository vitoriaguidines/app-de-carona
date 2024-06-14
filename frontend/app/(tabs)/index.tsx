import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
    Image,
    ImageBackground,
    Platform,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Modal,
    StyleSheet, Alert, Pressable
} from 'react-native';
import {defaultStyles} from '@/constants/Style';
import uffBackground from '@/assets/images/uff.png';
import uffLogo from '@/assets/images/logouff.png';
import {useNavigation} from 'expo-router';
import {Entypo, Feather, Octicons} from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useRoute} from '@react-navigation/native';
import * as ViagensService from '../../services/ViagensService';
import {useLocationContext} from "@/contexts/LocationContext";
import ModalScreen from "@/app/modal";
import ViagensView from "@/app/(models)/Viagens/ViagensView";
import {useUserContext} from "@/contexts/UserContext";

const Stack = createNativeStackNavigator();

export function BuscarScreen() {
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [passengerCount, setPassengerCount] = useState(1);
    const [isPassengerDropdownVisible, setIsPassengerDropdownVisible] = useState(false);

    const route = useRoute();
    // const { addressOrigin, addressDestiny, coordinateOrigin, coordinateDestiny } = route.params || {};
    const {originLocation, destinationLocation} = useLocationContext();
    const {userId} = useUserContext()

    //Priority
    const [priorityIsOpen, setPriorityIsOpen] = useState(false);
    const [currentPriority, setCurrentPriority] = useState('origem');
    const priorities = ['origem', 'destino'];

    // Viagens
    const [isSelectViagensDisponivel, setIsSelectViagensDisponivel] = useState(false);
    const [viagensDisponiveis, setViagensDisponiveis] = useState([]);

    const toggleDropdown = () => {
        setPriorityIsOpen(!priorityIsOpen);
    };

    const handleSelect = (priority: string) => {
        setCurrentPriority(priority);
        setPriorityIsOpen(false);
    };

    const navigateToOriginMap = () => {
        navigation.navigate('(models)/MapaOrigem');
    };
    const navigateToDestinationMap = () => {
        navigation.navigate('(models)/MapaDestino');
    };

    const handleDateChange = (event, date) => {
        setShowDatePicker(false);
        if (date) {
            const adjustedDate = new Date(date.setHours(selectedDate.getHours(), selectedDate.getMinutes()));
            setSelectedDate(adjustedDate);
        }
    };

    const handleTimeChange = (event, time) => {
        setShowTimePicker(false);
        if (time) {
            const adjustedDate = new Date(selectedDate.setHours(time.getHours(), time.getMinutes()));
            setSelectedDate(adjustedDate);
        }
    };

    const showDateTimePicker = () => {
        setShowDatePicker(true);
    };

    const showTimePickerDialog = () => {
        setShowTimePicker(true);
    };

    const hideDateTimePicker = () => {
        setShowDatePicker(false);
    };

    const hideTimePicker = () => {
        setShowTimePicker(false);
    };

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
    };

    const formatTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    };

    const handlePassengerCountChange = (count) => {
        setPassengerCount(count);
        setIsPassengerDropdownVisible(false);
    };

    const togglePassengerDropdown = () => {
        setIsPassengerDropdownVisible(!isPassengerDropdownVisible);
    };

    const convertToGMTMinus3 = (date) => {
        const gmtMinus3Date = new Date(date);
        gmtMinus3Date.setHours(date.getHours() - 3);
        return gmtMinus3Date.toISOString();
    };

    const handleProcurar = () => {
        const adjustedDate = convertToGMTMinus3(selectedDate);
        ViagensService.fetchViagens(
            originLocation.address,
            destinationLocation.address,
            "destino",
            adjustedDate, // Send the adjusted date in ISO format
            passengerCount,
            10,
            10,
        ).then((viagens) => {
            console.log(viagens)
            setViagensDisponiveis(viagens)
            setIsSelectViagensDisponivel(true);
        });
    };

    const handleIngressarViagem = (idViagem: string) => {
        console.log(idViagem)
        ViagensService.adicionaPassageiroEmViagem(idViagem, userId)
            .then(() => {
                console.log("Added");
            })
            .catch(err => console.error(err));
    }

    // const viagensTst =  [
    //     {
    //         distancia_destino: 0.0028546576730073443,
    //         distancia_origem: 0.53839343738946,
    //         viagem: {
    //             destino: "Av. Milton Tavares de Souza, 380-374 - Gragoatá, Niterói - RJ",
    //             horario: "2023-10-06T15:00:00Z",
    //             motorista_id: "exemploMotoristaID",
    //             origem: "R. Henrique Martins, 983-601 - Lagoinha, São Gonçalo",
    //             preco: 4.8,
    //             status: "ativa",
    //             vagas: 2,
    //             viagem_id: "-Nzsh44B8DbC2h6l461X"
    //         }
    //     },
    //     {
    //         distancia_destino: 0.0028546576730073443,
    //         distancia_origem: 1.0247466934326255,
    //         viagem: {
    //             destino: "Av. Milton Tavares de Souza, 380-374 - Gragoatá, Niterói - RJ",
    //             horario: "2023-10-06T15:00:00Z",
    //             motorista_id: "sIZdDbuWUQXS4aC1fRPscmYYRfa2",
    //             origem: "Estr. São Pedro, 1114-1162 - Vista Alegre, São Gonçalo - RJ",
    //             preco: 5.0,
    //             status: "ativa",
    //             vagas: 2,
    //             viagem_id: "-NzsaLtBbSL22jK58vZz"
    //         }
    //     }
    // ]

    console.log(viagensDisponiveis)

    return (
        <View style={[defaultStyles.container, {backgroundColor: '#131514'}]}>

            <Modal visible={isSelectViagensDisponivel} transparent={true} animationType="slide"
                onRequestClose={() => {
                setIsSelectViagensDisponivel(!isSelectViagensDisponivel);
            }}>
                <View style={styles.centeredView}>
                    <Pressable style={{backgroundColor: "#131514", width: "100%"}}
                        onPress={() => setIsSelectViagensDisponivel(!isSelectViagensDisponivel)}>
                        <View style={{marginLeft: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}} >
                            <Octicons name="arrow-left" size={40} color='#0F62AC' style={{marginLeft: 10, marginTop: 12.5}}/>
                            <Text style={{color: "white", marginRight: 50, fontSize: 20}}>Selecione sua viagem</Text>
                            <Text style={{color: "white"}}></Text>
                        </View>
                    </Pressable>
                    <ViagensView onViagemClick={handleIngressarViagem} viagens={viagensDisponiveis} onGoBack={navigation.goBack} />
                </View>

            </Modal>

            <ImageBackground source={uffBackground} style={defaultStyles.uffHalfHeight} blurRadius={8}>
                <Image source={uffLogo} style={defaultStyles.logo}/>
            </ImageBackground>
            <View style={{...defaultStyles.rectangle}}>
                <View style={[defaultStyles.container, {flex: 0, flexDirection: 'row', alignItems: 'center'}]}>
                    <Entypo name="location-pin" size={40} color='#0F62AC' style={{marginTop: 12.5}}/>
                    <TouchableOpacity style={defaultStyles.enderecoAdaptavel} onPress={navigateToOriginMap}>
                        <Text style={defaultStyles.enderecoTextAdaptavel} numberOfLines={1}>
                            {originLocation.address ? originLocation.address : 'endereco 1'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={[defaultStyles.container, {flex: 0, flexDirection: 'row', alignItems: 'center'}]}>
                    <Entypo name="location-pin" size={40} color='#0F62AC' style={{marginTop: 12.5}}/>
                    <TouchableOpacity style={defaultStyles.enderecoAdaptavel} onPress={navigateToDestinationMap}>
                        <Text style={defaultStyles.enderecoTextAdaptavel} numberOfLines={1}>
                            {destinationLocation.address ? destinationLocation.address : 'endereco 2'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={[defaultStyles.container, {
                    flex: 0,
                    marginTop: 12.5,
                    flexDirection: 'row',
                    justifyContent: 'center'
                }]}>
                    <TouchableOpacity onPress={showDateTimePicker} style={{flexDirection: 'row'}}>
                        <Feather name="calendar" size={24} color="#0F62AC"/>
                        {Platform.OS === 'android' && (
                            <Text style={{fontSize: 20, color: '#fff'}}>{formatDate(selectedDate)}</Text>
                        )}
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={selectedDate}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                            onChange={handleDateChange}
                        />
                    )}
                    <TouchableOpacity onPress={showTimePickerDialog} style={{flexDirection: 'row', marginLeft: 10}}>
                        <Feather name="clock" size={24} color="#0F62AC"/>
                        {Platform.OS === 'android' && (
                            <Text style={{fontSize: 20, color: '#fff'}}>{formatTime(selectedDate)}</Text>
                        )}
                    </TouchableOpacity>
                    {showTimePicker && (
                        <DateTimePicker
                            value={selectedDate}
                            mode="time"
                            display={Platform.OS === 'ios' ? 'spinner' : 'clock'}
                            onChange={handleTimeChange}
                        />
                    )}
                    <View style={{marginLeft: 10, flexDirection: 'row', alignItems: 'center'}}>
                        {isPassengerDropdownVisible ? (
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Octicons name="person" size={22} color={'#0F62AC'}/>
                                <View style={{
                                    backgroundColor: '#fff',
                                    borderRadius: 5,
                                    flexDirection: 'row',
                                    marginLeft: 10
                                }}>
                                    {[1, 2, 3, 4].map((count) => (
                                        <TouchableOpacity key={count} onPress={() => handlePassengerCountChange(count)}>
                                            <Text style={{
                                                fontSize: 20,
                                                color: '#333',
                                                paddingVertical: 2,
                                                paddingHorizontal: 10
                                            }}>
                                                {count}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        ) : (
                            <TouchableOpacity onPress={togglePassengerDropdown}
                                              style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Octicons name="person" size={22} color={'#0F62AC'}/>
                                <Text style={{fontSize: 20, color: '#fff', marginLeft: 5}}>{passengerCount}</Text>
                            </TouchableOpacity>
                        )}

                    </View>
                </View>
                <View style={[defaultStyles.container, {
                    flex: 0,
                    marginTop: 12.5,
                    flexDirection: 'row',
                    justifyContent: 'center'
                }]}>
                    {/*<View style={{paddingBottom: 15, flexDirection: 'row', alignItems: 'center'}}>*/}
                    {/*    {priorityIsOpen ? (*/}
                    {/*        <View style={{flexDirection: 'row', alignItems: 'center'}}>*/}
                    {/*            <Octicons name="rocket" size={22} color={'#0F62AC'}/>*/}
                    {/*            <View style={{*/}
                    {/*                backgroundColor: '#fff',*/}
                    {/*                borderRadius: 5,*/}
                    {/*                flexDirection: 'row',*/}
                    {/*                marginLeft: 10*/}
                    {/*            }}>*/}
                    {/*                {priorities.map((priority) => (*/}
                    {/*                    <TouchableOpacity key={priority} onPress={() => {*/}
                    {/*                        setCurrentPriority(priority);*/}
                    {/*                        setPriorityIsOpen(false);*/}
                    {/*                    }}>*/}
                    {/*                        <Text style={{*/}
                    {/*                            fontSize: 20,*/}
                    {/*                            color: '#333',*/}
                    {/*                            paddingVertical: 2,*/}
                    {/*                            paddingHorizontal: 10*/}
                    {/*                        }}>*/}
                    {/*                            {priority}*/}
                    {/*                        </Text>*/}
                    {/*                    </TouchableOpacity>*/}
                    {/*                ))}*/}
                    {/*            </View>*/}
                    {/*        </View>*/}
                    {/*    ) : (*/}
                    {/*        <TouchableOpacity onPress={() => setPriorityIsOpen(true)}*/}
                    {/*                          style={{flexDirection: 'row', alignItems: 'center'}}>*/}
                    {/*            <Octicons name="rocket" size={22} color={'#0F62AC'}/>*/}
                    {/*            <Text style={{fontSize: 20, color: '#fff', marginLeft: 5}}>{currentPriority.toUpperCase()}</Text>*/}
                    {/*        </TouchableOpacity>*/}
                    {/*    )}*/}
                    {/*</View>*/}
                </View>
                <TouchableOpacity disabled={originLocation.address === null || destinationLocation.address === null}
                                  style={{...defaultStyles.blueSection,
                                      backgroundColor: originLocation.address === null || destinationLocation.address === null ? "#808080" : "#0F62AC" }}
                                  onPress={handleProcurar}>
                    <Text
                        style={[{fontSize: 24, color: '#fff', fontWeight: 'bold', textAlign: 'center'}]}>Procurar</Text>
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

const styles = StyleSheet.create({
    goBackButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
        marginTop: 30,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
});