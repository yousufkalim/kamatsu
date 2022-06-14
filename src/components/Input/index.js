import React from "react"
import { Text, View, TextInput, TouchableOpacity } from "react-native"

import QuestionIcon from "../../assets/svg/question.svg"
import { styles } from "./styles"

export const Input = ({
  placeHolder = "Placeholder",
  value,
  setValue,
  customStyle = {},
  showLabelIcon = false,
  onPressIcon = () => {}
}) => {
  return (
    <View style={{ ...styles.container, ...customStyle }}>
      <View style={styles.labelContainer}>
        <Text style={styles.placeHolder}>{placeHolder}</Text>
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
        style={styles.input}
        value={value}
        onChangeText={setValue}
      />
    </View>
  )
}
