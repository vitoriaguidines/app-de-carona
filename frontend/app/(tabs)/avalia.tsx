import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';

const Avaliacao = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isDriver = false;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setRating(item)}
            >
              <FontAwesome
                name={item <= rating ? 'star' : 'star-o'}
                size={30}
                style={styles.starImageStyle}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const handleSubmit = () => {
    alert(`Você avaliou o ${isDriver ? 'motorista' : 'passageiro'} com ${rating} estrelas e comentou: ${comment}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.driverInfoContainer}>
          <Image
            source={require('@/assets/images/avatar.png')}
            style={styles.avatar}
          />
          <Text style={styles.driverName}>{isDriver ? 'Nome do Motorista' : 'Nome do Passageiro'}</Text>
        </View>

        <Text style={styles.ratingText}>Avalie o {isDriver ? 'motorista' : 'passageiro'}:</Text>
        <CustomRatingBar />

        <TextInput
          style={styles.commentBox}
          placeholder="Escreva seu comentário aqui"
          placeholderTextColor="#888"
          multiline
          numberOfLines={4}
          value={comment}
          onChangeText={setComment}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Enviar Avaliação</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#131514',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverInfoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  driverName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  ratingText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  customRatingBarStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  starImageStyle: {
    marginRight: 10,
    color: '#FFD700',
  },
  commentBox: {
    width: '90%',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    color: '#fff',
    marginBottom: 20,
    textAlignVertical: 'top'
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Avaliacao;
