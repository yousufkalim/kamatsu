import { Text, ScrollView, View } from "react-native"
import React from "react"
import { styles } from "./styles"

export const MaterialDensity = ({ materialDensities = [] }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.intro}>
        The following table references values for a variety of loose densities
        by material type. Reference values should be used for internal use only.
        Otherwise, verify density values directly with a customer.
      </Text>

      {materialDensities.map(item => (
        <View style={styles.itemContainer}>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.value}>Density</Text>
          <Text style={styles.value}>
            {item?.metric_standard?.density} kgs/lcm
          </Text>
          <Text style={styles.value}>{item?.density} lbs/lcy</Text>
        </View>
      ))}
    </ScrollView>
  )
}
