import { View, Text } from "react-native"
import React, { useState } from "react"

import { Layout } from "../../../../components/Layout"
import { Header } from "../../../../components/Header"
import { Select } from "../../../../components/Select"
import { Input } from "../../../../components/Input"
import { Button } from "../../../../components/Button"
import Modal from "../../../../components/Modal"
import { MaterialDensity } from "../../../../components/MaterialDensity"
import { styles } from "./styles"

const SiteParameters = ({ navigation }) => {
  const [unit, setUnit] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  const units = [
    { label: "Metric", value: "Metric" },
    { label: "US Customary", value: "US Customary" }
  ]

  const handleNext = () => {
    navigation.navigate("Results")
  }

  return (
    <Layout>
      <Header showBack />
      <View style={styles.container}>
        <Text style={styles.title}>Site Parameters</Text>

        <Select
          label="Unit Selection"
          items={units}
          selected={unit}
          setSelected={setUnit}
          showDefault={true}
          labelName="label"
        />

        <View style={styles.inputGroup}>
          <Input
            placeHolder="Material Density (lbs/lcy)"
            showLabelIcon
            onPressIcon={() => setModalVisible(true)}
          />
          <Input placeHolder="Material Swell (%)" />
        </View>

        <View style={styles.inputGroup}>
          <Input
            placeHolder="Operator Efficiency (min/hr)"
            inputLabel="Operator Efficiency (min/hr)"
          />
          <Input
            placeHolder="Truck Spot Time (sec)"
            inputLabel="Truck Spot Time (sec)"
          />
        </View>
        <Text style={styles.roundTripTxt}>Est. Round Trip</Text>
        <View style={styles.inputGroup}>
          <Input
            placeHolder="Travel Time (min)"
            inputLabel="Travel Time (min)"
          />
          <Button btnText="Default" halfWidthBtn />
        </View>

        <View style={styles.nextBtn} />

        <Button btnText="Next" isPrimary onPress={handleNext} />

        <Modal
          modalVisible={modalVisible}
          style={styles.modal}
          setModalVisible={setModalVisible}
          title="Material Density"
        >
          <MaterialDensity />
        </Modal>
      </View>
    </Layout>
  )
}

export default SiteParameters
