import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import {
  useGetLoadingTool,
  useVerifyFleetDefinition
} from "../../../../hooks/query/useFleet"
import { setUnitFleetAction } from "../../redux/unit/actions"
import { setFleetValuesAction } from "../../redux/fleetDefinition/actions"
import { setUnitSiteAction } from "../../redux/unit/actions"
import { Header } from "../../../../components/Header"
import { Layout } from "../../../../components/Layout"
import { Input } from "../../../../components/Input"
import { Select } from "../../../../components/Select"
import { Button } from "../../../../components/Button"

import { styles } from "./styles"

const FleetDefinition = ({ navigation }) => {
  const dispatch = useDispatch()

  const unitStateValue = useSelector(state => state?.unitState?.unitFleet)

  const [unit, setUnit] = useState(unitStateValue)
  const [selectedLoadingTool, setSelectedLoadingTool] = useState({})
  const [selectedHaulingTool, setSelectedHaulingTool] = useState({})
  const [haulingTools, setHaulingTools] = useState([])
  const [cycleTime, setCycleTime] = useState("")
  const [bucketSize, setBucketSize] = useState("")
  const [bucketFill, setBucketFill] = useState("")
  const [payload, setPayload] = useState("")

  const { loadingTools, isLoading } = useGetLoadingTool()
  const { verifyFleetDefinition, isVerifying, isSuccess } =
    useVerifyFleetDefinition()

  const units = [
    { label: "Metric", value: "Metric" },
    { label: "US Customary", value: "US Customary" }
  ]

  const handleNext = async () => {
    console.log("selectedLoadingTool", selectedLoadingTool)
    console.log("unitStateValue", unitStateValue)
    const values = {
      unit_selection: unitStateValue?.value === "Metric" ? "metric" : "us",
      loading_tool: {
        name: selectedLoadingTool?.name,
        cycle_time_second: parseFloat(cycleTime),
        bucket_fill: parseFloat(bucketFill),
        bucket_size: parseFloat(bucketSize),
        cost_per_hour: parseFloat(selectedLoadingTool?.cost_per_hour)
      },
      hauling_tool: {
        name: selectedHaulingTool?.name,
        capacity_ton: parseFloat(payload),
        cost_per_hour: parseFloat(selectedHaulingTool?.cost_per_hour)
      }
    }

    console.log("values", values)

    dispatch(setFleetValuesAction(values))
    try {
      await verifyFleetDefinition(values)

      navigation.navigate("SiteParameters")
    } catch (error) {
      console.log("err", error)
    }
  }

  const handleUnitChange = value => {
    dispatch(setUnitFleetAction(value))
    dispatch(setUnitSiteAction(value))
    setUnit(value)
  }

  useEffect(() => {
    if (selectedLoadingTool?.name) {
      handleloadingToolsChange(selectedLoadingTool)
    }

    if (selectedHaulingTool?.name) {
      handleHaulingToolsChange(selectedHaulingTool)
    }
  }, [unitStateValue])

  const handleloadingToolsChange = (value, reset = false) => {
    setSelectedLoadingTool(value)
    setHaulingTools(value?.compatible_trucks)
    setCycleTime(Number(value?.cycle_time_second).toFixed(1))
    setBucketFill(Number(value?.bucket_fill).toFixed(1))

    unitStateValue?.value === "Metric"
      ? setBucketSize(Number(value?.metric_standard?.bucket_size_m3).toFixed(1))
      : setBucketSize(Number(value?.bucket_size_yd3).toFixed(1))

    if (!reset) {
      setSelectedHaulingTool({})
      setPayload("")
    }
  }

  const handleHaulingToolsChange = value => {
    setSelectedHaulingTool(value)
    unitStateValue?.value === "Metric"
      ? setPayload(Number(value?.metric_standard?.capacity_tonne).toFixed(1))
      : setPayload(Number(value?.capacity_ton).toFixed(1))
  }

  const resetTruck = () => {
    if (selectedHaulingTool?.name) {
      handleHaulingToolsChange(selectedHaulingTool)
    }
  }

  const resetLoader = () => {
    if (selectedLoadingTool?.name) {
      handleloadingToolsChange(selectedLoadingTool, true)
    }
  }

  const handleChangeInputFloat = (value, setValue) => {
    var res = value.split(".")

    if (res.length > 1 && res[1]) {
      setValue(Number(value).toFixed(1))
    } else {
      setValue(value)
    }
  }

  return (
    <Layout>
      <Header />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1 }}
        style={styles.container}
      >
        <Text style={styles.title}>Fleet Definition</Text>

        <Select
          label="Unit Selection"
          items={units}
          handleChange={handleUnitChange}
          selected={unit}
          showDefault={true}
          labelName="label"
          valueName="value"
        />

        <View style={styles.inputGroup}>
          <Select
            label="Loading Tool"
            items={loadingTools}
            selected={selectedLoadingTool}
            setSelected={setSelectedLoadingTool}
            handleChange={handleloadingToolsChange}
            labelName="name"
            valueName="name"
          />
          <Input
            inputLabel="Cycle Time (Sec) "
            value={cycleTime}
            setValue={value => handleChangeInputFloat(value, setCycleTime)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Input
            inputLabel="Bucket Fill (%)"
            value={bucketFill}
            setValue={value => handleChangeInputFloat(value, setBucketFill)}
          />
          <Input
            inputLabel={`Bucket Size ${
              unitStateValue?.value === "Metric" ? `(m\u00B3)` : `(yd\u00B3)`
            }`}
            value={bucketSize}
            setValue={value => handleChangeInputFloat(value, setBucketSize)}
          />
        </View>

        <View style={styles.btnSpacer}>
          <Button btnText="Reset Loader" onPress={resetLoader} />
        </View>

        <View style={styles.inputGroup}>
          <Select
            label="Hauling Tool"
            items={haulingTools}
            selected={selectedHaulingTool}
            handleChange={handleHaulingToolsChange}
            labelName="name"
            valueName="name"
          />
          <Input
            inputLabel={`Nom. Payload ${
              unitStateValue?.value === "Metric" ? "(Tonnes)" : "(Tons)"
            }`}
            value={payload}
            setValue={value => handleChangeInputFloat(value, setPayload)}
          />
        </View>
        <View style={styles.btnSpacer}>
          <Button btnText="Reset Truck" onPress={resetTruck} />
        </View>

        <View style={styles.nextBtn} />
        <Button
          btnText="Next"
          isPrimary
          onPress={handleNext}
          isLoading={isVerifying}
        />
      </KeyboardAwareScrollView>
    </Layout>
  )
}

export default FleetDefinition
