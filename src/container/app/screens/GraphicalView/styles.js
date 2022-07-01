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
  chart: {
    flex: 1,
    backgroundColor: "red"
  },
  title: {
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    fontSize: 28,
    marginBottom: 10
  },
  nextBtn: {
    flex: 1,
    alignSelf: "flex-end"
  },
  sectionCheckbox: {
    flexDirection: "row",
    paddingVertical: 10
  },
  checkbox: {
    height: 20,
    width: 20,
    color: appStyles.primaryColor
  },
  checkboxLabel: {
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    fontSize: 14,
    paddingVertical: 7,
    marginLeft: 10
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: wp(40)
  }
})
