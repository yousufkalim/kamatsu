import React from "react"
import { Text, View, TextInput, TouchableOpacity } from "react-native"

import QuestionIcon from "../../assets/svg/question.svg"
import { styles } from "./styles"

export const Input = ({
  placeHolder = "Placeholder",
  inputLabel = "Label",
  value,
  setValue,
  customContainerStyle = {},
  customInputStyle = {},
  showLabelIcon = false,
  multiline = false,
  onPressIcon = () => {}
}) => {
  return (
    <View style={{ ...styles.container, ...customContainerStyle }}>
      <View style={styles.labelContainer}>
        <Text style={styles.placeHolder}>{inputLabel}</Text>
        <View>
          {showLabelIcon ? (
            <TouchableOpacity onPress={onPressIcon}>
              <QuestionIcon height={16} width={16} />
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
      </View>
      <TextInput
        placeholder={placeHolder}
        style={{ ...styles.input, ...customInputStyle }}
        value={value}
        onChangeText={setValue}
        multiline={multiline}
      />
    </View>
  )
}
