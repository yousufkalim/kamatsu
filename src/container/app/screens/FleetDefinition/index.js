import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

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

  const unitStateValue = useSelector(state => state?.unitState?.unit)

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
  }

  useEffect(() => {
    if (selectedLoadingTool?.name) {
      handleloadingToolsChange(selectedLoadingTool)
    }

    if (selectedHaulingTool?.name) {
      handleHaulingToolsChange(selectedHaulingTool)
    }
  }, [unitStateValue])

  const handleloadingToolsChange = value => {
    setSelectedLoadingTool(value)
    setHaulingTools(value?.compatible_trucks)
    setCycleTime(Number(value?.cycle_time_second).toFixed(1))
    setBucketFill(Number(value?.bucket_fill).toFixed(1))

    unitStateValue?.value === "Metric"
      ? setBucketSize(Number(value?.metric_standard?.bucket_size_m3).toFixed(1))
      : setBucketSize(Number(value?.bucket_size_yd3).toFixed(1))
    setSelectedHaulingTool({})
    setPayload("")
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
      handleloadingToolsChange(selectedLoadingTool)
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
            inputLabel="Bucket Size"
            symbol={
              unitStateValue?.value === "Metric" ? `(m\u00B3)` : `(yd\u00B3)`
            }
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
            inputLabel="Nom. Payload"
            symbol={unitStateValue?.value === "Metric" ? `(tonnes)` : `(tons)`}
            value={payload}
            setValue={value => handleChangeInputFloat(value, setPayload)}
          />
        </View>
        <View style={styles.btnSpacer}>
          <Button btnText="Reset Truck" onPress={resetTruck} />
        </View>

        <View style={styles.nextBtn} />
        <Button btnText="Next" isPrimary onPress={handleNext} />
      </KeyboardAwareScrollView>
    </Layout>
  )
}

export default FleetDefinition
