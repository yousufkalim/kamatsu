import { StyleSheet } from "react-native"
import * as appStyles from "../../utils/appStyles"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen"

export const styles = StyleSheet.create({
  container: {
    maxHeight: hp(70)
  },
  itemContainer: {
    marginVertical: 10,
    borderBottomColor: appStyles.COLOR_GRAY_1,
    borderBottomWidth: 0.3,
    paddingBottom: 10
  },
  title: {
    fontFamily: appStyles.FONT_FAMILY_BOLD,
    fontSize: 12,
    color: "black",
    paddingBottom: 6
  },
  intro: {
    marginVertical: hp(2),
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    fontSize: 12,
    lineHeight: 24
  },
  value: {
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    fontSize: 12,
    lineHeight: 24
  }
})
