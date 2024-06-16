import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

interface Avaliacao {
  passageiro_id: string;
  motorista_id: string;
  avaliacao: number;
  comentario: string;
  nome: string;
  foto: string; // Adicionei uma propriedade para a foto do usuário
}

interface AvaliacoesRouteParams {
  avaliacoes: Avaliacao[];
  tipo: 'motorista' | 'passageiro';
}

const Avaliacoes = () => {
  const route = useRoute<RouteProp<{ params: AvaliacoesRouteParams }, 'params'>>();
  const [tipo, setTipo] = useState<'motorista' | 'passageiro'>(route.params.tipo);
  const avaliacoes = route.params.avaliacoes.filter(avaliacao => tipo === 'motorista' ? avaliacao.motorista_id : avaliacao.passageiro_id);

  const renderAvaliacao = ({ item }: { item: Avaliacao }) => (
    <View style={styles.avaliacaoContainer}>
      <View style={styles.userInfo}>
        <Image source={{ uri: item.foto }} style={styles.userImage} />
        <Text style={styles.nome}>{item.nome}</Text>
      </View>
      <View style={styles.ratingContainer}>
        {[...Array(5)].map((_, i) => (
          <FontAwesome
            key={i}
            name="star"
            size={16}
            color={i < item.avaliacao ? 'yellow' : 'gray'}
          />
        ))}
        <Text style={styles.rating}>{item.avaliacao.toFixed(1)}</Text>
      </View>
      <Text style={styles.comentario}>{item.comentario}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.switchButton, tipo === 'passageiro' && styles.activeButton]}
          onPress={() => setTipo('passageiro')}
        >
          <Text style={[styles.switchButtonText, tipo === 'passageiro' && styles.activeButtonText]}>Passageiro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.switchButton, tipo === 'motorista' && styles.activeButton]}
          onPress={() => setTipo('motorista')}
        >
          <Text style={[styles.switchButtonText, tipo === 'motorista' && styles.activeButtonText]}>Motorista</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={avaliacoes}
        renderItem={renderAvaliacao}
        keyExtractor={(item) => item.motorista_id + item.passageiro_id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    paddingBottom: 10,
  },
  switchButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeButton: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  switchButtonText: {
    color: '#aaa',
    fontSize: 16,
  },
  activeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  avaliacaoContainer: {
    backgroundColor: '#1c1c1e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  rating: {
    fontSize: 16,
    color: 'yellow',
    marginLeft: 5,
  },
  comentario: {
    fontSize: 16,
    color: '#aaa',
  },
});

export default Avaliacoes;
