import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
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
  motoristaAvaliacoes: Avaliacao[];
  passageiroAvaliacoes: Avaliacao[];
}

const Avaliacoes = () => {
  const route = useRoute<RouteProp<{ params: AvaliacoesRouteParams }, 'params'>>();
  const { motoristaAvaliacoes, passageiroAvaliacoes } = route.params;

  const [tipo, setTipo] = useState<'motorista' | 'passageiro'>('motorista');
  
  const avaliacoes = tipo === 'motorista' ? motoristaAvaliacoes : passageiroAvaliacoes;

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
      <View style={styles.switchContainer}>
        <TouchableOpacity onPress={() => setTipo('motorista')} style={[styles.switchButton, tipo === 'motorista' && styles.activeSwitchButton]}>
          <Text style={[styles.switchButtonText, tipo === 'motorista' && styles.activeSwitchButtonText]}>Motorista</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTipo('passageiro')} style={[styles.switchButton, tipo === 'passageiro' && styles.activeSwitchButton]}>
          <Text style={[styles.switchButtonText, tipo === 'passageiro' && styles.activeSwitchButtonText]}>Passageiro</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.titulo}>{tipo === 'motorista' ? 'Avaliações como Motorista' : 'Avaliações como Passageiro'}</Text>
      {avaliacoes.length > 0 ? (
        <FlatList
          data={avaliacoes}
          renderItem={renderAvaliacao}
          keyExtractor={(item) => tipo === 'motorista' ? item.passageiro_id : item.motorista_id}
        />
      ) : (
        <Text style={styles.noReviewsText}>Nenhuma avaliação encontrada.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  switchButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1c1c1e',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  switchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  activeSwitchButton: {
    backgroundColor: '#f1c40f',
  },
  activeSwitchButtonText: {
    color: '#000',
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
  noReviewsText: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Avaliacoes;
