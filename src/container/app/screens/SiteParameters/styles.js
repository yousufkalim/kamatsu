import { Platform, StyleSheet } from "react-native"
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
    marginBottom: 10
  },
  inputGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 7,
    alignItems: "flex-end",
  },
  btnSpacer: {
    paddingVertical: 10
  },
  roundTripTxt: {
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    fontSize: 12
  },
  nextBtn: {
    flex: 1,
    alignSelf: "flex-end"
  }
})
