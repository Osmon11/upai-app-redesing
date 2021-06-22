import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
  Platform,
} from 'react-native';

import SearchHeader from 'react-native-search-header';
import burgerMenuIcon from '../../Images/BurgerMenuIcon.png';
import searchHeaderMenuIcon from '../../Images/SearchHeaderMenuIcon.png';
import { API } from '../../config';

const window = Dimensions.get('window');
const width = window.width;
const scalePoint = width / 380;
const height = window.height;

export default function Header({ open, close, display }) {
  const [openPage, setOpenPage] = useState(false);
  const [search, setSearch] = useState([]);
  const [arr, setArr] = useState([]);
  const [t, setT] = useState('');

  const navigation = useNavigation();
  const searchHeaderRef = useRef(null);

  const getToRef = (searchHeaderRef) => {
    searchHeaderRef.current.focus();
  };

  const openSearch = () => {
    searchHeaderRef.current.show();
    setOpenPage(true);
    open();
  };
  const closeHeaderSearch = () => {
    searchHeaderRef.current.hide();
    setOpenPage(false);
    close();
  };
  const searchMarkets = () => {
    
    if (search.length != 0) {
      navigation.navigate('SingleCategoryScreen', {
        name: 'Поиск',
        markets: search,
      });
    } else {
      navigation.navigate('SingleCategoryScreen', {
        name: 'Ничего не найдено',
      });
    }
    searchHeaderRef.current.clear();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={burgerMenuIcon}
            style={{ width: scalePoint * 22, height: scalePoint * 24 }}
          />
        </TouchableOpacity>
        {display && (
          <TouchableOpacity onPress={openSearch}>
            <Image
              source={searchHeaderMenuIcon}
              style={{ width: scalePoint * 23, height: scalePoint * 23 }}
            />
          </TouchableOpacity>
        )}
      </View>
      {display && (
        <SearchHeader
          style={{
            container: {
              marginTop: Platform.OS === 'ios' ? '-10%' : '-4%',
              height: height,
              width: '104%',
              marginLeft: '-2%',
              paddingTop: Platform.OS === 'ios' ? '10%' : '1%',
            },
            header: {
              marginTop: '-180%',
            },
            suggestion: {
              marginTop: '-2%',
              zIndex: 9999,
              display: 'none',
            },
          }}
          onBlur={() => closeHeaderSearch()}
          onClear={() => {
            () => searchHeaderRef.current.clear();
          }}
          onSearch={() => searchMarkets()}
          suggestionHistoryEntryRollOverCount={false}
          onClearSuggesstion={() => setOpenPage(true)}
          ref={searchHeaderRef}
          placeholder="Поиск"
          placeholderColor="gray"
          
          onBlur={() => closeHeaderSearch()}
          onClear={() => {
            () => searchHeaderRef.current.clear();
          }}
          onGetAutocompletions={async (text) => {
            if (text) {
              const response = await fetch(`${API}shop/?search=${text}`, {
                method: `get`,
              });
              const data = await response.json();
              
              setSearch(data.results);
            } else {
              return [];
            }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  text: {
    color: '#161924',
    fontSize: 20,
  },
  searchContainer: {
    position: 'absolute',
    zIndex: 9999,
    height: '100%',
  },
  status: {
    elevation: 2,
    width: width,
    height: 21,
    backgroundColor: '#0097a7',
  },
  suggsuggestion: {
    height: '10%',
    backgroundColor: '#000',
  },
});
