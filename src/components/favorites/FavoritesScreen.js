import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FavoritesEmptyState from './FavoritesEmptyState';
import Colors from '../../res/colors';
const FavoritesScreen = () => {
  return (
    <View style={styles.contanier}>
      <FavoritesEmptyState />
    </View>
  );
};

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.charade,
  },
});

export default FavoritesScreen;
