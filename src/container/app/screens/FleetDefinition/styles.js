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
    marginBottom: 10,
    marginTop: 10
  },
  inputGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 7
  },
  btnSpacer: {
    paddingVertical: 20
  },
  nextBtn: {
    flex: 1,
    alignSelf: "flex-end"
  }
})
