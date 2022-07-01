import React from "react"
import { Text, View, TextInput, TouchableOpacity } from "react-native"

import QuestionIcon from "../../assets/svg/question.svg"
import { styles } from "./styles"

export const Input = ({
  placeHolder = "",
  inputLabel = "Label",
  symbol = null,
  value,
  setValue,
  customContainerStyle = {},
  customInputStyle = {},
  showLabelIcon = false,
  multiline = false,
  onPressIcon = () => {},
  errorMessage = ""
}) => {
  return (
    <View style={{ ...styles.container, ...customContainerStyle }}>
      <View style={styles.labelContainer}>
        <Text style={styles.placeHolder}>{inputLabel}</Text>
        {symbol && <Text style={styles.labelIcon}>{symbol}</Text>}
        <View style={styles.labelIcon}>
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
        placeholderTextColor="#A5ABAF"
        style={[styles.input, customInputStyle && customInputStyle]}
        value={value}
        onChangeText={setValue}
        multiline={multiline}
      />

      {errorMessage.length > 0 && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
    </View>
  )
}
