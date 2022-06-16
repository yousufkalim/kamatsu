import { View, Text } from "react-native"
import React, { useState } from "react"
import { useSelector } from "react-redux"

import { Layout } from "../../../../components/Layout"
import { Header } from "../../../../components/Header"
import { Select } from "../../../../components/Select"
import { Input } from "../../../../components/Input"
import { Button } from "../../../../components/Button"
import Modal from "../../../../components/Modal"
import { MaterialDensity } from "../../../../components/MaterialDensity"
import { styles } from "./styles"

const SiteParameters = ({ navigation }) => {
  const unitStateValue = useSelector(state => state.unitState.unit)

  const [unit, setUnit] = useState(unitStateValue)
  const [materialDensity, setMaterialDensity] = useState("3000")
  const [materialSwell, setMaterialSwell] = useState("20")
  const [operatorEfficiency, setOperatorEfficiency] = useState("50")
  const [truckSpotTime, setTruckSpotTime] = useState("15")
  const [roundTripTravelTime, setRoundTripTravelTime] = useState("10")
  const [modalVisible, setModalVisible] = useState(false)

  const units = [
    { label: "Metric", value: "Metric" },
    { label: "US Customary", value: "US Customary" }
  ]

  const handleNext = () => {
    navigation.navigate("Results")
  }

  const loadDefaults = () => {
    setMaterialDensity("3000")
    setMaterialSwell("20")
    setOperatorEfficiency("50")
    setTruckSpotTime("15")
    setRoundTripTravelTime("10")
  }

  // Material Density: 3,000 lbs/lcy, Material Swell: 20%,
  // Operator Efficiency: 50 min/hr,
  // Truck Spot Time: 15 sec, Est. Round Trip Travel Time: 10 min

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
            placeHolder="Material Density"
            inputLabel="Material Density"
            showLabelIcon
            onPressIcon={() => setModalVisible(true)}
            value={materialDensity}
            setValue={setMaterialDensity}
            symbol={
              unitStateValue?.value === "Metric" ? "(kg/lcm)" : "(lbs/lcy)"
            }
          />
          <Input
            placeHolder="Material Swell (%)"
            inputLabel="Material Swell (%)"
            value={materialSwell}
            setValue={setMaterialSwell}
          />
        </View>

        <View style={styles.inputGroup}>
          <Input
            placeHolder="Operator Efficiency (min/hr)"
            inputLabel="Operator Efficiency (min/hr)"
            setValue={setOperatorEfficiency}
            value={operatorEfficiency}
          />
          <Input
            placeHolder="Truck Spot Time (sec)"
            inputLabel="Truck Spot Time (sec)"
            setValue={setTruckSpotTime}
            value={truckSpotTime}
          />
        </View>
        <Text style={styles.roundTripTxt}>Est. Round Trip</Text>
        <View style={styles.inputGroup}>
          <Input
            placeHolder="Travel Time (min)"
            inputLabel="Travel Time (min)"
            setValue={setRoundTripTravelTime}
            value={roundTripTravelTime}
          />
          <Button btnText="Default" halfWidthBtn onPress={loadDefaults} />
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
