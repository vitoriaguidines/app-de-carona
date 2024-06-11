import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-paper'; // Adicionado para os cards de viagem
import ViagensView from "../(models)/Viagens/ViagensView"

// Mock de dados da viagem
export const viagensTst =  [
  {
    distancia_destino: 0.0028546576730073443,
    distancia_origem: 0.53839343738946,
    viagem: {
      destino: "Av. Milton Tavares de Souza, 380-374 - Gragoatá, Niterói - RJ",
      horario: "2023-10-06T15:00:00Z",
      motorista_id: "exemploMotoristaID",
      origem: "R. Henrique Martins, 983-601 - Lagoinha, São Gonçalo",
      preco: 4.8,
      status: "ativa",
      vagas: 2,
      viagem_id: "-Nzsh44B8DbC2h6l461X"
    }
  },
  {
    distancia_destino: 0.0028546576730073443,
    distancia_origem: 1.0247466934326255,
    viagem: {
      destino: "Av. Milton Tavares de Souza, 380-374 - Gragoatá, Niterói - RJ",
      horario: "2023-10-06T15:00:00Z",
      motorista_id: "sIZdDbuWUQXS4aC1fRPscmYYRfa2",
      origem: "Estr. São Pedro, 1114-1162 - Vista Alegre, São Gonçalo - RJ",
      preco: 5.0,
      status: "ativa",
      vagas: 2,
      viagem_id: "-NzsaLtBbSL22jK58vZz"
    }
  }
]

export const viagensMotoristaTst =  [
  {
    distancia_destino: 0.0028546576730073443,
    distancia_origem: 0.53839343738946,
    viagem: {
      destino: "Av. Milton Tavares de Souza, 380-374 - Gragoatá, Niterói - RJ",
      horario: "2023-10-06T15:00:00Z",
      motorista_id: "exemploMotoristaID",
      origem: "R. Henrique Martins, 983-601 - Lagoinha, São Gonçalo",
      preco: 4.8,
      status: "ativa",
      vagas: 2,
      viagem_id: "-Nzsh44B8DbC2h6l461X"
    }
  },
  {
    distancia_destino: 0.0028546576730073443,
    distancia_origem: 1.0247466934326255,
    viagem: {
      destino: "Av. Milton Tavares de Souza, 380-374 - Gragoatá, Niterói - RJ",
      horario: "2023-10-06T15:00:00Z",
      motorista_id: "sIZdDbuWUQXS4aC1fRPscmYYRfa2",
      origem: "Estr. São Pedro, 1114-1162 - Vista Alegre, São Gonçalo - RJ",
      preco: 5.0,
      status: "ativa",
      vagas: 2,
      viagem_id: "-NzsaLtBbSL22jK58vZz"
    }
  }
]

const Viagens = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('passenger');
  const [viagens, setViagens] = useState([]); // Array de viagens

  const handleTabChange = (tab) => {
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
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {activeTab === 'passenger' && (
              <ViagensView viagens={viagensTst} title={"Minhas Viagens"} onGoBack={navigation.goBack}/>
          )}
          {activeTab === 'driver' && (
            <ViagensView viagens={viagensMotoristaTst} title={"Caronas"} onGoBack={navigation.goBack}/>
          )}
        </ScrollView>
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
    height: 40,
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

export default Viagens;