import { StyleSheet } from "react-native"
import * as appStyles from "../../utils/appStyles"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen"

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: appStyles.secondaryColor,
    alignItems: "center",
    height: 60,
    paddingLeft: 20,
    borderRadius: 5,
    marginBottom: 10
  },
  isDisabled: {
    backgroundColor: "#A5ABAF"
  },
  btnText: {
    marginLeft: 20
  }
})
