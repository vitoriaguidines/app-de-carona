import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AddReview = () => {
  const navigation = useNavigation();

  const [passengerName, setPassengerName] = useState('Maria Cecilia');
  const [passengerRating, setPassengerRating] = useState(5);
  const passengerReviewText =
    "Bom passageiro, educado e estava presente no local de encontro no horário marcado. Quem dera, todos fossem assim.";
  const [driverName, setDriverName] = useState('Matheus Ferreira');
  const [driverRating, setDriverRating] = useState(4);
  const driverReviewText =
    "Bom motorista, dirigiu de forma segura e chegou ao destino no horário previsto.";

  const [activeTab, setActiveTab] = useState('passenger');

  const handlePassengerRating = (rating) => {
    setPassengerRating(rating);
  };

  const handleDriverRating = (rating) => {
    setDriverRating(rating);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          {/* Ajuste a posição do título abaixo (marginBottom) para descer o nome "Avaliações" do topo */}
          <Text style={styles.title}>Avaliações</Text>
          <View style={styles.spacer}></View>
        </View>
        <View style={styles.topBar}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'passenger' && styles.activeTab]}
            onPress={() => setActiveTab('passenger')}
          >
            <Text style={[styles.tabText, activeTab === 'passenger' && styles.activeTabText]}>Passageiro</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'driver' && styles.activeTab]}
            onPress={() => setActiveTab('driver')}
          >
            <Text style={[styles.tabText, activeTab === 'driver' && styles.activeTabText]}>Motorista</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {activeTab === 'passenger' && (
            <View style={styles.reviewContainer}>
              <View style={styles.passengerInfo}>
                <Image
                  source={require('@/assets/images/avatar.png')}
                  style={styles.avatar}
                />
                <View style={styles.passengerDetails}>
                  <Text style={styles.userName}>{passengerName}</Text>
                  <View style={styles.starContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <TouchableOpacity
                        key={star}
                        onPress={() => handlePassengerRating(star)}
                        style={styles.starButton}
                      >
                        <Ionicons
                          name={passengerRating >= star ? 'star' : 'star-outline'}
                          size={30}
                          color="#ffb400"
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                  <Text style={styles.ratingText}>{passengerRating.toFixed(1)}</Text>
                </View>
              </View>
              <View style={[styles.reviewBox, styles.reviewTextBox]}>
                <Text style={styles.reviewText}>{passengerReviewText}</Text>
              </View>
            </View>
          )}
          {activeTab === 'driver' && (
            <View style={styles.reviewContainer}>
              <View style={styles.passengerInfo}>
                <Image
                  source={require('@/assets/images/avatar.png')}
                  style={styles.avatar}
                />
                <View style={styles.passengerDetails}>
                  <Text style={styles.userName}>{driverName}</Text>
                  <View style={styles.starContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <TouchableOpacity
                        key={star}
                        onPress={() => handleDriverRating(star)}
                        style={styles.starButton}
                      >
                        <Ionicons
                          name={driverRating >= star ? 'star' : 'star-outline'}
                          size={30}
                          color="#ffb400"
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                  <Text style={styles.ratingText}>{driverRating.toFixed(1)}</Text>
                </View>
              </View>
              <View style={[styles.reviewBox, styles.reviewTextBox]}>
                <Text style={styles.reviewText}>{driverReviewText}</Text>
              </View>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 100,
    marginTop: 40, 

  },
  spacer: {
    flex: 1,
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  passengerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  passengerDetails: {
    flex: 1,
  },
  userName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
  },
  starContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  starButton: {
    marginRight: 5,
  },
  ratingText: {
    color: '#ffb400',
    fontSize: 20,
    fontWeight: 'bold',
  },
  reviewContainer: {
    backgroundColor: '#333333',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  reviewBox: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
  },
  reviewTextBox: {
    backgroundColor: '#333333',
  },
  reviewText: {
    color: '#fff',
    fontSize: 16,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});

export default AddReview;
