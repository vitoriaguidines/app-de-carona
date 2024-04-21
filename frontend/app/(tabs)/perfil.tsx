import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; // Importe useNavigation do React Navigation
import { router } from 'expo-router';

const Perfil = () => {
  const handleLogout = () => {
    console.log('Logout realizado');
  };

  const handleAddCarro = () => {
    router.navigate('(models)/AddCarro')
  };

  const handleViewReviews = () => {
    router.navigate('(models)/AddReview'); // Navegue para a página de avaliações
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.background} />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={require('@/assets/images/avatar.png')}
              style={styles.avatar}
            />
            <Text style={styles.username}>Leonardo Murta</Text>
          </View>
        </View>
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>Sobre você:</Text>
          <View style={styles.aboutInfoRow}>
            <FontAwesome name="graduation-cap" size={16} color="#aaa" />
            <Text style={styles.aboutInfoText}>Estudante da UFF</Text>
          </View>
          <View style={styles.aboutInfoRow}>
            <FontAwesome name="arrow-right" size={16} color="#aaa" />
            <Text style={styles.aboutInfoText}>Rio de Janeiro - São Paulo</Text>
          </View>
        </View>
        <View style={styles.ratingSection}>
          <TouchableOpacity onPress={handleViewReviews}>
            <View style={styles.ratingRow}>
              <FontAwesome name="star" size={20} color="#ffb400" />
              <Text style={styles.ratingText}>4.9 - 415 avaliações</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.lineSeparator} />
        </View>
        <View style={styles.vehiclesSection}>
          <Text style={styles.vehiclesTitle}>Veículos</Text>
          <View style={styles.addVehicleContainer}>
            <TouchableOpacity style={styles.addVehicleButton} onPress={handleAddCarro}>
              <FontAwesome name="plus-square" size={30} color="#007bff" />
              <Text style={styles.addVehicleText}>Adicionar veículo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.vehicleItem}>
            <FontAwesome name="car" size={20} color="#fff" />
            <View style={styles.vehicleDetails}>
              <Text style={styles.vehicleType}>Fiat Uno com Escada</Text>
              <Text style={styles.vehicleColor}>Branco</Text>
            </View>
            <TouchableOpacity style={styles.deleteVehicleButton}>
              <FontAwesome name="trash" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.vehicleItem}>
            <FontAwesome name="car" size={20} color="#fff" />
            <View style={styles.vehicleDetails}>
              <Text style={styles.vehicleType}>Celta</Text>
              <Text style={styles.vehicleColor}>Preto</Text>
            </View>
            <TouchableOpacity style={styles.deleteVehicleButton}>
              <FontAwesome name="trash" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#131514',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  aboutSection: {
    marginTop: 20,
  },
  aboutTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  aboutInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  aboutInfoText: {
    fontSize: 16,
    color: '#aaa',
    marginLeft: 5,
  },
  ratingSection: {
    marginTop: 20,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  lineSeparator: {
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 1,
  },
  vehiclesSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  vehiclesTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  addVehicleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  addVehicleButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addVehicleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginLeft: 5,
  },
  vehicleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#222',
    borderRadius: 5,
    marginBottom: 10,
  },
  vehicleDetails: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  vehicleType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  vehicleColor: {
    fontSize: 14,
    color: '#fff',
  },
  deleteVehicleButton: {
    marginLeft: 'auto',
  },
  logoutButton: {
    marginTop: 1,
    backgroundColor: '#262A2B',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 15,
    alignSelf: 'center',
  },
  logoutButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Perfil;
