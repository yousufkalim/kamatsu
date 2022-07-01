import { TouchableOpacity, Text } from "react-native"
import * as Progress from "react-native-progress"
import React from "react"

import { styles } from "./styles"

export const Button = ({
  btnText = "Button",
  isPrimary = false,
  onPress = () => {},
  halfWidthBtn = false,
  customStyle = {},
  isLoading
}) => {
  const containerStyle = isPrimary
    ? { ...styles.container, ...styles.containerBlue }
    : { ...styles.container }

  const halfWidthBtnStyle = halfWidthBtn ? { ...styles.containerHalf } : {}

  return (
    <TouchableOpacity
      style={{ ...containerStyle, ...halfWidthBtnStyle, ...customStyle }}
      onPress={() => {
        if (!isLoading) {
          onPress()
        }
      }}
    >
      {isLoading ? (
        <Progress.Circle size={20} indeterminate={true} color="#fff" />
      ) : (
        <Text
          style={
            isPrimary
              ? { ...styles.btnText, ...styles.btnTextWhite }
              : { ...styles.btnText }
          }
        >
          {btnText}
        </Text>
      )}
    </TouchableOpacity>
  )
}
