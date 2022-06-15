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
  text: {
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    fontSize: 14,
    lineHeight: 26,
    marginBottom: 10
  },
  email: {
    color: appStyles.primaryColor
  }
})
