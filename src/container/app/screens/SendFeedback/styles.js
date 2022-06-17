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
    marginBottom: 20,
    marginTop: 10
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
  submitBtn: {
    flex: 1,
    alignSelf: "flex-end"
  },
  emailError: {
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    fontSize: 12,
    color: "red"
  },
  successText: {
    color: appStyles.primaryColor,
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    fontSize: 21,
    lineHeight: 28,
    textAlign: "center"
  },
  text: {
    color: appStyles.primaryColor,
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    fontSize: 12,
    lineHeight: 20,
    textAlign: "center"
  },
  successContainer: {
    padding: 20
  },
  successBtn: {
    marginTop: 20,
    borderWidth: 0.5,
    borderColor: appStyles.primaryColor,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    borderRadius: appStyles.borderRadius,
    marginVertical: 10
  }
})
