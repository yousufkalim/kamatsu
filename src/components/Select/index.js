import React, { useState } from "react"
import { Text, View } from "react-native"
import EIcon from "react-native-vector-icons/Entypo"
import { Dropdown } from "react-native-element-dropdown"

import { styles } from "./styles"

export const Select = ({
  label = "label",
  placeholder = "Select",
  items = [],
  selected,
  labelName,
  valueName,
  handleChange
}) => {
  const [isFocus, setIsFocus] = useState(false)

  return (
    <View style={{ ...styles.container }}>
      <Text style={styles.label}>{label}</Text>
      <Dropdown
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        selectedStyle={{ backgroundColor: "red" }}
        containerStyle={{}}
        iconStyle={styles.iconStyle}
        data={items}
        maxHeight={250}
        placeholder={placeholder}
        labelField={[labelName]}
        valueField={[valueName]}
        renderItem={item => (
          <View
            style={[
              styles.item,
              selected?.[valueName] === item?.[labelName] && styles.itemActive
            ]}
          >
            <Text style={styles.itemLabel}>{item?.[labelName]}</Text>
          </View>
        )}
        value={selected?.[valueName]}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          handleChange(item)
          setIsFocus(false)
        }}
        renderRightIcon={() => (
          <>
            {isFocus ? (
              <EIcon name="chevron-thin-up" size={16} style={styles.icon} />
            ) : (
              <EIcon name="chevron-thin-down" size={16} style={styles.icon} />
            )}
          </>
        )}
      />
    </View>
  )
}
