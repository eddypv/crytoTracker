import React from 'react';
import {View, Text, Image, StyleSheet, Platform, Pressable} from 'react-native';
import Colors from '../../res/colors';

const CoinItem = ({item, handlePress}) => {
  const getImageArow = () => {
    if (item.percent_change_1h > 0) {
      return require('../../assets/image/arrow_up.png');
    } else {
      return require('../../assets/image/arrow_down.png');
    }
  };
  return (
    <Pressable onPress={handlePress} style={style.container}>
      <View style={style.row}>
        <Text style={style.symbolText}>{item.symbol}</Text>
        <Text style={style.nameText}>{item.name}</Text>
        <Text style={style.priceText}>{`$${item.price_usd}`}</Text>
      </View>
      <View style={style.row}>
        <Text style={style.percentText}>{item.percent_change_1h}</Text>
        <Image style={style.imgIcon} source={getImageArow()} />
      </View>
    </Pressable>
  );
};
const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    marginLeft: Platform.OS === 'ios' ? 16 : 0,
  },
  row: {
    flexDirection: 'row',
  },
  symbolText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12,
  },
  nameText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 12,
  },
  percentText: {
    color: '#fff',
    fontSize: 12,
    marginRight: 12,
  },
  priceText: {
    color: '#fff',
    fontSize: 14,
  },
  imgIcon: {
    width: 22,
    height: 22,
  },
});
export default CoinItem;
