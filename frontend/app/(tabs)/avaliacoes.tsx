import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

interface Avaliacao {
  passageiro_id: string;
  motorista_id: string;
  avaliacao: number;
  comentario: string;
  nome: string; // Supondo que o nome do avaliador seja fornecido
}

interface AvaliacoesRouteParams {
  avaliacoes: Avaliacao[];
  tipo: 'motorista' | 'passageiro';
}

const Avaliacoes = () => {
  const route = useRoute<RouteProp<{ params: AvaliacoesRouteParams }, 'params'>>();
  const { avaliacoes, tipo } = route.params;

  const renderAvaliacao = ({ item }: { item: Avaliacao }) => (
    <View style={styles.avaliacaoContainer}>
      <Text style={styles.nome}>{item.nome}</Text>
      <View style={styles.ratingContainer}>
        <FontAwesome name="star" size={16} color="yellow" />
        <Text style={styles.rating}>{item.avaliacao.toFixed(1)}</Text>
      </View>
      <Text style={styles.comentario}>{item.comentario}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{tipo === 'motorista' ? 'Avaliações como Motorista' : 'Avaliações como Passageiro'}</Text>
      <FlatList
        data={avaliacoes}
        renderItem={renderAvaliacao}
        keyExtractor={(item) => tipo === 'motorista' ? item.passageiro_id : item.motorista_id}
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
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  avaliacaoContainer: {
    backgroundColor: '#1c1c1e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  rating: {
    fontSize: 16,
    color: 'yellow',
    marginLeft: 5,
  },
  comentario: {
    fontSize: 16,
    color: '#aaa',
    marginTop: 5,
  },
});

export default Avaliacoes;
