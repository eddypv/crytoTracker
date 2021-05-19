/* eslint-disable no-undef */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';
import Http from '../../lib/http';
import CoinItem from './CoinItem';

const CoinsScreen = props => {
  [coins, setCoins] = useState([]);
  [loading, setLoanding] = useState(true);

  const handlerPress = () => {
    console.log('On press', props);
    props.navigation.navigate('CoinDetail');
  };
  useEffect(() => {
    const getData = async () => {
      const data = await Http.get('https://api.coinlore.net/api/tickers/');
      setCoins(data.data);
      setLoanding(false);
    };
    getData();
  }, []);
  return (
    <View style={style.container}>
      <Text style={style.title}>Coins Screen</Text>
      {loading ? (
        <ActivityIndicator color="#fff" size="large" style={style.loader} />
      ) : null}
      <FlatList
        data={coins}
        renderItem={({item}) => <CoinItem item={item} />}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  loader: {
    marginTop: 10,
  },
});

export default CoinsScreen;
