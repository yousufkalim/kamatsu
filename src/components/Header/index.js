import { View, Text, TouchableOpacity } from "react-native"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen"
import LogoBlue from "../../assets/svg/logo-blue.svg"
import MenuIcon from "../../assets/svg/menu.svg"
import BackIcon from "../../assets/svg/back.svg"
import { styles } from "./styles"
export const Header = ({ showBack }) => {
  const navigation = useNavigation()

  const openDrawer = () => {
    navigation.toggleDrawer()
  }

  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      {showBack ? (
        <TouchableOpacity onPress={handleBack}>
          <BackIcon height={hp(3)} width={wp(5)} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 20 }} />
      )}

      <LogoBlue height={hp(3)} width={wp(40)} />

      <TouchableOpacity onPress={openDrawer}>
        <MenuIcon height={hp(3)} width={wp(10)} />
      </TouchableOpacity>
    </View>
  )
}
