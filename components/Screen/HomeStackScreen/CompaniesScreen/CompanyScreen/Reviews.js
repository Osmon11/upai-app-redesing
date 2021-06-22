import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';

import reviewsAccountImg from '../../../../Images/reviewsAccountImg.png';

import CompaniesRating from './CompaniesRating';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import DialogAlert from '../../../../Common/DialogAlert';
import moment from 'moment';

const window = Dimensions.get('window');
const scalePoint = window.width / 380;
export default function Reviews({
  review,
  setRevLimit,
  revLim,
  profile,
  itemId,
  sendReply,
}) {
  const [allReviews, setAllReviews] = useState(false);
  const [selectedReply, setSelectedReply] = useState();
  const [reply, setReply] = useState('');
  const [answerModal, setAnswerModal] = useState(false);
  return (
    <View>
      <View style={styles.textBox}>
        <Text style={styles.mainBoxTxt}>Отзывы</Text>
      </View>
      <View style={styles.mainContentBox}>
        {review &&
          review.map((item, index) => (
            <View key={index}>
              <View style={styles.commentBox}>
                <View style={styles.userAvatarBox}>
                  <Image
                    style={styles.userAvatar}
                    source={{ uri: item.user_avatar }}
                  />
                </View>
                <View style={styles.mainCommentBox}>
                  <Text style={styles.usernameTxt}>{item.username}</Text>
                  <Text style={styles.commentTxt}>{item.opinion}</Text>
                  <View
                    style={{
                      marginTop: '2%',
                      flexDirection: 'row',
                    }}
                  >
                    <CompaniesRating rate={item.rate} />
                    {profile == itemId && (
                      <TouchableOpacity
                        onPress={() => {
                          setAnswerModal(!answerModal);
                          setSelectedReply(item.id);
                        }}
                      >
                        <Text style={styles.answerBtnTxt}>Ответить</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}
                  >
                    <Text style={styles.commentTime}>
                      {new Date(item.created)
                        .toLocaleTimeString()
                        .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3')}
                    </Text>
                    <Text style={styles.commentTime}>
                      {/* {new Date(item.created)
                        .toISOString()
                        .replace('-', '/')
                        .split('T')[0]
                        .replace('-', '/')} */}
                      {moment(item.created).format('DD.MM.YYYY')}
                    </Text>
                  </View>
                </View>
              </View>
              {item.replies &&
                item.replies.map((el, index) => (
                  <View style={styles.answerBox} key={index}>
                    <View style={styles.userAvatarBox}>
                      <Image
                        style={{
                          width: 25,
                          height: 25,
                          borderRadius: 12.5,
                        }}
                        source={{ uri: el.shop_logo }}
                      />
                    </View>
                    <View style={styles.mainCommentBox}>
                      <Text style={styles.usernameTxt}>{el.shop_name}</Text>
                      <Text style={styles.commentTxt}>{el.opinion}</Text>
                    </View>
                  </View>
                ))}
            </View>
          ))}
        <TouchableOpacity
          style={styles.moreBtn}
          onPress={() => setRevLimit(revLim + revLim)}
        >
          <Text style={styles.moreBtnTxt}>Больше отзывов</Text>
        </TouchableOpacity>
      </View>
      <Dialog
        visible={answerModal}
        onTouchOutside={() => setAnswerModal(false)}
      >
        <DialogContent style={styles.answerModalBox}>
          <View style={styles.answerInputBox}>
            <TextInput
              style={styles.answerInput}
              placeholder={'Напишите ответ'}
              value={reply}
              onChangeText={(text) => setReply(text)}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              sendReply(selectedReply, reply);
              setAnswerModal(false);
              setReply('');
            }}
            style={styles.answerModalBtn}
          >
            <Text style={styles.answerModalBtnTxt}>Ответить</Text>
          </TouchableOpacity>
        </DialogContent>
      </Dialog>
    </View>
  );
}
const styles = StyleSheet.create({
  textBox: {
    width: '95%',
    alignSelf: 'center',
  },
  mainBoxTxt: {
    fontSize: 20,
    lineHeight: 24,
    color: '#000',
  },
  mainContentBox: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
  },
  commentBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: '5%',
  },
  mainCommentBox: {
    width: '85%',
  },
  userAvatarBox: {
    width: '10%',
    marginLeft: '-5%',
    marginRight: '1%',
  },
  userAvatar: {
    width: scalePoint * 25,
    height: scalePoint * 25,
    borderRadius: scalePoint * 25 * 0.5,
  },
  usernameTxt: {
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'left',
  },
  commentTxt: {
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'left',
    marginTop: '5%',
  },
  commentTime: {
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'left',
    marginTop: '5%',
    marginRight: '5%',
    color: '#8d8d8d',
  },
  answerBtnTxt: {
    fontSize: 10,
  },
  answerBox: {
    width: '85%',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    marginTop: '5%',
  },
  moreBtn: {
    alignSelf: 'flex-end',
    marginRight: '5%',
    marginTop: '5%',
    marginBottom: '5%',
  },
  moreBtnTxt: {
    fontSize: 12,
    lineHeight: 14,
    color: '#225196',
  },
  answerModalBox: {
    marginTop: '5%',
    backgroundColor: '#fff',
    width: scalePoint * 300,
    height: scalePoint * 200,
    justifyContent: 'center',
  },
  answerInputBox: {
    borderWidth: 1,
    borderRadius: scalePoint * 10,
  },
  answerInput: {
    marginLeft: '5%',
    fontSize: 14,
    lineHeight: 16,
    color: '#000',
    padding: '3%',
  },
  answerModalBtn: {
    alignSelf: 'center',
    marginTop: '10%',
    width: scalePoint * 140,
    height: scalePoint * 40,
    backgroundColor: '#ff6b00',
    borderRadius: scalePoint * 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerModalBtnTxt: {
    fontSize: 14,
    lineHeight: 16,
    alignSelf: 'center',
    color: '#fff',
  },
});
