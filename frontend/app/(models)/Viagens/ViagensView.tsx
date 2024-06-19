import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { Card } from "react-native-paper";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const ViagensView: React.FC<ViagensViewProps> = ({ viagens, onGoBack, usuarios }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <ScrollView style={{ backgroundColor: "#131514" }} contentContainerStyle={[styles.container, styles.passengerContainer]}>
            {viagens.map((viagem, index) => {
              const motorista = usuarios[viagem.viagem.motorista_id];
              return (
                <Card key={index} style={styles.card} onPress={() => {}}>
                  <Card.Content>
                    {/* Card Title */}
                    <View style={styles.cardHead}>
                      <Text style={styles.cardHeadText}>
                        {viagem.viagem.horario.split("T")[0]}
                      </Text>
                      <Text style={styles.cardHeadText}>
                        {`Chegada:${viagem.viagem.horario.split("T")[1].substring(0, 5)}`}
                      </Text>
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

                      <View style={{ justifyContent: "space-between", width: "65%" }}>
                        <Text style={{ ...styles.text, marginBottom: 15 }}>{viagem.viagem.origem}</Text>
                        <Text style={{ ...styles.text, marginTop: 15 }}>{viagem.viagem.destino}</Text>
                      </View>
                    </View>

                    {/* Exibição das fotos, nomes e avaliações */}
                    <View style={styles.profileContainer}>
                      {motorista && (
                        <View style={styles.profileDetails}>
                          <Image
                            source={{ uri: motorista.foto }}
                            style={styles.profilePicture}
                          />
                          <View>
                            <Text style={styles.profileName}>{motorista.nome}</Text>
                            <View style={{flexDirection:'row'}}>
                                    <FontAwesome
                                        name={'star'}
                                        size={15}
                                        style={{color:'#FFD700'}}
                                        />
                                        <Text style={styles.profileRating}>{motorista.avaliacao}</Text>
                                    </View>
                          </View>
                        </View>
                      )}
                      {viagem.viagem.passageiros.map((passengerId, passengerIndex) => {
                        const passageiro = usuarios[passengerId];
                        return passageiro ? (
                            <View key={passengerIndex} style={styles.profileDetails}>
                                <Image
                                source={{ uri: passageiro.foto }}
                                style={styles.profilePicture}
                                />
                                <View>
                                    <Text style={styles.profileName}>{passageiro.nome}</Text>
                                    <View style={{flexDirection:'row'}}>
                                    <FontAwesome
                                        name={'star'}
                                        size={15}
                                        style={{color:'#FFD700'}}
                                        />
                                        <Text style={styles.profileRating}>{passageiro.avaliacao}</Text>
                                    </View>
                                </View>
                            </View>
                        ) : null;
                      })}
                    </View>
                  </Card.Content>
                </Card>
              );
            })}
          </ScrollView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ViagensView;

export interface ViagensViewProps {
  viagens: [],
  onGoBack: () => void;
  onViagemClick?: () => void;
  usuarios: any;
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
    marginTop: -10,
  },
  profileContainer: {
    flexDirection: 'column',
    marginTop: 10,
  },
  profileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileRating: {
    color: 'white',
    fontSize: 14,
  },
});
