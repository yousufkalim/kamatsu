import { View, Text } from "react-native"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { useGetLoadingTool } from "../../../../hooks/query/useFleet"
import { Header } from "../../../../components/Header"
import { Layout } from "../../../../components/Layout"
import { Input } from "../../../../components/Input"
import { Select } from "../../../../components/Select"
import { Button } from "../../../../components/Button"
import { setUnitAction } from "../../redux/unit/actions"
import { styles } from "./styles"

const FleetDefinition = ({ navigation }) => {
  const dispatch = useDispatch()

  const unitStateValue = useSelector(state => state.unitState.unit)

  const [unit, setUnit] = useState(unitStateValue)
  const [selectedLoadingTool, setSelectedLoadingTool] = useState({})
  const [selectedHaulingTool, setSelectedHaulingTool] = useState({})
  const [haulingTools, setHaulingTools] = useState([])
  const [cycleTime, setCycleTime] = useState("")
  const [bucketSize, setBucketSize] = useState("")
  const [bucketFill, setBucketFill] = useState("")
  const [payload, setPayload] = useState("")
  const { loadingTools, isLoading } = useGetLoadingTool()

  const units = [
    { label: "Metric", value: "Metric" },
    { label: "US Customary", value: "US Customary" }
  ]

  const handleNext = () => {
    navigation.navigate("SiteParameters")
  }

  const handleUnitChange = value => {
    dispatch(setUnitAction(value))
    setUnit(value)

    if (selectedLoadingTool?.name) {
      handleloadingToolsChange(selectedLoadingTool)
    }

    if (selectedHaulingTool?.name) {
      handleHaulingToolsChange(selectedHaulingTool)
    }
  }

  const handleloadingToolsChange = value => {
    setSelectedLoadingTool(value)
    setHaulingTools(value?.compatible_trucks)
    setCycleTime(value?.cycle_time_second?.toString())
    setBucketFill(value?.bucket_fill)

    unitStateValue?.value === "Metric"
      ? setBucketSize(value?.metric_standard?.bucket_size_m3?.toString())
      : setBucketSize(value?.bucket_size_yd3?.toString())
  }

  const handleHaulingToolsChange = value => {
    setSelectedHaulingTool(value)
    unitStateValue?.value === "Metric"
      ? setPayload(value?.metric_standard?.capacity_tonne?.toString())
      : setPayload(value?.capacity_ton?.toString())
  }

  const resetTruck = () => {
    if (selectedHaulingTool?.name) {
      handleHaulingToolsChange(selectedHaulingTool)
    }
  }

  const resetLoader = () => {
    if (selectedLoadingTool?.name) {
      handleloadingToolsChange(selectedLoadingTool)
    }
  }

  return (
    <Layout>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Fleet Definition</Text>

        <Select
          label="Unit Selection"
          items={units}
          handleChange={handleUnitChange}
          selected={unit}
          showDefault={true}
          labelName="label"
          customStyle={{ zIndex: 20 }}
        />

        <View style={{ ...styles.inputGroup, zIndex: 19 }}>
          <Select
            label="Loading Tool"
            items={loadingTools}
            selected={selectedLoadingTool}
            setSelected={setSelectedLoadingTool}
            handleChange={handleloadingToolsChange}
            labelName="name"
            customStyle={{ zIndex: 18 }}
          />

          <Input
            placeHolder="Cycle Time (Sec)"
            inputLabel="Cycle Time (Sec) "
            value={cycleTime}
            setValue={setCycleTime}
          />
        </View>
        <View style={styles.inputGroup}>
          <Input
            placeHolder="Bucket Fill (%) "
            inputLabel="Bucket Fill (%)"
            value={bucketFill}
            setValue={setBucketFill}
          />
          <Input
            placeHolder="Bucket Size (&#13221;)"
            inputLabel="Bucket Size"
            symbol={
              unitStateValue?.value === "Metric" ? `(m\u00B3)` : `(yd\u00B3)`
            }
            value={bucketSize}
            setValue={setBucketSize}
          />
        </View>

        <View style={styles.btnSpacer}>
          <Button btnText="Reset Loader" onPress={resetLoader} />
        </View>

        <View style={{ ...styles.inputGroup, zIndex: 17 }}>
          <Select
            label="Hauling Tool"
            items={haulingTools}
            selected={selectedHaulingTool}
            handleChange={handleHaulingToolsChange}
            labelName="name"
          />
          <Input
            placeHolder="Nom. Payload (Tons)"
            inputLabel="Nom. Payload"
            symbol={unitStateValue?.value === "Metric" ? `(tonnes)` : `(tons)`}
            value={payload}
            setValue={setPayload}
          />
        </View>
        <View style={styles.btnSpacer}>
          <Button btnText="Reset Truck" onPress={resetTruck} />
        </View>

        <View style={styles.nextBtn} />
        <Button btnText="Next" isPrimary onPress={handleNext} />
      </View>
    </Layout>
  )
}

export default FleetDefinition
