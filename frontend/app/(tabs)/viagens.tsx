import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-paper'; // Adicionado para os cards de viagem

// Mock de dados da viagem
const Viagem = {
  date: new Date(),
  startTime: '10:00',
  endTime: '12:00',
  startLocation: 'Start Location 1',
  endLocation: 'End Location 1',
  driver: 'Driver 1'
};

const Viagens = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('passenger');
  const [viagens, setViagens] = useState([Viagem]); // Array de viagens

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
            <ScrollView style={{ backgroundColor: "#131514" }} contentContainerStyle={[styles.container, styles.passengerContainer]}>
              <Text style={styles.title}>Suas Viagens</Text>
              {viagens.map((viagem, index) => (
                <Card key={index} style={styles.card}>
                  <Card.Content>
                    {/* Card Title */}
                    <View style={styles.cardHead}>
                      <Text style={styles.cardHeadText}>{viagem.date.toDateString()}</Text>
                      <Text style={styles.cardHeadText}>{viagem.startTime}</Text>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 5, marginBottom: 5 }}>
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ justifyContent: "space-between" }}>
                          <Text style={styles.text}>{viagem.startTime}</Text>
                          <Text style={styles.text}>{viagem.endTime}</Text>
                        </View>

                        <View style={{ alignItems: 'center', marginLeft: 10, marginRight: 15 }}>
                          <View style={styles.circle} />
                          <View style={styles.rectangle} />
                          <View style={styles.circle} />
                        </View>
                      </View>

                      <View style={{ justifyContent: "space-between" }}>
                        <Text style={styles.text}>{viagem.startLocation}</Text>
                        <Text style={styles.text}>{viagem.endLocation}</Text>
                      </View>
                    </View>
                  </Card.Content>
                </Card>
              ))}
            </ScrollView>
          )}
          {activeTab === 'driver' && (
            <View style={styles.reviewContainer}>
              <Text style={styles.reviewText}>Conteúdo da aba Motorista</Text>
            </View>
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