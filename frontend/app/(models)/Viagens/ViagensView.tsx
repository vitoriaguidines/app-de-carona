import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Card} from "react-native-paper";
import React from "react";

const ViagensView:React.FC<ViagensViewProps> = ((props) => {
    return(
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <ScrollView style={{ backgroundColor: "#131514" }} contentContainerStyle={[styles.container, styles.passengerContainer]}>
                        {props.viagens.map((viagem, index) => (
                            <Card key={index} style={styles.card} onPress={props.onViagemClick}>
                                <Card.Content>
                                    {/* Card Title */}
                                    <View style={styles.cardHead}>
                                        <Text style={styles.cardHeadText}>
                                            {viagem.viagem.horario.split("T")[0]}
                                        </Text>
                                        <Text style={styles.cardHeadText}>{
                                            `Chegada:${viagem.viagem.horario.split("T")[1].substring(0,5)}`
                                        }</Text>
                                    </View>

                                    <View style={{ flexDirection: "row", marginTop: 5, marginBottom: 5 }}>
                                        <View style={{ flexDirection: "row" }}>
                                            <View style={{ justifyContent: "space-between" }}>
                                                <Text style={styles.text}>
                                                    {`D.Origem\n${(viagem.distancia_origem).toFixed(2)} Km`}
                                                </Text>
                                                <Text style={styles.text}>
                                                    {`D.Dest\n${(viagem.distancia_destino).toFixed(2)} Km`}
                                                </Text>
                                            </View>

                                            <View style={{ alignItems: 'center', marginLeft: 10, marginRight: 15 }}>
                                                <View style={styles.circle} />
                                                <View style={styles.rectangle} />
                                                <View style={styles.circle} />
                                            </View>
                                        </View>

                                        <View style={{ justifyContent: "space-between", width:"70%" }}>
                                            <Text style={{...styles.text, marginBottom: 15}}>{viagem.viagem.origem}</Text>
                                            <Text style={{...styles.text, marginTop: 15}}>{viagem.viagem.destino}</Text>
                                        </View>
                                    </View>
                                </Card.Content>
                            </Card>
                        ))}
                    </ScrollView>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
});
export default ViagensView;

export interface ViagensViewProps {
    viagens: [],
    onGoBack: () => void;
    onViagemClick?: () => void
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#131514',
    },
    container: {
        flexGrow: 1,
        padding: 10,
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
        marginTop: 10, // Movido para cima
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
    reviewContainer: {
        backgroundColor: '#333333',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    reviewText: {
        color: '#fff',
        fontSize: 16,
    },
    scrollViewContent: {
        flexGrow: 1,
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
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 6,
        borderColor: "orange",
    },
    rectangle: {
        width: 5,
        height: 125,
        backgroundColor: 'orange',
        marginTop: "-2%",
        marginBottom: "-2%",
    },
    text: {
        color: 'white',
        fontSize: 18,
    },
    passengerContainer: {
        marginTop: -10, // Ajuste para mover para cima
    },
});