import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import Viagem from '@/Models/Viagem';
import {Card} from 'react-native-paper';

const Viagens = () => {
    const [viagens, setViagens] = React.useState<Viagem[]>([]);

    // Dummy data for demonstration
    React.useEffect(() => {
        // Assuming viagensData is an array of Viagem objects
        const viagensData: Viagem[] = [
            {
                date: new Date(),
                startTime: '10:00',
                endTime: '12:00',
                startLocation: 'Start Location 1',
                endLocation: 'End Location 1',
                driver: 'Driver 1'
            },
            {
                date: new Date(),
                startTime: '11:00',
                endTime: '01:00',
                startLocation: 'Start Location 2',
                endLocation: 'End Location 2',
                driver: 'Driver 2'
            },
            // Add more Viagem objects as needed
        ];
        setViagens(viagensData);
    }, []);

    return (
        <ScrollView style={{backgroundColor: "#131514"}} contentContainerStyle={[styles.container]}>
            <Text style={styles.title}>Suas Viagens</Text>
            {viagens.map((viagem, index) => (
                <Card key={index} style={styles.card}>
                    <Card.Content>
                        {/*Card Title*/}
                        <View style={styles.cardHead}>
                            <Text style={styles.cardHeadText}>{viagem.date.toDateString()}</Text>
                            <Text style={styles.cardHeadText}>{viagem.startTime}</Text>
                        </View>

                        <View style={{
                            flexDirection: "row",
                            marginTop: 5,
                            marginBottom: 5
                        }}>
                            <View style={{
                                flexDirection: "row",
                            }}>
                                <View style={{

                                    justifyContent: "space-between",
                                }}>
                                    <Text style={styles.text}>{viagem.startTime}</Text>
                                    <Text style={styles.text}>{viagem.endTime}</Text>
                                </View>

                                <View style={{
                                    alignItems: 'center',
                                    marginLeft: 10,
                                    marginRight: 15
                                }}>
                                    <View style={styles.circle}/>
                                    <View style={styles.rectangle}/>
                                    <View style={styles.circle}/>
                                </View>
                            </View>

                            <View style={{
                                justifyContent: "space-between",
                            }}>
                                <Text style={styles.text}>{viagem.startLocation}</Text>
                                <Text style={styles.text}>{viagem.endLocation}</Text>
                            </View>
                        </View>
                    </Card.Content>
                </Card>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: "8%",
        marginBottom: 10,
        color: 'white',
        textAlign: 'center'
    },
    card: {
        marginBottom: 10,
        backgroundColor: "#6B6B6B",
    },
    cardHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardHeadText: {
        fontSize: 25,
        color: "white",
        fontWeight: 'bold',
    },
    tripContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 6,
        borderColor: "orange",
    },
    rectangle: {
        width: 5,
        height: 40,
        backgroundColor: 'orange',
        marginTop: "-2%",
        marginBottom: "-2%",
    },
    location: {
        flex: 1,
        justifyContent: "space-between",
        marginTop: 10,
        marginBottom: 10,
        height: 80
    },
    text: {
        color: 'white',
        fontSize: 18,
    },
    times: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        height: 80
    },
    locations: {
        left: 40
    }
});

export default Viagens;
