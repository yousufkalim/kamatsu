import { StyleSheet } from "react-native"
import * as appStyles from "../../utils/appStyles"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen"

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: appStyles.secondaryColor,
    justifyContent: "space-around",
    alignItems: "center",
    height: 40,
    borderRadius: 5,
  },
  btnText: {
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    fontSize: 14
  },
  btnTextWhite: {
    color: "#fff"
  },
  containerBlue: {
    backgroundColor: appStyles.primaryColor
  },
  containerHalf: {
    width: wp(45)
  }
})
