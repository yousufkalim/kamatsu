import React, { useEffect, useState } from "react"
import { Text, View, TouchableOpacity, ScrollView } from "react-native"
import EIcon from "react-native-vector-icons/Entypo"

import { styles } from "./styles"

export const Select = ({
  label = "place holder",
  items = [],
  selected,
  labelName,
  valueName,
  setSelected,
  showDefault = false,
  customStyle = {}
}) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (showDefault && items.length > 0) {
      setSelected(items[0])
    }
  }, [])

  return (
    <View style={{ ...styles.container, ...customStyle }}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.input}>
        <TouchableOpacity
          onPress={() => setShow(!show)}
          style={styles.placeHolder}
        >
          <Text style={styles.placeHolderText}>{selected?.[labelName]}</Text>
          {show ? (
            <EIcon name="chevron-thin-up" size={16} style={styles.icon} />
          ) : (
            <EIcon name="chevron-thin-down" size={16} style={styles.icon} />
          )}
        </TouchableOpacity>

        {show && (
          <ScrollView
            style={styles.dropdown}
            scrollIndicatorInsets={{ right: 2 }}
          >
            {items.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={
                  selected?.[labelName] === item?.[labelName]
                    ? { ...styles.item, ...styles.itemActive }
                    : { ...styles.item }
                }
                onPress={() => {
                  setSelected(item)
                  setShow(false)
                }}
              >
                <Text style={styles.itemLabel}>{item?.[labelName]}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </TouchableOpacity>
    </View>
  )
}
