import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";

import HeaderInStackScreens from "../../../Common/HeaderInStackScreens";

const window = Dimensions.get("window");
const scalePoint = window.width / 380;
export default function PrivacyPolicyScreen() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerBox}>
          <HeaderInStackScreens />
        </View>
        <View style={styles.showbleView}>
          <View style={styles.namePageView}>
            <Text style={styles.namePage}>Политика конфиденциальности</Text>
          </View>
          <View style={styles.textContent}>
            <Text style={styles.topTxt}>
              Настоящая Политика конфиденциальности мобильного приложения (далее
              — Политика) действует в отношении всей информации, которую «Upai»
              и/или его аффилированные лица могут получить о пользователе во
              время использования им данного приложения. Согласие пользователя
              на предоставление персональной информации, данное им в
              соответствии с настоящей Политикой в рамках отношений с одним из
              лиц, входящих в персонал «Upai», распространяется на все лица,
              входящие в «Upai».
            </Text>
            <Text style={styles.bottomTxt}>
              Использование приложения означает безоговорочное согласие
              пользователя с настоящей Политикой и указанными в ней условиями
              обработки его персональной информации; в случае несогласия с этими
              условиями пользователь должен воздержаться от использования
              приложения.
            </Text>
            <Text style={styles.bottomTxt}>
              1. Персональная информация пользователей, которую получает и
              обрабатывает мобильное приложение
            </Text>
            <Text style={styles.bottomTxt}>
              1.1. В рамках настоящей Политики под «персональной информацией
              пользователя» понимаются:
            </Text>
            <Text style={styles.bottomTxt}>
              1.1.1. Персональная информация, которую пользователь предоставляет
              о себе самостоятельно при регистрации (создании учётной записи)
              или в процессе использования приложения, включая персональные
              данные пользователя. Информация предоставляется пользователем на
              его усмотрение.
            </Text>
            <Text style={styles.bottomTxt}>
              1.1.2 Данные, которые автоматически передаются «Upai» в процессе
              их использования с помощью установленного на устройстве
              приложения, в том числе информация из cookie, информация об
              устройстве пользователя.
            </Text>
            <Text style={styles.bottomTxt}>
              1.2. Настоящая Политика применима только к приложению «Upai».
              «Upai» не контролирует и не несет ответственность за информацию
              третьих лиц, на которые пользователь может перейти по ссылкам,
              доступным в приложении. На таких сайтах у пользователя может
              собираться или запрашиваться иная персональная информация, а также
              могут совершаться иные действия.
            </Text>
            <Text style={styles.bottomTxt}>
              1.3. «Upai» в общем случае не проверяет достоверность персональной
              информации, предоставляемой пользователями, и не осуществляет
              контроль за их дееспособностью. Однако «Upai» исходит из того, что
              информация, переданная им от пользователей, является достоверной и
              поддерживает эту информацию в актуальном состоянии.
            </Text>

            <Text style={styles.bottomTxt}>
              2. Цели сбора и обработки персональной информации пользователей
            </Text>
            <Text style={styles.bottomTxt}>
              2.1. Приложение собирает и хранит только те персональные данные,
              которые необходимы для предоставления сервисов, входящих в состав
              приложения.
            </Text>
            <Text style={styles.bottomTxt}>
              2.2. Персональную информацию пользователя приложения «Upai» может
              использовать в следующих целях:
            </Text>
            <Text style={styles.bottomTxt}>
              2.2.1. Идентификация стороны в рамках соглашений;
            </Text>
            <Text style={styles.bottomTxt}>
              2.2.2. Предоставление пользователю персонализированных сервисов;
            </Text>
            <Text style={styles.bottomTxt}>
              2.2.3. Связь с пользователем, в том числе направление уведомлений,
              запросов и информации, касающихся использования сервисов, оказания
              услуг, а также обработка запросов и заявок от пользователя;
            </Text>
            <Text style={styles.bottomTxt}>
              2.2.4. Улучшение качества приложения, удобства его использования,
              разработка новых сервисов и услуг;
            </Text>
            <Text style={styles.bottomTxt}>
              2.2.5. Проведение статистических и иных исследований на основе
              обезличенных данных.
            </Text>
            <Text style={styles.bottomTxt}>
              3. Условия обработки персональной информации пользователя и её
              передачи третьим лицам
            </Text>
            <Text style={styles.bottomTxt}>
              3.1. В отношении персональной информации пользователя сохраняется
              ее конфиденциальность, кроме случаев добровольного предоставления
              пользователем информации о себе для общего доступа неограниченному
              кругу лиц.
            </Text>
            <Text style={styles.bottomTxt}>
              3.2. «Upai» вправе передать персональную информацию пользователя
              третьим лицам в следующих случаях:
            </Text>
            <Text style={styles.bottomTxt}>
              3.2.1. Пользователь выразил свое согласие на такие действия;
            </Text>
            <Text style={styles.bottomTxt}>
              3.2.2. Передача необходима в рамках использования пользователем
              определенного сервиса либо для оказания услуги пользователю;
            </Text>
            <Text style={styles.bottomTxt}>
              3.2.3. Передача предусмотрена кыргызским или иным применимым
              законодательством в рамках установленной законодательством
              процедуры;
            </Text>
            <Text style={styles.bottomTxt}>
              3.3. При обработке персональных данных пользователей приложения
              «Upai» руководствуется законом КР «О персональных данных».
            </Text>
            <Text style={styles.bottomTxt}>
              4. Изменение пользователем персональной информации
            </Text>
            <Text style={styles.bottomTxt}>
              4.1. Пользователь может изменить или дополнить персональную
              информацию, обратившись к специалистам «Upai» или в настройках
              мобильного приложения.
            </Text>
            <Text style={styles.bottomTxt}>
              4.2. Пользователь также может удалить предоставленную им в рамках
              определенной учетной записи персональную информацию, запросив
              удаление своей учетной записи через специалистов «Upai» по
              электронной почте
            </Text>
            <Text style={styles.bottomTxt}>
              5. Меры, применяемые для защиты персональной информации
              пользователей
            </Text>
            <Text style={styles.bottomTxt}>
              5.1. «Upai» принимает необходимые и достаточные организационные и
              технические меры для защиты персональной информации пользователя
              от неправомерного или случайного доступа, уничтожения, изменения,
              блокирования, копирования, распространения, а также от иных
              неправомерных действий с ней третьих лиц.
            </Text>
            <Text style={styles.bottomTxt}>
              6. Изменение Политики конфиденциальности. Применимое
              законодательство
            </Text>
            <Text style={styles.bottomTxt}>
              6.1. Данное редакция Политики действует от 12 декабря 2020 года.
            </Text>
            <Text style={styles.bottomTxt}>
              6.2. «Upai» имеет право вносить изменения в настоящую Политику
              конфиденциальности. При внесении изменений в актуальной редакции
              указывается дата последнего обновления. Новая редакция Политики
              вступает в силу с момента ее размещения, если иное не
              предусмотрено новой редакцией Политики. Действующая редакция
              всегда находится на странице по адресу https://upai.kg/rules/
              Пользователь сам обязуется на регулярной основе проверять
              положения данной Политики на предмет ее возможного изменения или
              дополнения.
            </Text>
            <Text style={styles.bottomTxt}>
              6.3. К настоящей Политике и отношениям между пользователем и
              «Upai», возникающим в связи с применением Политики
              конфиденциальности, подлежит применению право Кыргызской
              Республики
            </Text>

            <Text style={styles.bottomTxt}>
              7. Обратная связь. Вопросы и предложения
            </Text>
            <Text style={styles.bottomTxt}>
              7.1. Barchasi предложения или вопросы по поводу настоящей Политики
              следует сообщать на электронную почту Cashbackupai@gmail.com
            </Text>
          </View>
          <View
            style={{
              marginTop: "10%",
              alignItems: "center",
              marginBottom: "10%",
            }}
          >
            <TouchableOpacity
              style={styles.btnSignIn}
              onPress={() =>
                navigation.navigate("ProfileStackScreen", {
                  screen: "ProfileSettingScreen",
                })
              }
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  lineHeight: 19,
                }}
              >
                Принимаю
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  headerBox: {
    width: "95%",
    alignSelf: "center",
    marginTop: Platform.OS === "ios" ? scalePoint * 46 : scalePoint * 25,
    height: scalePoint * 23,
  },
  showbleView: {
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: scalePoint * 37.5,
  },
  namePage: {
    color: "#313131",
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
  },
  textContent: {
    marginTop: scalePoint * 31,
  },
  topTxt: {
    color: "#000",
    fontSize: 14,
    lineHeight: 16,
    fontFamily: "Roboto",
    textAlign: "justify",
  },
  bottomTxt: {
    marginTop: "5%",
    color: "#000",
    fontSize: 14,
    lineHeight: 16,
    fontFamily: "Roboto",
    textAlign: "justify",
  },
  btnSignIn: {
    width: "60%",
    backgroundColor: "#225196",
    alignItems: "center",
    borderRadius: 30,
    paddingVertical: "5%",
  },
});
