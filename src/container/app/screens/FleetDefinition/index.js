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
import { validateInputNumber } from "../../../../utils/validateInput"
import { useIsMount } from "../../../../hooks/useIsMount"

import { styles } from "./styles"

const FleetDefinition = ({ navigation }) => {
  const dispatch = useDispatch()
  const isMount = useIsMount()

  const unitStateValue = useSelector(state => state?.unitState?.unitFleet)

  const [unit, setUnit] = useState(unitStateValue)
  const [selectedLoadingTool, setSelectedLoadingTool] = useState({})
  const [selectedHaulingTool, setSelectedHaulingTool] = useState({})
  const [haulingTools, setHaulingTools] = useState([])
  const [cycleTime, setCycleTime] = useState("")
  const [bucketSize, setBucketSize] = useState("")
  const [bucketSizeUSMetric, setBucketSizeUSMetric] = useState("")
  const [bucketFill, setBucketFill] = useState("")
  const [payload, setPayload] = useState("")
  const [payloadUSMetric, setPayloadUSMetric] = useState({})

  const [cycleTimeErr, setCycleTimeErr] = useState("")
  const [bucketSizeErr, setBucketSizeErr] = useState("")
  const [bucketFillErr, setBucketFillErr] = useState("")
  const [payloadErr, setPayloadErr] = useState("")

  const { loadingTools, isLoading } = useGetLoadingTool()
  const { verifyFleetDefinition, isVerifying } = useVerifyFleetDefinition()

  const units = [
    { label: "Metric", value: "Metric" },
    { label: "US Customary", value: "US Customary" }
  ]

  const handleNext = async () => {
    if (!validateInputNumber(cycleTime)) {
      setCycleTimeErr("Invalid cycle time")
      return
    }
    setCycleTimeErr("")

    if (!validateInputNumber(bucketSize)) {
      setBucketSizeErr("Invalid bucket size")
      return
    }
    setBucketSizeErr("")

    if (!validateInputNumber(bucketFill)) {
      setBucketFillErr("Invalid bucket fill")
      return
    }
    setBucketFillErr("")

    if (!validateInputNumber(payload)) {
      setPayloadErr("Invalid nom. payload")
      return
    }
    setPayloadErr("")

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
  }, [unitStateValue?.value])

  const handleloadingToolsChange = (value, reset = false) => {
    setHaulingTools(value?.compatible_trucks)
    setCycleTime(Number(value?.cycle_time_second).toFixed(1))
    setBucketFill(Number(value?.bucket_fill).toFixed(1))

    //check if user has manually inputed bucket size
    if (
      bucketSizeUSMetric?.metric &&
      !reset &&
      value?.name == bucketSizeUSMetric?.loadingTool //check if loadingTool has changed
    ) {
      // if true setBucketSize "bucketSizeUSMetric".metric or us
      if (unitStateValue?.value === "Metric") {
        setBucketSize(bucketSizeUSMetric.metric)
      } else {
        setBucketSize(bucketSizeUSMetric.us)
      }
    } else {
      // else setBucketSize to default selected value
      unitStateValue?.value === "Metric"
        ? setBucketSize(
            Number(value?.metric_standard?.bucket_size_m3).toFixed(1)
          )
        : setBucketSize(Number(value?.bucket_size_yd3).toFixed(1))
    }

    console.log("value", value)
    if (!reset) {
      setSelectedHaulingTool({})
      setPayload("")
    }
    setSelectedLoadingTool(value)
    setBucketSizeUSMetric({})
  }

  const handleHaulingToolsChange = (value, reset = false) => {
    //check if user has manually inputed Num payload
    if (
      payloadUSMetric?.metric &&
      !reset &&
      value?.name === payloadUSMetric?.haulingTool //check if hauling tool has changed
    ) {
      console.log("payloadUSMetric value ", value)

      // if true setPayload "payloadUSMetric".metric or us
      if (unitStateValue?.value === "Metric") {
        setPayload(payloadUSMetric.metric)
      } else {
        setPayload(payloadUSMetric.us)
      }
    } else {
      // else setBucketSize to default selected value
      console.log("default value ", value)

      unitStateValue?.value === "Metric"
        ? setPayload(Number(value?.metric_standard?.capacity_tonne).toFixed(1))
        : setPayload(Number(value?.capacity_ton).toFixed(1))

      setPayloadUSMetric({})
    }

    setSelectedHaulingTool(value)
  }

  const resetTruck = () => {
    if (selectedHaulingTool?.name) {
      handleHaulingToolsChange(selectedHaulingTool, true)
    }
  }

  const resetLoader = () => {
    if (selectedLoadingTool?.name) {
      handleloadingToolsChange(selectedLoadingTool, true)
    }
  }

  const handleChangeBucketSizeUSMetric = bucketSize => {
    // Cubic Meters to Cubic Yards formula
    //  Cubic Yards = Cubic Meters * 1.308

    if (unitStateValue?.value === "Metric") {
      console.log("bucketSize", bucketSize)

      const cubicY3 = (parseFloat(bucketSize) * 1.308).toFixed(1)
      console.log("cubicY3", cubicY3)

      setBucketSizeUSMetric({
        metric: bucketSize,
        us: cubicY3.toString(),
        loadingTool: selectedLoadingTool.name // to keep loadingTool changes
      })
    } else {
      const cubicM3 = (parseFloat(bucketSize) / 1.308).toFixed(1)
      console.log("cubicM3", cubicM3)

      setBucketSizeUSMetric({
        us: bucketSize,
        metric: cubicM3.toString(),
        loadingTool: selectedLoadingTool.name // to keep loadingTool changes
      })
    }
  }

  const handleChangeNumPayloadUSMetric = payload => {
    // Metric Tons (Tonnes) to Tons Conversion formula
    // tons = metric tons × 1.102311

    if (unitStateValue?.value === "Metric") {
      console.log("payload", payload)
      const tons = (parseFloat(payload) * 1.102311).toFixed(1)
      console.log("tons", tons)
      setPayloadUSMetric({
        metric: payload,
        us: tons.toString(),
        haulingTool: selectedHaulingTool.name // to keeploadingTool change
      })
    } else {
      const metric_tons = (parseFloat(payload) / 1.102311).toFixed(1)
      console.log("metric_tons", metric_tons)
      setPayloadUSMetric({
        us: payload,
        metric: metric_tons.toString(),
        haulingTool: selectedHaulingTool.name // to keep hauling tool change
      })
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

  const handleChangeInputFloatBucketSize = (value, setValue) => {
    var res = value.split(".")

    if (res.length > 1 && res[1]) {
      setValue(Number(value).toFixed(1))

      handleChangeBucketSizeUSMetric(Number(value).toFixed(1))
    } else {
      setValue(value)
      handleChangeBucketSizeUSMetric(value)
    }
  }

  const handleChangeInputFloatNumPayload = (value, setValue) => {
    var res = value.split(".")

    if (res.length > 1 && res[1]) {
      setValue(Number(value).toFixed(1))

      handleChangeNumPayloadUSMetric(Number(value).toFixed(1))
    } else {
      setValue(value)
      handleChangeNumPayloadUSMetric(value)
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
            errorMessage={cycleTimeErr}
          />
        </View>
        <View style={styles.inputGroup}>
          <Input
            inputLabel="Bucket Fill (%)"
            value={bucketFill}
            setValue={value => handleChangeInputFloat(value, setBucketFill)}
            errorMessage={bucketFillErr}
          />
          <Input
            inputLabel={`Bucket Size ${
              unitStateValue?.value === "Metric" ? `(m\u00B3)` : `(yd\u00B3)`
            }`}
            value={bucketSize}
            setValue={value =>
              handleChangeInputFloatBucketSize(value, setBucketSize)
            }
            errorMessage={bucketSizeErr}
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
              unitStateValue?.value === "Metric" ? "(tonnes)" : "(tons)"
            }`}
            value={payload}
            setValue={value =>
              handleChangeInputFloatNumPayload(value, setPayload)
            }
            errorMessage={payloadErr}
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
