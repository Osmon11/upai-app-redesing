import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import HeaderInStackScreens from '../../../Common/HeaderInStackScreens';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { API } from '../../../config';

const window = Dimensions.get('window');
const scalePoint = window.width / 380;
export default function FaqScreen() {
  const [selectedValue, setSelectedValue] = useState(null);
  const [data, setData] = useState();

  useEffect(() => {
    getFaqList();
  }, []);
  const getFaqList = async () => {
    let req = await fetch(API + 'faq/');
    let resp = await req.json();

    setData(resp);
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <View style={styles.mainContent}>
        <View style={styles.headerBox}>
          <HeaderInStackScreens />
        </View>
        {data &&
          data.map((el, index) => {
            return (
              <View style={styles.container}>
                <View style={styles.categoryFilterBox}>
                  <Collapse>
                    <CollapseHeader>
                      <View
                        style={{
                          width: '95%',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text style={styles.questionTxt}>{el.question}</Text>
                        <SimpleLineIcons
                          name="arrow-down"
                          size={19}
                          color="#225196"
                        />
                      </View>
                    </CollapseHeader>
                    <CollapseBody>
                      <Text style={styles.answerTxt}>{el.answer}</Text>
                    </CollapseBody>
                  </Collapse>
                </View>
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  headerBox: {
    marginTop: Platform.OS === 'ios' ? '15%' : '10%',
  },
  mainContent: {
    width: '95%',
    alignSelf: 'center',
    marginBottom: '15%',
  },
  container: {
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryFilterBox: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#225196',
    borderRadius: 6,
    marginTop: '5%',
  },
  questionTxt: {
    fontSize: 16,
    fontFamily: 'Roboto',
    paddingLeft: scalePoint * 20,
    paddingVertical: scalePoint * 30,
    color: '#225196',
    width: '85%',
  },
  answerTxt: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Roboto',
    paddingLeft: scalePoint * 22,
    paddingBottom: scalePoint * 8,
    color: '#515151',
    width: '90%',
    marginBottom: '3%',
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    padding: '5%',
    color: 'black',
  },
  inputAndroid: {
    fontSize: 16,
    padding: '5%',
    color: 'black',
  },
});
