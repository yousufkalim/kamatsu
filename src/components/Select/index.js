import React, { useEffect, useState } from "react"
import { Text, View, TouchableOpacity } from "react-native"
import EIcon from "react-native-vector-icons/Entypo"

import { styles } from "./styles"

export const Select = ({
  label = "place holder",
  items = [],
  selected,
  setSelected,
  showDefault = false
}) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (showDefault && items.length > 0) {
      setSelected(items[0])
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.input}>
        <TouchableOpacity
          onPress={() => setShow(!show)}
          style={styles.placeHolder}
        >
          <Text style={styles.placeHolderText}>{selected?.label}</Text>
          {show ? (
            <EIcon name="chevron-thin-up" size={16} style={styles.icon} />
          ) : (
            <EIcon name="chevron-thin-down" size={16} style={styles.icon} />
          )}
        </TouchableOpacity>

        {show && (
          <View style={styles.dropdown}>
            {items.map(item => (
              <TouchableOpacity
                key={item.label}
                style={
                  selected?.value === item.value
                    ? { ...styles.item, ...styles.itemActive }
                    : { ...styles.item }
                }
                onPress={() => {
                  setSelected(item)
                  setShow(false)
                }}
              >
                <Text style={styles.itemLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </TouchableOpacity>
    </View>
  )
}
