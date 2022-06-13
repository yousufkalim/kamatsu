import { StyleSheet } from "react-native"
import * as appStyles from "../../utils/appStyles"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen"

export const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: "#fff",
    width: "89%",
    paddingBottom: 16,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    padding: 10
  },
  modalView: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.44)"
  },
  header: {
    alignItems: "flex-end",
    paddingTop: 10,
    paddingRight: 10
  },
  title: {
    flexDirection: "row",
    marginBottom: 20
  },
  titleText: {
    fontFamily: appStyles.FONT_FAMILY_MEDIUM,
    fontSize: 28,
    textAlign: "center"
  }
})
