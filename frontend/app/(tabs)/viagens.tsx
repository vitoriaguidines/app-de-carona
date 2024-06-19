import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import { getMotoristaHistorico, getPassageiroHistorico, getMotoristaDetalhes } from '@/services/UserServices';
import { useUserContext } from '@/contexts/UserContext';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface Viagem {
    viagem_id: string;
    horario: string;
    origem: string;
    destino: string;
    motorista_id: string;
    passageiros: string[];
    motoristaNome?: string;  
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
                const tripsWithDetails: Viagem[] = await Promise.all(Object.values(data).map(async (trip: Viagem) => {
                    const motoristaDetalhes = await getMotoristaDetalhes(trip.motorista_id);
                    return { ...trip, motoristaNome: motoristaDetalhes.display_name };
                }));
                setTrips(tripsWithDetails);
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
                const tripsWithDetails: Viagem[] = await Promise.all(Object.values(data).map(async (trip: Viagem) => {
                    const motoristaDetalhes = await getMotoristaDetalhes(trip.motorista_id);
                    return { ...trip, motoristaNome: motoristaDetalhes.display_name };
                }));
                setTrips(tripsWithDetails);
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
    const [activeTab, setActiveTab] = useState<'passenger' | 'driver'>('passenger');
    const navigation = useNavigation();

    const handleTabChange = (tab: 'passenger' | 'driver') => {
        setActiveTab(tab);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.title}>Suas viagens</Text>
                <View style={styles.topBar}>
                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'passenger' && styles.activeTab]}
                        onPress={() => handleTabChange('passenger')}
                    >
                        <Text style={[styles.tabText, activeTab === 'passenger' && styles.activeTabText]}>Passageiro</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'driver' && styles.activeTab]}
                        onPress={() => handleTabChange('driver')}
                    >
                        <Text style={[styles.tabText, activeTab === 'driver' && styles.activeTabText]}>Motorista</Text>
                    </TouchableOpacity>
                </View>
                {activeTab === 'passenger' && <ViagensPassageiro />}
                {activeTab === 'driver' && <ViagensMotorista />}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#131514',
    },
    container: {
        flexGrow: 1,
        padding: 20,
    },
    goBackButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
        marginTop: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        marginTop: 10,
        textAlign: 'center',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    tabButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    activeTab: {
        borderBottomColor: '#007bff',
        borderBottomWidth: 2,
    },
    tabText: {
        color: '#fff',
        fontSize: 16,
    },
    activeTabText: {
        color: '#007bff',
        fontWeight: 'bold',
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    list: {
        padding: 16,
        backgroundColor: '#131514',
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
        color: '#ffffff', 
    },
    time: {
        fontSize: 14,
        color: '#cccccc', 
    },
    route: {
        marginBottom: 8,
    },
    location: {
        fontSize: 14,
        color: '#ffffff', 
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    driver: {
        fontSize: 14,
        color: '#ffffff', 
        marginLeft: 8,
    },
});

export default Viagens;
