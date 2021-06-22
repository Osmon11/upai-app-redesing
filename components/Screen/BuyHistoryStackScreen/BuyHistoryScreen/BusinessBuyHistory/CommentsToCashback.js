import React from 'react';
import { BoxShadow } from 'react-native-shadow';
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import cashbacksIncomeIcon from '../../../../Images/trash.png';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function CommentsToCashback({ close, coment }) {
  const shadowOpt = {
    width: 51,
    height: 50,
    color: '#A0A0A0',
    border: 2,
    radius: 10,
    opacity: 0.1,
    x: -1,
    y: 1.5,
  };
  BackHandler.addEventListener('hardwareBackPress', function () {
    close;
  });
  return (
    <View>
      <View
        style={{ flexDirection: 'row', marginBottom: '5%', width: '98%' }}
        onPress={close}
      >
        <BoxShadow setting={shadowOpt}>
          <View style={styles.iconBox}>
            <Image style={styles.boxImage} source={cashbacksIncomeIcon} />
          </View>
        </BoxShadow>
        <View style={styles.cashbacksInfoBox}>
          <View style={styles.nameAndSumBox}>
            <View style={styles.nameBox}>
              <Text style={styles.cashbacksInfoText}>
                {coment.customer_name}
              </Text>
            </View>
            <View style={styles.sumBox}>
              <Text style={styles.shopSum}>{coment.amount} сом</Text>
              <Text style={styles.cashbackSum}>{coment.cashback} сом</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: '1%' }}>
          <Text style={styles.cashbacksComesDate}>
              {new Date(coment.created).getHours()<=9 ? '0'+ new Date(coment.created).getHours():new Date(coment.created).getHours()}:
              {new Date(coment.created).getMinutes()<=9 ? '0'+new Date(coment.created).getMinutes():new Date(coment.created).getMinutes()}
            </Text>
            
            <Text style={styles.cashbacksComesTime}>
              {new Date(coment.created).getDate()<=9 ? '0'+new Date(coment.created).getDate():new Date(coment.created).getDate()}.
              {new Date(coment.created).getMonth() <=9 ? '0'+(new Date(coment.created).getMonth()+1):new Date(coment.created).getMonth()+1}.
              {new Date(coment.created).getFullYear()}
            </Text>
            
          </View>
        </View>
      </View>
      <View style={styles.box}>
        <View style={styles.commentBox}>
          <Text style={styles.commentTxt}>
            Комментарий:
            <Text> {coment.comment}</Text>
          </Text>
        </View>
        <TouchableOpacity style={styles.closeCommentsBtn} onPress={close}>
          <AntDesign name="close" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  iconBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 50,
    height: 50,
    borderWidth: 0.5,
    borderColor: 'rgba(146, 146, 146, 0.37)',
    justifyContent: 'center',
  },
  boxImage: {
    width: 15,
    height: 15,
    alignSelf: 'center',
  },
  cashbacksInfoBox: {
    marginLeft: '5%',
    marginTop: '2%',
  },
  nameAndSumBox: {
    width: '100%',
    flexDirection: 'row',
  },
  nameBox: {
    width: '60%',
    marginRight: '7%',
  },
  sumBox: {
    width: '25%',
  },
  shopSum: {
    fontFamily: 'SfPro',
    fontSize: 12,
    lineHeight: 14.5,
    color: '#27AE60',
    alignSelf: 'flex-end',
  },
  cashbackSum: {
    fontFamily: 'SfPro',
    fontSize: 10,
    lineHeight: 12,
    color: '#515151',
    marginTop:'8%',
    alignSelf: 'flex-end',
  },
  commentTxt: {
    fontSize: 10,
    color: '#6b6b6b',
    marginTop: '2%',
  },
  cashbacksInfoText: {
    fontSize: 14,
    lineHeight: 16,
    color: '#313131',
  },
  cashbacksComesDate: {
    fontSize: 10,
    lineHeight: 12,
    color: '#6B6B6B',
    marginRight: '9%',
    marginTop: '-2%',
  },
  cashbacksComesTime: {
    marginTop: '-2%',
    fontSize: 10,
    lineHeight: 12,
    color: '#6B6B6B',
  },
  commentTxt: {
    width: '90%',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '300',
    textAlign: 'justify',
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentBox: {
    width: '90%',
  },
  closeCommentsBtn: {
    width: '5%',
    alignSelf: 'center',
  },
});
