import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

const CoinsScreen = props => {
  const handlerPress = () => {
    console.log('On press', props);
    props.navigation.navigate('CoinDetail');
  };
  return (
    <View style={style.container}>
      <Text style={style.title}>Coins Screen</Text>
      <Pressable style={style.btn} onPress={handlerPress}>
        <Text style={style.btnText}>Ir a detail</Text>
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  title: {
    color: '#fff',
    textAlign: 'center',
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default CoinsScreen;
