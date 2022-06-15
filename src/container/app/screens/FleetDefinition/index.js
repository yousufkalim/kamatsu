import { View, Text } from "react-native"
import React, { useState } from "react"

import { Header } from "../../../../components/Header"
import { Layout } from "../../../../components/Layout"
import { Input } from "../../../../components/Input"
import { Select } from "../../../../components/Select"
import { Button } from "../../../../components/Button"
import {
  useGetHaulingTool,
  useGetLoadingTool
} from "../../../../hooks/query/useFleet"
import { styles } from "./styles"

const FleetDefinition = ({ navigation }) => {
  const [unit, setUnit] = useState(null)
  const [cycleTime, setCycleTime] = useState("")
  const [loadingTool, setLoadingTool] = useState("")
  const [haulingTool, setHaulingTool] = useState("")

  const { loadingTools, isLoading } = useGetLoadingTool()
  const { haulingTools } = useGetHaulingTool()

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
          labelName="label"
          customStyle={{ zIndex: 20 }}
        />

        <View style={{ ...styles.inputGroup, zIndex: 19 }}>
          <Select
            label="Loading Tool"
            items={loadingTools}
            selected={loadingTool}
            setSelected={setLoadingTool}
            labelName="name"
            customStyle={{ zIndex: 18 }}
          />

          <Input
            placeHolder="Cycle Time (Sec)"
            inputLabel="Cycle Time (Sec)"
            value={cycleTime}
            setValue={setCycleTime}
          />
        </View>
        <View style={styles.inputGroup}>
          <Input placeHolder="Bucket Fill (%)" inputLabel="Bucket Fill (%)" />
          <Input placeHolder="Bucket Size (m)" inputLabel="Bucket Size (m)" />
        </View>

        <View style={styles.btnSpacer}>
          <Button btnText="Reset Loader" />
        </View>

        <View style={{ ...styles.inputGroup, zIndex: 17 }}>
          <Select
            label="Hauling Tool"
            items={haulingTools}
            selected={haulingTool}
            setSelected={setHaulingTool}
            labelName="name"
          />
          <Input
            placeHolder="Nom. Payload (Tons)"
            inputLabel="Nom. Payload (Tons)"
          />
        </View>
        <View style={styles.btnSpacer}>
          <Button btnText="Reset Truck" />
        </View>

        <View style={styles.nextBtn} />
        <Button btnText="Next" isPrimary onPress={handleNext} />
      </View>
    </Layout>
  )
}

export default FleetDefinition
