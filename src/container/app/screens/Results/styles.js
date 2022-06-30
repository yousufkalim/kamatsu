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
  resultsContainer: {
    backgroundColor: "#fff",
    flex: 1,
    marginBottom: hp(3),
    borderRadius: 10,
    padding: 10
  },
  divider: {
    height: 0.5,
    backgroundColor: appStyles.COLOR_GRAY_1,
    marginVertical: 3
  },
  section: {
    flexDirection: "row"
  },
  sectionCheckbox: {
    flexDirection: "row",
    paddingVertical: 10
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: wp(40)
  },
  title: {
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    fontSize: 28,
    marginBottom: 10
  },
  label: {
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    fontSize: 16,
    paddingVertical: 7,
    color: appStyles.COLOR_GRAY_1
  },
  value: {
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    fontSize: 16,
    paddingVertical: 7,
    marginLeft: 10
  },
  sectionHeader: {
    paddingVertical: 10,
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    fontSize: 20
  },
  nextBtn: {
    flex: 1,
    alignSelf: "flex-end"
  },
  image: {
    height: hp(70),
    width: wp(80)
  }
})
