import { StyleSheet } from "react-native"
import * as appStyles from "../../utils/appStyles"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen"

export const styles = StyleSheet.create({
  container: {
    width: wp(45)
  },
  dropdown: {
    height: 40,
    borderWidth: 0.5,
    borderColor: appStyles.BORDER_COLOR,
    borderRadius: appStyles.BORDER_RADIUS,
    paddingHorizontal: 5,
    backgroundColor: "white"
  },
  icon: {
    marginRight: 5
  },
  label: {
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    fontSize: 12,
    marginBottom: 5,
    marginTop: 10
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: appStyles.FONT_FAMILY_REGULAR
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: appStyles.FONT_FAMILY_REGULAR
  },
  iconStyle: {
    width: 30,
    height: 30
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16
  },
  item: {
    height: 30,
    justifyContent: "center",
    paddingLeft: 10
  },
  itemActive: {
    backgroundColor: "rgba(255, 200, 47, 0.2)"
  }
})
