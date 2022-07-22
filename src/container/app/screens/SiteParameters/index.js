import { View, Text } from "react-native"
import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import {
  useGetMaterialDensities,
  useVerifySiteParameters
} from "../../../../hooks/query/useSiteParameter"
import {
  setSiteValuesAction,
  saveSiteInitialValues
} from "../../redux/site/actions"
import { Layout } from "../../../../components/Layout"
import { Header } from "../../../../components/Header"
import { Select } from "../../../../components/Select"
import { Input } from "../../../../components/Input"
import { Button } from "../../../../components/Button"
import Modal from "../../../../components/Modal"
import { setUnitSiteAction } from "../../redux/unit/actions"
import { MaterialDensity } from "../../../../components/MaterialDensity"
import { useIsMount } from "../../../../hooks/useIsMount"
import { validateInputNumber } from "../../../../utils/validateInput"
import { styles } from "./styles"

const SiteParameters = ({ navigation }) => {
  const dispatch = useDispatch()
  const isMount = useIsMount()

  const unitStateValue = useSelector(state => state.unitState.unitSite)
  const siteParameterState = useSelector(state => state.siteParameterState)

  const { materialDensities, isLoading } = useGetMaterialDensities()
  const { verifySiteParameters, isVerifying, isSuccess } =
    useVerifySiteParameters()

  const [unit, setUnit] = useState(unitStateValue)
  const [materialDensity, setMaterialDensity] = useState(
    unitStateValue?.value === "Metric"
      ? siteParameterState.materialDensity.metric
      : siteParameterState.materialDensity.us
  )
  const [materialDensityUSMetric, setMaterialDensityUSMetric] = useState({})
  const [materialSwell, setMaterialSwell] = useState(
    siteParameterState.materialSwell
  )
  const [operatorEfficiency, setOperatorEfficiency] = useState(
    siteParameterState.operatorEfficiency
  )
  const [truckSpotTime, setTruckSpotTime] = useState(
    siteParameterState.truckSpotTime
  )
  const [roundTripTravelTime, setRoundTripTravelTime] = useState(
    siteParameterState.roundTripTravelTime
  )

  const [materialDensityErr, setMaterialDensityErr] = useState("")
  const [materialSwellErr, setMaterialSwellErr] = useState("")
  const [operatorEfficiencyErr, setOperatorEfficiencyErr] = useState("")
  const [truckSpotTimeErr, setTruckSpotTimeErr] = useState("")
  const [roundTripTravelTimeErr, setRoundTripTravelTimeErr] = useState("")

  const [modalVisible, setModalVisible] = useState(false)

  const units = [
    { label: "Metric", value: "Metric" },
    { label: "US Customary", value: "US Customary" }
  ]

  const handleNext = async () => {
    if (!validateInputNumber(materialDensity)) {
      setMaterialDensityErr("Invalid material density")
      return
    }
    setMaterialDensityErr("")

    if (!validateInputNumber(materialSwell)) {
      setMaterialSwellErr("Invalid material swell")
      return
    }
    setMaterialSwellErr("")

    if (!validateInputNumber(operatorEfficiency)) {
      setOperatorEfficiencyErr("Invalid operator efficiency")
      return
    }
    setOperatorEfficiencyErr("")

    if (!validateInputNumber(truckSpotTime)) {
      setTruckSpotTimeErr("Invalid truck spot time")
      return
    }
    setTruckSpotTimeErr("")

    if (!validateInputNumber(roundTripTravelTime)) {
      setRoundTripTravelTimeErr("Invalid round trip travel time")
      return
    }
    setRoundTripTravelTimeErr("")

    const values = {
      unit_selection: unitStateValue?.value === "Metric" ? "metric" : "us",
      material_density: parseFloat(materialDensity),
      truck_sport_time_sec: parseFloat(truckSpotTime),
      est_round_trip_travel_time: parseFloat(roundTripTravelTime),
      operator_efficiency: parseFloat(operatorEfficiency),
      material_swell: parseFloat(materialSwell)
    }

    console.log("SiteParameters", values)
    dispatch(setSiteValuesAction(values))
    handleSaveMaterialDensity()

    try {
      await verifySiteParameters(values)

      navigation.navigate("Results")
    } catch (error) {
      console.log("err", error)
    }
  }

  const handleSaveMaterialDensity = () => {
    if (materialDensityUSMetric?.metric) {
      dispatch(
        saveSiteInitialValues({
          materialDensity: materialDensityUSMetric,
          operatorEfficiency: operatorEfficiency,
          materialSwell: materialSwell,
          truckSpotTime: truckSpotTime,
          roundTripTravelTime: roundTripTravelTime
        })
      )
    }
  }

  const handleUnitChange = value => {
    dispatch(setUnitSiteAction(value))
    setUnit(value)
  }

  useEffect(() => {
    if (materialDensity && !isMount) {
      convertMaterialDensityUnitValues()
    }
  }, [unitStateValue?.value])

  const convertMaterialDensityUnitValues = () => {
    if (materialDensityUSMetric?.metric) {
      setMaterialDensity(
        unitStateValue?.value === "Metric"
          ? materialDensityUSMetric?.metric
          : materialDensityUSMetric?.us
      )
    } else {
      setMaterialDensity(
        unitStateValue?.value === "Metric" ? "1779.8" : "3000.0"
      )
    }
  }

  const handleChangeMaterialDensityUSMetric = materialDensity => {
    // pound/cubic yard in 1 kg/m3 - 1.6855549391294.
    if (unitStateValue?.value === "Metric") {
      const convert = (parseFloat(materialDensity) * 1.6855549391294).toFixed(1)
      console.log("us", convert.toString())

      setMaterialDensityUSMetric({
        us: convert.toString(),
        metric: materialDensity
      })
    } else {
      const convert = (parseFloat(materialDensity) / 1.6855549391294).toFixed(1)
      console.log("Metric", convert.toString())

      setMaterialDensityUSMetric({
        metric: convert.toString(),
        us: materialDensity
      })
    }
  }

  const loadDefaults = () => {
    setMaterialDensity(unitStateValue?.value === "Metric" ? "1779.8" : "3000.0")
    setMaterialSwell("20")
    setOperatorEfficiency("50")
    setTruckSpotTime("15")
    setRoundTripTravelTime("10")
    setMaterialDensityUSMetric({})
  }

  const handleChangeInputFloat = (value, setValue) => {
    var res = value.split(".")

    if (res.length > 1 && res[1]) {
      setValue(Number(value).toFixed(1))
    } else {
      setValue(value)
    }
  }

  const handleChangeInputFloatMaterialDensity = (value, setValue) => {
    var res = value.split(".")

    if (res.length > 1 && res[1]) {
      setValue(Number(value).toFixed(1))

      handleChangeMaterialDensityUSMetric(Number(value).toFixed(1))
    } else {
      setValue(value)
      console.log("value", value)
      handleChangeMaterialDensityUSMetric(value)
    }
  }

  return (
    <Layout>
      <Header showBack />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1 }}
        style={styles.container}
      >
        <Text style={styles.title}>Site Parameters</Text>

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
          <Input
            inputLabel="Material Density"
            showLabelIcon
            onPressIcon={() => setModalVisible(true)}
            value={materialDensity}
            setValue={value =>
              handleChangeInputFloatMaterialDensity(value, setMaterialDensity)
            }
            symbol={
              unitStateValue?.value === "Metric" ? "(kg/lcm)" : "(lbs/lcy)"
            }
            errorMessage={materialDensityErr}
          />
          <Input
            inputLabel="Material Swell (%)"
            value={materialSwell}
            setValue={value => handleChangeInputFloat(value, setMaterialSwell)}
            errorMessage={materialSwellErr}
          />
        </View>

        <View style={styles.inputGroup}>
          <Input
            inputLabel="Operator Efficiency (min/hr)"
            setValue={value =>
              handleChangeInputFloat(value, setOperatorEfficiency)
            }
            value={operatorEfficiency}
            errorMessage={operatorEfficiencyErr}
          />
          <Input
            inputLabel="Truck Spot Time (sec)"
            setValue={value => handleChangeInputFloat(value, setTruckSpotTime)}
            value={truckSpotTime}
            errorMessage={truckSpotTimeErr}
          />
        </View>
        <Text style={{ ...styles.roundTripTxt, marginBottom: -10 }}>
          Est. Round Trip
        </Text>
        <View style={styles.inputGroup}>
          <Input
            inputLabel="Travel Time (min)"
            setValue={value =>
              handleChangeInputFloat(value, setRoundTripTravelTime)
            }
            value={roundTripTravelTime}
            errorMessage={roundTripTravelTimeErr}
          />
          <Button btnText="Default" halfWidthBtn onPress={loadDefaults} />
        </View>

        <View style={styles.nextBtn} />

        <Button
          btnText="Next"
          isPrimary
          onPress={handleNext}
          isLoading={isVerifying}
        />

        <Modal
          modalVisible={modalVisible}
          style={styles.modal}
          setModalVisible={setModalVisible}
          title="Material Density"
        >
          <MaterialDensity materialDensities={materialDensities} />
        </Modal>
      </KeyboardAwareScrollView>
    </Layout>
  )
}

export default SiteParameters
