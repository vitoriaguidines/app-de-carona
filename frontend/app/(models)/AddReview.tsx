import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importe Ionicons

const AddReview = () => {
  const [passengerName, setPassengerName] = useState('');
  const [passengerRating, setPassengerRating] = useState(5); // Inicializa com 5 estrelas
  const [passengerReview, setPassengerReview] = useState('');
  const [activeTab, setActiveTab] = useState('passenger');

  const handlePassengerRating = (rating) => {
    setPassengerRating(rating);
  };

  const handleAddReview = () => {
    // Aqui você pode implementar a lógica para adicionar a revisão ao banco de dados ou realizar outras ações
    console.log('Revisão adicionada:', {
      nome: passengerName,
      estrelas: passengerRating,
      review: passengerReview,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Avaliações</Text>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'passenger' && styles.activeTab]}
          onPress={() => setActiveTab('passenger')}
        >
          <Text style={styles.tabText}>Passageiro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'driver' && styles.activeTab]}
          onPress={() => setActiveTab('driver')}
        >
          <Text style={styles.tabText}>Motorista</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {activeTab === 'passenger' && (
          <View>
            <Text style={styles.subTitle}>Passageiro</Text>
            <View style={styles.passengerInfo}>
              <Image
                source={require('@/assets/images/avatar.png')} // Caminho da imagem do passageiro
                style={styles.passengerImage}
              />
              <View style={styles.passengerDetails}>
                <Text style={styles.passengerName}>{passengerName}</Text>
                <View style={styles.starContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => handlePassengerRating(star)}
                      style={styles.starButton}
                    >
                      <Ionicons
                        name={passengerRating >= star ? 'ios-star' : 'ios-star-outline'} // Usa ícones de estrela do Ionicons
                        size={20}
                        color="#ffb400"
                      />
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={styles.ratingText}>{passengerRating.toFixed(1)}</Text>
              </View>
            </View>
            <TextInput
              style={[styles.input, styles.reviewInput]}
              placeholder="Escreva uma review positiva aqui"
              value={passengerReview}
              onChangeText={setPassengerReview}
              multiline
            />
          </View>
        )}
        {activeTab === 'driver' && (
          <View>
            <Text style={styles.subTitle}>Motorista</Text>
            {/* Conteúdo para avaliação do motorista */}
          </View>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={handleAddReview}>
        <Text style={styles.addButtonText}>Adicionar Avaliação</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: '#262A2B',
  },
  activeTab: {
    backgroundColor: '#007bff',
  },
  tabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  passengerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  passengerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  passengerDetails: {
    flex: 1,
  },
  passengerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  starContainer: {
    flexDirection: 'row',
  },
  starButton: {
    marginRight: 5,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: '#fff',
  },
  reviewInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default AddReview;
