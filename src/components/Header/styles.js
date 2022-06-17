import { StyleSheet } from "react-native"
import * as appStyles from "../../utils/appStyles"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen"

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: appStyles.COLOR_GRAY_1
  }
})
