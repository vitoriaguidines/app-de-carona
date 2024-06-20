import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ActivityIndicator, Alert, FlatList, ListRenderItem, TouchableOpacity, Button } from 'react-native';
import { useUserContext } from '@/contexts/UserContext';
import { getProfile, getRatings, deleteVehicle } from '@/services/UserServices'; // Adicione deleteVehicle
import { FontAwesome } from '@expo/vector-icons';
import { UserProfile, Veiculo } from '@/types/types';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const Perfil = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [vehicles, setVehicles] = useState<Veiculo[]>([]);
  const [rating, setRating] = useState<{ value: number; count: number } | null>(null);
  const [motoristaAvaliacoes, setMotoristaAvaliacoes] = useState<any[]>([]);
  const [passageiroAvaliacoes, setPassageiroAvaliacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userContext = useUserContext();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { setIsLoggedIn } = useUserContext();

  const fetchProfile = async () => {
    try {
      const userId = userContext.userId;
      console.log('Fetching profile, userId:', userId);

      if (userId) {
        const profileData: UserProfile = await getProfile(userId);
        console.log('Profile data received:', profileData);

        if (profileData) {
          setProfile(profileData);

          const vehiclesData: Veiculo[] = profileData.veiculos ? Object.values(profileData.veiculos) : [];
          setVehicles(vehiclesData);

          const ratingsData = await getRatings(userId);
          if (ratingsData && ratingsData.length > 0) {
            const motoristaRatings = ratingsData.filter((r: any) => r.tipo === 'motorista');
            const passageiroRatings = ratingsData.filter((r: any) => r.tipo === 'passageiro');

            const totalRating = ratingsData.reduce((acc: number, rating: any) => acc + rating.avaliacao, 0);
            const averageRating = totalRating / ratingsData.length;
            setRating({ value: averageRating, count: ratingsData.length });
            setMotoristaAvaliacoes(motoristaRatings);
            setPassageiroAvaliacoes(passageiroRatings);
          } else {
            setRating({ value: 0, count: 0 });
          }

          setError(null);
        } else {
          setError('Perfil não encontrado.');
        }
      } else {
        setError('ID do usuário não encontrado no contexto.');
      }
    } catch (error) {
      console.error('Erro ao obter perfil:', error);
      setError('Não foi possível carregar o perfil.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [isFocused, userContext.userId]);

  const handleDeleteVehicle = async (veiculoId: string) => {
    try {
      const userId = userContext.userId;
      if (!userId) return;

      const confirmed = await new Promise((resolve) => {
        Alert.alert(
          "Confirmação",
          "Tem certeza de que deseja excluir este veículo?",
          [
            { text: "Cancelar", onPress: () => resolve(false), style: "cancel" },
            { text: "Excluir", onPress: () => resolve(true), style: "destructive" }
          ]
        );
      });

      if (!confirmed) return;

      const success = await deleteVehicle(userId, veiculoId);
      if (success) {
        Alert.alert("Sucesso", "Veículo excluído com sucesso!");
        fetchProfile(); // Atualize o perfil após a exclusão
      } else {
        Alert.alert("Erro", "Não foi possível excluir o veículo.");
      }
    } catch (error) {
      console.error('Erro ao excluir veículo:', error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar excluir o veículo.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0F62AC" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Tentar Novamente" onPress={fetchProfile} />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Perfil não encontrado.</Text>
      </View>
    );
  }

  const renderVehicle: ListRenderItem<Veiculo> = ({ item }) => (
    <View style={styles.vehicleItem}>
      <FontAwesome name="car" size={24} color="white" />
      <View style={styles.vehicleDetails}>
        <Text style={styles.vehicleName}>{item.marca} {item.modelo}</Text>
        <Text style={styles.vehicleColor}>{item.cor}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDeleteVehicle(item.veiculo_id)}>
        <FontAwesome name="trash" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.profileTextContainer}>
            <Text style={styles.username}>{profile.display_name}</Text>
            <Text style={styles.userLevel}>Iniciante</Text>
          </View>
          <Image
            source={profile.foto_url ? { uri: profile.foto_url } : require('@/assets/images/avatar.png')}
            style={styles.avatar}
          />
        </View>
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>Sobre você:</Text>
          <View style={styles.aboutRow}>
            <FontAwesome name="play" size={16} color="gray" />
            <Text style={styles.aboutText}>Estudante de computação da Universidade Federal Fluminense</Text>
          </View>
          <View style={styles.aboutRow}>
            <FontAwesome name="play" size={16} color="gray" />
            <Text style={styles.aboutText}>Viagem no trajeto do bairro Maria Paula até a UFF - PV</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.ratingSection} onPress={() => navigation.navigate('Avaliacoes', { motoristaAvaliacoes, passageiroAvaliacoes })}>
          <FontAwesome name="star" size={24} color="yellow" />
          <Text style={styles.ratingText}>{rating ? `${rating.value.toFixed(1)} - ${rating.count} avaliações` : 'Sem avaliações'}</Text>
        </TouchableOpacity>
        <View style={styles.vehicleSection}>
          <Text style={styles.vehicleTitle}>Veículos</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('(models)/AddCarro')}>
            <FontAwesome name="plus" size={16} color="blue" />
            <Text style={styles.addButtonText}>Adicionar veículo</Text>
          </TouchableOpacity>
          <FlatList
            data={vehicles}
            renderItem={renderVehicle}
            keyExtractor={(item) => item.veiculo_id}
          />
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={() => setIsLoggedIn(false)}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000', // Fundo preto
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#131514', // Fundo preto
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Fundo preto
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
    marginLeft: 10,
  },
  username: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  userLevel: {
    fontSize: 18,
    color: '#fff',
  },
  aboutSection: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  aboutTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  aboutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  aboutText: {
    fontSize: 18,
    color: '#aaa',
    marginLeft: 10,
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingText: {
    fontSize: 18,
    color: 'yellow',
    marginLeft: 10,
  },
  vehicleSection: {
    width: '100%',
    marginBottom: 20,
  },
  vehicleTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  vehicleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  vehicleDetails: {
    marginLeft: 10,
    flex: 1,
  },
  vehicleName: {
    fontSize: 18,
    color: '#fff',
  },
  vehicleColor: {
    fontSize: 16,
    color: '#aaa',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    fontSize: 16,
    color: 'blue',
    marginLeft: 5,
  },
  logoutButton: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  errorText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default Perfil;
