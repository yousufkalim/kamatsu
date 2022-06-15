import { TouchableOpacity, Text } from "react-native"
import React from "react"

import { styles } from "./styles"

export const Button = ({
  btnText = "Button",
  isPrimary = false,
  onPress,
  halfWidthBtn = false,
  customStyle = {}
}) => {
  const containerStyle = isPrimary
    ? { ...styles.container, ...styles.containerBlue }
    : { ...styles.container }

  const halfWidthBtnStyle = halfWidthBtn ? { ...styles.containerHalf } : {}

  return (
    <TouchableOpacity
      style={{ ...containerStyle, ...halfWidthBtnStyle, ...customStyle }}
      onPress={onPress}
    >
      <Text
        style={
          isPrimary
            ? { ...styles.btnText, ...styles.btnTextWhite }
            : { ...styles.btnText }
        }
      >
        {btnText}
      </Text>
    </TouchableOpacity>
  )
}
