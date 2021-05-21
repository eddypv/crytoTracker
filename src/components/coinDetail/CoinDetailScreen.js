/* eslint-disable no-undef */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SectionList,
  Pressable,
  Alert,
} from 'react-native';
import Colors from '../../res/colors';
import Http from '../../lib/http';
import {FlatList} from 'react-native-gesture-handler';
import CoinMarket from './CoinMarket';
import Storage from '../../lib/storage';

const CoinDetailScreen = props => {
  [coin, setCoin] = useState(props.route.params.coin);
  [markets, setMarkets] = useState([]);
  [isFavorite, setIsFavorite] = useState(false);

  const getIconImage = () => {
    if (coin.name) {
      const nameImage = coin.name.toLowerCase().replace(' ', '-');
      return `https://c1.coinlore.com/img/25x25/${nameImage}.png`;
    }
  };

  const getSections = () => {
    const sections = [
      {
        title: 'Market Cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24],
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h],
      },
    ];
    return sections;
  };
  const getMarkets = async coinId => {
    const URL = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    const data = await Http.get(URL);
    setMarkets(data);
  };
  const toogleFavorite = () => {
    if (isFavorite) {
      removeFavorite();
    } else {
      addFavorite();
    }
  };
  const addFavorite = async () => {
    const value = JSON.stringify(coin);
    const key = `Favorite-${coin.id}`;
    const stored = await Storage.storage(key, value);
    if (stored) {
      setIsFavorite(true);
    }
  };

  const removeFavorite = async () => {
    Alert.alert('Remove Favorite', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'Remove',
        onPress: async () => {
          const key = `Favorite-${coin.id}`;
          const removed = await Storage.remove(key);
          if (removed) {
            setIsFavorite(false);
          }
        },
      },
    ]);
  };

  const getFavorite = async () => {
    try {
      const key = `Favorite-${coin.id}`;
      const stringfavorite = await Storage.get(key);
      if (stringfavorite !== null) {
        setIsFavorite(true);
      }
    } catch (err) {
      console.log('error get fav ', error);
    }
  };

  useEffect(() => {
    getMarkets(coin.id);
    getFavorite();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <View style={styles.row}>
          <Image style={styles.iconImg} source={{uri: getIconImage()}} />
          <Text style={styles.titleText}>Coin Detail Screen</Text>
        </View>
        <Pressable
          onPress={toogleFavorite}
          style={[
            styles.btnFavorite,
            isFavorite ? styles.btnRemoveFavorite : styles.btnAddFavorite,
          ]}>
          <Text style={styles.btnFavoriteText}>
            {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
          </Text>
        </Pressable>
      </View>
      <SectionList
        style={styles.section}
        sections={getSections()}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <View style={styles.sectionItem}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({section}) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>{section.title}</Text>
          </View>
        )}
      />
      <Text style={styles.marketsText}>Markets</Text>
      <FlatList
        data={markets}
        horizontal={true}
        renderItem={({item}) => <CoinMarket item={item} />}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  subHeader: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  iconImg: {
    width: 25,
    height: 25,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: '#fff',
    fontSize: 14,
  },
  sectionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  section: {
    maxHeight: 250,
  },
  marketsText: {
    color: '#fff',
    fontWeight: 'bold',
    padding: 8,
    fontSize: 14,
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnAddFavorite: {
    backgroundColor: Colors.picton,
  },
  btnRemoveFavorite: {
    backgroundColor: Colors.carmine,
  },
  btnFavoriteText: {
    color: Colors.white,
  },
});
export default CoinDetailScreen;
