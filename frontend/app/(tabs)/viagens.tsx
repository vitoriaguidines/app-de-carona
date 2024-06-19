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
      viagem_id: "-Nzsh44B8DbC2h6l461X",
      passageiros: [
        "aDdnczXlcfWlDhCoNYkRw3wxk1v1",
        "anotherPassengerID"
      ]
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
      viagem_id: "-Nzsh44B8DbC2h6l461X",
      passageiros: [
        "aDdnczXlcfWlDhCoNYkRw3wxk1v1",
        "anotherPassengerID"
      ]
    }
  }
]

export const usuarios = {
  "exemploMotoristaID": {
    nome: "Daniel Motorista",
    foto: "https://storage.googleapis.com/app-de-carona.appspot.com/profile_pictures/aDdnczXlcfWlDhCoNYkRw3wxk1v1?Expires=1749436546&GoogleAccessId=firebase-adminsdk-p4bg0%40app-de-carona.iam.gserviceaccount.com&Signature=VfE4%2FpU5DxzmaU%2FqOoxKkMJUiH3FlxXy%2FVukm7i%2F6YZ8JLwpqrIIQyjmlayLJKhB75TuISJqi3EJz1rG5tPujdHgT1As3SoPfxkws4FpkLsDbvBBWITfw%2BrOKszwJi17QWsrixDrnnZ2Lo2JAL89oz0qYEOSZ4JnNvmmPqDp6tlgx%2FpEFYm9t7CdyZMdXvMA2w9KaiGx%2Fo7nM6jdrZYu%2FcOuiEnmRSFc7AW9TjbN8y3qbF93uZM6CMtO4T0Jch8%2Bs%2Fgh4QMP7yE9SkVmyFjlQVek6EytQILj%2B4%2Baa%2FLTIXtWGdXQdnWxauiRftJWfRLnamzKvXSB1zkUiDKt70a2sw%3D%3D",
    avaliacao: 4.5,
  },
  "aDdnczXlcfWlDhCoNYkRw3wxk1v1": {
    nome: "Maria Passageira",
    foto: "https://instagram.fsdu8-2.fna.fbcdn.net/v/t51.29350-15/298650538_763992304848199_1590868193179969552_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyLmYyOTM1MCJ9&_nc_ht=instagram.fsdu8-2.fna.fbcdn.net&_nc_cat=107&_nc_ohc=v_DtXGMsxXEQ7kNvgFfQV4V&edm=AEhyXUkBAAAA&ccb=7-5&ig_cache_key=MjkwMzUwMDQ4MDM2MzMyMzYzMw%3D%3D.2-ccb7-5&oh=00_AYBoxigKt235hs2fEoYl096DZ605ozc0P78tNxKXHTR_jQ&oe=6675EA8B&_nc_sid=cf751b",
    avaliacao: 4.7,
  },
  "anotherPassengerID": {
    nome: "Pedro Passageiro",
    foto: "https://example.com/passageiro2.jpg",
    avaliacao: 4.8,
  },
};

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
              <ViagensView viagens={viagensTst} title={"Minhas Viagens"} onGoBack={navigation.goBack} usuarios={usuarios}/>
          )}
          {activeTab === 'driver' && (
            <ViagensView viagens={viagensMotoristaTst} title={"Caronas"} onGoBack={navigation.goBack} usuarios={usuarios}/>
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