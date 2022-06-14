import { TouchableOpacity, Text } from "react-native"
import React from "react"

import { styles } from "./styles"

export const IconButton = ({
  btnText = "Button",
  BtnIcon,
  onPress,
  isDisabled = false
}) => {
  return (
    <TouchableOpacity
      style={
        isDisabled
          ? { ...styles.container, ...styles.isDisabled }
          : { ...styles.container }
      }
      onPress={onPress}
    >
      <BtnIcon height={20} width={30} />
      <Text style={styles.btnText}>{btnText}</Text>
    </TouchableOpacity>
  )
}
