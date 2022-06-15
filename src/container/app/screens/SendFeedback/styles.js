import { StyleSheet } from "react-native"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen"
import * as appStyles from "../../../../utils/appStyles"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  title: {
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    fontSize: 28,
    marginBottom: 20
  },
  inputEmailContainer: {
    width: "100%",
    marginBottom: 10
  },
  inputMsgContainer: {
    width: "100%"
  },
  inputMsg: {
    height: hp(12)
  },
  nextBtn: {
    flex: 1,
    alignSelf: "flex-end"
  }
})
