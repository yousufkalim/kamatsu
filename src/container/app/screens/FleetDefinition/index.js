import { View, Text } from "react-native"
import React, { useState } from "react"

import { Header } from "../../../../components/Header"
import { Layout } from "../../../../components/Layout"
import { Input } from "../../../../components/Input"
import { Select } from "../../../../components/Select"
import { Button } from "../../../../components/Button"
import { styles } from "./styles"

const LOADING_TOOL = [
  {
    label: "HM300",
    CapacityTons: 30.9,
    CostPerHr: 46.52
  },
  {
    label: "HM400",
    CapacityTons: 44.1,
    CostPerHr: 62.95
  },
  {
    label: "HD325",
    CapacityTons: 40.3,
    CostPerHr: 64.55
  },
  {
    label: "HD405",
    CapacityTons: 44.1,
    CostPerHr: 65.98
  },
  {
    label: "HD465",
    CapacityTons: 61,
    CostPerHr: 87.9
  },
  {
    label: "HD605",
    CapacityTons: 69.4,
    CostPerHr: 87.85
  },
  {
    label: "HD785",
    CapacityTons: 102,
    CostPerHr: 178
  },
  {
    label: "HD1500",
    CapacityTons: 156,
    CostPerHr: 226
  },
  {
    label: "730E",
    CapacityTons: 200,
    CostPerHr: 306
  },
  {
    label: "830E",
    CapacityTons: 244,
    CostPerHr: 368
  },
  {
    label: "930E",
    CapacityTons: 320,
    CostPerHr: 415
  },
  {
    label: "960E",
    CapacityTons: 360,
    CostPerHr: 464
  },
  {
    label: "980E",
    CapacityTons: 407,
    CostPerHr: 517
  }
]

const FleetDefinition = ({ navigation }) => {
  const [unit, setUnit] = useState(null)

  const units = [
    { label: "Metric", value: "Metric" },
    { label: "US Customary", value: "US Customary" }
  ]

  const handleNext = () => {
    navigation.navigate("SiteParameters")
  }

  return (
    <Layout>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Fleet Definition</Text>
        <Select
          label="Unit Selection"
          items={units}
          selected={unit}
          setSelected={setUnit}
          showDefault={true}
        />
        <View style={styles.inputGroup}>
          <Select
            label="Loading Tool"
            items={units}
            selected={unit}
            setSelected={setUnit}
            showDefault={true}
          />

          <Input placeHolder="Cycle Time (Sec)" />
        </View>
        <View style={styles.inputGroup}>
          <Input placeHolder="Bucket Fill (%)" />
          <Input placeHolder="Bucket Size (m)" />
        </View>

        <View style={styles.btnSpacer}>
          <Button btnText="Reset Loader" />
        </View>

        {/* <View style={styles.inputGroup}> */}
        <Select
          label="Loading Tool"
          items={LOADING_TOOL}
          selected={unit}
          setSelected={setUnit}
          showDefault={true}
        />
        <Input placeHolder="Nom. Payload (Tons)" />
        {/* </View> */}

        <View style={styles.btnSpacer}>
          <Button btnText="Reset Truck" />
        </View>

        <View style={styles.btnSpacer}>
          <Button btnText="Next" isPrimary onPress={handleNext} />
        </View>
      </View>
    </Layout>
  )
}

export default FleetDefinition
