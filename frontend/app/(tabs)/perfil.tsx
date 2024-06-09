import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { useUserContext } from '@/contexts/UserContext';
import { getProfile } from '@/services/UserServices';

const Perfil = () => {
  const [profile, setProfile] = useState<any>(null); // Temporarily use 'any' type for simplicity
  const [loading, setLoading] = useState(true);
  const userContext = useUserContext();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = userContext.userId;
        console.log('Fetching profile, userId:', userId);

        if (userId) {
          const profileData = await getProfile(userId);
          console.log('Profile data received:', profileData);

          if (profileData) {
            setProfile(profileData);
          } else {
            Alert.alert('Erro', 'Perfil não encontrado.');
          }
        } else {
          Alert.alert('Erro', 'ID do usuário não encontrado no contexto.');
        }
      } catch (error) {
        console.error('Erro ao obter perfil:', error);
        Alert.alert('Erro', 'Não foi possível carregar o perfil.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userContext.userId]);

  if (loading) {
    return (
      <View style={[styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0F62AC" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={[styles.loadingContainer]}>
        <Text style={styles.errorText}>Perfil não encontrado.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            source={profile.foto_url ? { uri: profile.foto_url } : require('@/assets/images/avatar.png')}
            style={styles.avatar}
          />
          <Text style={styles.username}>{profile.display_name}</Text>
          <Text style={styles.email}>{profile.email}</Text>
        </View>
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>Sobre você:</Text>
          <Text style={styles.aboutText}>Estudante da UFF</Text>
          <Text style={styles.aboutText}>Rio de Janeiro - RJ</Text>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Fundo preto
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Fundo preto
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 20,
  },
  username: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  aboutSection: {
    alignItems: 'center',
    marginTop: 30,
  },
  aboutTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 18,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 5,
  },
  errorText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default Perfil;
