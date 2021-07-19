import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

import { Card } from 'react-native-shadow-cards';
import * as Linking from 'expo-linking';

import companyCallIcon from '../../../../Images/сompanyCallIcon.png';
import companyMapIcon from '../../../../Images/companyMapIcon.png';
import companyDateIcon from '../../../../Images/companyDateIcon.png';
import companyInstaIcon from '../../../../Images/companyInstaIcon.png';
import companyLinkIcon from '../../../../Images/companyLinkIcon.png';
const window = Dimensions.get('window');
const scalePoint = window.width / 380;

export default function CompanyInfo(props) {
  const [day, setDay] = React.useState('');
  const [phoneNum, setPhoneNum] = useState();
  const [nowHours, setNowHours] = useState();
  const [nowMinutes, setNowMinutes] = useState();
  const [status, setStatus] = useState('Закрыто');
  useEffect(() => {
    let now = new Date();
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    setDay(days[now.getDay()]);
    if (props.data?.working_days[day]?.from_) {
      let fromH = props.data?.working_days[day].from_.split(':')[0];
      let toH = props.data?.working_days[day].to.split(':')[0];
      let fromM = props.data?.working_days[day].from_.split(':')[1];
      let toM = props.data?.working_days[day].to.split(':')[1];
      
      if (
        (Number(fromH) >= Number(now.getHours()) &&
          Number(fromM) >= Number(now.getMinutes())) ||
        (Number(toH) <= Number(now.getHours()) &&
          Number(toM) <= Number(now.getMinutes()))
      ) {
        setStatus('Закрыто');
      } else {
        setStatus(
          `${fromH}:${fromM} - ${toH}:${toM}`
        );
      }
    }
  });

  return (
    <View
      style={{
        width: '100%',
      }}
    >
      <Card style={styles.cardStyle}>
        <View
          style={{
            width: '98%',
            borderRadius: 10,
            backgroundColor: '#fff',
            flexDirection: 'row',
            marginLeft: '2%',
          }}
        >
          <View style={styles.cardHalfSide}>
            <TouchableOpacity
              onPress={
                props.number === null
                  ? () => {}
                  : () => Linking.openURL(`tel:${props.data.phone}`)
              }
              style={styles.infoBox}
            >
              <Image style={styles.iconsStyle} source={companyCallIcon} />
              <Text style={styles.infoText}>
                {props.number ? props.number : 'Номер отсутствует'}
              </Text>
            </TouchableOpacity>
            <View style={styles.infoBox}>
              <Image style={styles.iconsStyle} source={companyMapIcon} />
              <Text style={styles.infoText}>
                {props.data && props.data.address
                  ? props.data.address
                  : 'Адрес отсутствует'}
              </Text>
            </View>
            <View style={styles.infoBox}>
              <Image style={styles.iconsStyle} source={companyDateIcon} />
              {props.data ? (
                <View style={styles.timeInfoBox}>
                  {(props.data.working_days &&
                    props.data.working_days[day].from_ == null) ||
                  props.data.working_days[day].from_ == undefined ||
                  props.data.working_days[day].to == undefined ||
                  props.data.working_days[day].to == null ||
                  !props.data.working_days[day].active ? (
                    <Text style={styles.closedTxt}>Закрыто</Text>
                  ) : (
                    <Text
                      style={
                        status == 'Закрыто'
                          ? styles.closedTxt
                          : styles.timeInfoText
                      }
                    >
                      {status}
                    </Text>
                  )}
                </View>
              ) : null}
            </View>
          </View>
          <View style={styles.cardHalfSide}>
            <TouchableOpacity
              style={styles.infoBox}
              onPress={
                props.instaPage === null
                  ? () => {}
                  : () =>
                      Linking.openURL(
                        `https://www.instagram.com/${props.data.instagram}/`
                      )
              }
            >
              <Image style={styles.iconsStyle} source={companyInstaIcon} />
              <Text style={styles.infoText}>
                {props.data && props.data.instagram
                  ? props.data.instagram
                  : 'Instagram аккаунта нет'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={
                props.webPage === null
                  ? () => {}
                  : () => Linking.openURL(`http://${props.data.web_site}`)
              }
              style={styles.infoBox}
            >
              <Image style={styles.iconsStyle} source={companyLinkIcon} />
              <Text style={styles.infoText}>
                {props.data && props.data.web_site
                  ? props.data.web_site
                  : 'Сайт отсутсвует'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
  cardStyle: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: 'rgba(146, 146, 146, 0.37)',

    borderRadius: 10,
  },
  cardHalfSide: {
    width: '48%',
    marginTop: '6%',
    marginHorizontal: '2%',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10%',
    width: '100%',
  },
  iconsStyle: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  infoText: {
    width: '80%',
    marginLeft: '5%',
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'left',
  },
  timeInfoBox: {
    width: '85%',
    marginLeft: '5%',
  },
  timeInfoText: {
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'left',
    color: '#28ea60',
  },
  closedTxt: {
    width: '85%',
    marginLeft: '5%',
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'left',
    color: 'red',
  },
});
