import { StyleSheet } from "react-native"
import * as appStyles from "../../../../utils/appStyles"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen"

export const styles = StyleSheet.create({
  container: {},
  backgroundImg: {
    width: wp(100),
    height: hp(60),
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    overflow: "hidden"
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 5,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: -30,
    backgroundColor: "rgba(0,0,0,0.35)",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  logo: {
    alignItems: "center",
    marginTop: hp(10)
  },
  introText: {
    fontFamily: appStyles.FONT_FAMILY_BOLD,
    color: "#fff",
    fontSize: 32,
    textAlign: "center",
    marginVertical: hp(5)
  },
  introDesc: {
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    color: "#fff",
    fontSize: 16,
    textAlign: "center"
  },
  btns: {
    padding: 20
  }
})
