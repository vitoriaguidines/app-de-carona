import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

const Perfil = () => {
  const handleLogout = () => {
    // Adicione aqui a lógica para o logout
    console.log('Logout realizado'); // Exemplo de mensagem no console
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
          <View style={styles.ratingRow}>
            <FontAwesome name="star" size={20} color="#ffb400" />
            <Text style={styles.ratingText}>4.9 - 415 avaliações</Text>
          </View>
          <View style={styles.lineSeparator} />
        </View>
        <View style={styles.vehiclesSection}>
          <Text style={styles.vehiclesTitle}>Veículos</Text>
          <View style={styles.addVehicleContainer}>
            <TouchableOpacity style={styles.addVehicleButton}>
              <FontAwesome name="plus-square" size={30} color="#007bff" />
            </TouchableOpacity>
            <Text style={styles.addVehicleText}>Adicionar veículo</Text>
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
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20, // Increased padding for overall spacing
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
    flexDirection: 'column', // Arrange elements in a vertical column
    justifyContent: 'space-between', // Distribute space between sections
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
    width: 130, // Increased avatar width
    height: 130, // Increased avatar height
    borderRadius: 65, // Increased avatar border radius
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 20, // Add margin between avatar and username
  },
  username: {
    fontSize: 24, // Increased name font size
    fontWeight: 'bold',
    color: '#fff',
  },
  aboutSection: {
    marginTop: 20, // Add spacing above the About section
  },
  aboutTitle: {
    fontSize: 22, // Increased title font size
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10, // Add spacing below the title
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
    marginBottom: 20, // Add margin at the bottom of Vehicles section
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
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  addVehicleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
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
    flexDirection: 'column', // Arrange vehicle details vertically
    marginLeft: 10, // Add margin to separate details from icon
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
    marginLeft: 'auto', // Align to the right
  },
  logoutButton: {
    marginTop: 1,
    backgroundColor: '#262A2B',
    paddingVertical: 8, // Reduced vertical padding
    paddingHorizontal: 16, // Reduced horizontal padding
    borderRadius: 15, // More rounded corners
    alignSelf: 'center',
  },
  logoutButtonText: {
    fontSize: 14, // Slightly reduced font size
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Perfil;
