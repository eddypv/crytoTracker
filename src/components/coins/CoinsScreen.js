/* eslint-disable no-undef */
import React, {useEffect, useState} from 'react';
import Colors from '../../res/colors';
import {View, ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import Http from '../../lib/http';
import CoinItem from './CoinItem';

const CoinsScreen = props => {
  [coins, setCoins] = useState([]);
  [loading, setLoanding] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await Http.get('https://api.coinlore.net/api/tickers/');
      setCoins(data.data);
      setLoanding(false);
    };
    getData();
  }, []);

  const handlerPress = coin => {
    //console.log(props.navigation.navigate);
    props.navigation.navigate('CoinDetail', {coin});
  };

  return (
    <View style={style.container}>
      {loading ? (
        <ActivityIndicator color="#fff" size="large" style={style.loader} />
      ) : null}
      <FlatList
        data={coins}
        renderItem={({item}) => (
          <CoinItem
            item={item}
            handlePress={() => {
              return handlerPress(item);
            }}
          />
        )}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
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
