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
    StyleSheet, Alert, Pressable,
    ScrollView
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

export function BuscarScreen() {
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [passengerCount, setPassengerCount] = useState(1);
    const [isPassengerDropdownVisible, setIsPassengerDropdownVisible] = useState(false);
    const [isOriginModalVisible, setIsOriginModalVisible] = useState(false);
    const [isDestinationModalVisible, setIsDestinationModalVisible] = useState(false);

    const route = useRoute();
    // const { addressOrigin, addressDestiny, coordinateOrigin, coordinateDestiny } = route.params || {};
    const { originLocation, destinationLocation, setOriginLocation, setDestinationLocation } = useLocationContext();

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

    const handleSelectOrigin = (location) => {
        setOriginLocation({ address: location.nome, coordinates: { latitude: location.latitude, longitude: location.longitude } });
        setIsOriginModalVisible(false);
    };

    const handleSelectDestination = (location) => {
        setDestinationLocation({ address: location.nome, coordinates: { latitude: location.latitude, longitude: location.longitude } });
        setIsDestinationModalVisible(false);
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
            setViagensDisponiveis(viagens)
            setIsSelectViagensDisponivel(true);
        });
    };

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

    return (
        <View style={[defaultStyles.container, {backgroundColor: '#131514'}]}>

            <Modal visible={isSelectViagensDisponivel} transparent={true} animationType="slide"
                onRequestClose={() => {
                setIsSelectViagensDisponivel(!isSelectViagensDisponivel);
            }}>
                <View style={styles.centeredView}>
                    <Pressable style={{backgroundColor: "#131514", width: "100%"}}
                        onPress={() => setIsSelectViagensDisponivel(!isSelectViagensDisponivel)}>
                        <View style={{marginLeft: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Octicons name="arrow-left" size={40} color='#0F62AC' style={{marginLeft: 10, marginTop: 12.5}}/>
                            <Text style={{color: "white", marginRight: 50, fontSize: 20}}>Selecione sua viagem</Text>
                            <Text style={{color: "white"}}></Text>
                        </View>
                    </Pressable>
                    <ViagensView viagens={viagensDisponiveis} onGoBack={navigation.goBack} />
                </View>

            </Modal>

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
                    <TouchableOpacity style={styles.dropdownTrigger} onPress={() => setIsOriginModalVisible(true)}>
                        <Entypo name="chevron-down" size={24} color='#000' />
                    </TouchableOpacity>
                </View>
                <View style={[defaultStyles.container, {flex: 0, flexDirection: 'row', alignItems: 'center'}]}>
                    <Entypo name="location-pin" size={40} color='#0F62AC' style={{marginTop: 12.5}}/>
                    <TouchableOpacity style={defaultStyles.enderecoAdaptavel} onPress={navigateToDestinationMap}>
                        <Text style={defaultStyles.enderecoTextAdaptavel} numberOfLines={1}>
                            {destinationLocation.address ? destinationLocation.address : 'endereco 2'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dropdownTrigger} onPress={() => setIsDestinationModalVisible(true)}>
                        <Entypo name="chevron-down" size={24} color='#000' />
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
                <TouchableOpacity style={defaultStyles.blueSection} onPress={handleProcurar}>
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
    dropdownItem: {
        padding: 10,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#0F62AC',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
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
});