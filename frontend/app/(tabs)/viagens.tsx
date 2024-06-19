import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getMotoristaHistorico, getPassageiroHistorico, getMotoristaDetalhes } from '@/services/UserServices';
import { useUserContext } from '@/contexts/UserContext';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();

interface Viagem {
    viagem_id: string;
    horario: string;
    origem: string;
    destino: string;
    motorista_id: string;
    passageiros: string[];
    motoristaNome?: string;  // Adiciona a propriedade motoristaNome
}

const ViagensMotorista: React.FC = () => {
    const { userId } = useUserContext();
    const [trips, setTrips] = useState<Viagem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrips = async () => {
            if (userId) {
                console.log(`Fetching motorista historico for user ID: ${userId}`);
                const data: Record<string, Viagem> = await getMotoristaHistorico(userId);
                if (Object.keys(data).length === 0) {
                    console.log('No trips found for motorista');
                } else {
                    console.log('Trips found for motorista:', data);
                }
                const tripsWithDetails: Viagem[] = await Promise.all(Object.values(data).map(async (trip: Viagem) => {
                    const motoristaDetalhes = await getMotoristaDetalhes(trip.motorista_id);
                    return { ...trip, motoristaNome: motoristaDetalhes.display_name };
                }));
                setTrips(tripsWithDetails);
            } else {
                console.log('User ID is null');
            }
            setLoading(false);
        };
        fetchTrips();
    }, [userId]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const renderItem = ({ item }: { item: Viagem }) => (
        <View style={styles.tripCard}>
            <View style={styles.header}>
                <Text style={styles.date}>{new Date(item.horario).toLocaleDateString()}</Text>
                <Text style={styles.time}>{new Date(item.horario).toLocaleTimeString()}</Text>
            </View>
            <View style={styles.route}>
                <Text style={styles.location}>{new Date(item.horario).toLocaleTimeString()}</Text>
                <Text style={styles.location}>{item.origem}</Text>
                <Text style={styles.location}>{item.destino}</Text>
            </View>
            <View style={styles.footer}>
                <FontAwesome name="user" size={24} color="#FFD700" />
                <Text style={styles.driver}>Motorista: {item.motoristaNome}</Text>
            </View>
        </View>
    );

    return (
        <FlatList
            data={trips}
            keyExtractor={(item) => item.viagem_id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
        />
    );
};

const ViagensPassageiro: React.FC = () => {
    const { userId } = useUserContext();
    const [trips, setTrips] = useState<Viagem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrips = async () => {
            if (userId) {
                console.log(`Fetching passageiro historico for user ID: ${userId}`);
                const data: Record<string, Viagem> = await getPassageiroHistorico(userId);
                if (Object.keys(data).length === 0) {
                    console.log('No trips found for passageiro');
                } else {
                    console.log('Trips found for passageiro:', data);
                }
                const tripsWithDetails: Viagem[] = await Promise.all(Object.values(data).map(async (trip: Viagem) => {
                    const motoristaDetalhes = await getMotoristaDetalhes(trip.motorista_id);
                    return { ...trip, motoristaNome: motoristaDetalhes.display_name };
                }));
                setTrips(tripsWithDetails);
            } else {
                console.log('User ID is null');
            }
            setLoading(false);
        };
        fetchTrips();
    }, [userId]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const renderItem = ({ item }: { item: Viagem }) => (
        <View style={styles.tripCard}>
            <View style={styles.header}>
                <Text style={styles.date}>{new Date(item.horario).toLocaleDateString()}</Text>
                <Text style={styles.time}>{new Date(item.horario).toLocaleTimeString()}</Text>
            </View>
            <View style={styles.route}>
                <Text style={styles.location}>{new Date(item.horario).toLocaleTimeString()}</Text>
                <Text style={styles.location}>{item.origem}</Text>
                <Text style={styles.location}>{item.destino}</Text>
            </View>
            <View style={styles.footer}>
                <FontAwesome name="user" size={24} color="#FFD700" />
                <Text style={styles.driver}>Motorista: {item.motoristaNome}</Text>
            </View>
        </View>
    );

    return (
        <FlatList
            data={trips}
            keyExtractor={(item) => item.viagem_id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
        />
    );
};

const Viagens: React.FC = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Passageiro" component={ViagensPassageiro} />
            <Tab.Screen name="Motorista" component={ViagensMotorista} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    list: {
        padding: 16,
        backgroundColor: '#000000', // Fundo preto
    },
    tripCard: {
        backgroundColor: '#1c1c1e',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    date: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff', // Texto branco
    },
    time: {
        fontSize: 14,
        color: '#cccccc', // Texto cinza claro
    },
    route: {
        marginBottom: 8,
    },
    location: {
        fontSize: 14,
        color: '#ffffff', // Texto branco
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    driver: {
        fontSize: 14,
        color: '#ffffff', // Texto branco
        marginLeft: 8,
    },
});

export default Viagens;
