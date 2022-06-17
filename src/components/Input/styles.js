import { StyleSheet } from "react-native"
import * as appStyles from "../../utils/appStyles"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen"

export const styles = StyleSheet.create({
  container: {
    width: wp(45),
    marginTop: 10
  },
  placeHolder: {
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    fontSize: 12,
    marginBottom: 5
  },
  input: {
    height: 40,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: appStyles.BORDER_COLOR,
    borderRadius: appStyles.BORDER_RADIUS,
    paddingLeft: 10
  },
  labelContainer: {
    flexDirection: "row"
  },
  labelIcon: {
    fontSize: 14,
    marginLeft: 2
  },
  errorMessage: {
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    fontSize: 12,
    color: "red",
    marginTop: 5
  }
})
