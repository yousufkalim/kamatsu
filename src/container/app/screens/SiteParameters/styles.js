import { StyleSheet } from "react-native"
import * as appStyles from "../../../../utils/appStyles"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen"

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
    zIndex: 2
  },
  btnSpacer: {
    paddingVertical: 10
  },
  roundTripTxt: {
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    fontSize: 12
  }
})
