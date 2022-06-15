import { StyleSheet } from "react-native"
import * as appStyles from "../../utils/appStyles"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen"

export const styles = StyleSheet.create({
  container: {
    width: wp(45),
    zIndex: 9
  },
  label: {
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    fontSize: 12,
    marginBottom: 5,
    marginTop: 10
  },
  input: {
    borderWidth: 1,
    borderColor: appStyles.BORDER_COLOR,
    borderRadius: appStyles.BORDER_RADIUS,
    position: "relative",
    backgroundColor: "#fff"
  },
  placeHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    paddingHorizontal: 10
  },
  placeHolderText: {
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    fontSize: 14,
    // color: appStyles.COLOR_GRAY_1
  },
  icon: {
    // color: appStyles.COLOR_GRAY_1
  },
  dropdown: {
    position: "absolute",
    top: 39,
    left: 0,
    zIndex: 9,
    backgroundColor: "#fff",
    width: wp(45),
    borderWidth: 1,
    borderColor: appStyles.BORDER_COLOR,
    borderRadius: appStyles.BORDER_RADIUS,
    maxHeight: hp(25),
    overflow: "scroll"
  },
  item: {
    height: 30,
    justifyContent: "center",
    paddingLeft: 10
  },
  itemActive: {
    backgroundColor: "rgba(255, 200, 47, 0.2)"
  },
  itemLabel: {
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    fontSize: 14,
    // color: appStyles.COLOR_GRAY_1
  }
})
