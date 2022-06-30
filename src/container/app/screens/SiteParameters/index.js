import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import {
  useGetMaterialDensities,
  useVerifySiteParameters
} from "../../../../hooks/query/useSiteParameter"
import { setSiteValuesAction } from "../../redux/site/actions"
import { Layout } from "../../../../components/Layout"
import { Header } from "../../../../components/Header"
import { Select } from "../../../../components/Select"
import { Input } from "../../../../components/Input"
import { Button } from "../../../../components/Button"
import Modal from "../../../../components/Modal"
import { setUnitSiteAction } from "../../redux/unit/actions"
import { MaterialDensity } from "../../../../components/MaterialDensity"
import { styles } from "./styles"

const SiteParameters = ({ navigation }) => {
  const dispatch = useDispatch()

  const unitStateValue = useSelector(state => state.unitState.unitSite)

  const { materialDensities, isLoading } = useGetMaterialDensities()
  const { verifySiteParameters, isVerifying, isSuccess } =
    useVerifySiteParameters()

  const [unit, setUnit] = useState(unitStateValue)
  const [materialDensity, setMaterialDensity] = useState(
    unitStateValue?.value === "Metric" ? "3000.00" : "1779.83"
  )
  const [materialSwell, setMaterialSwell] = useState("20")
  const [operatorEfficiency, setOperatorEfficiency] = useState("50")
  const [truckSpotTime, setTruckSpotTime] = useState("15")
  const [roundTripTravelTime, setRoundTripTravelTime] = useState("10")
  const [modalVisible, setModalVisible] = useState(false)

  const units = [
    { label: "Metric", value: "Metric" },
    { label: "US Customary", value: "US Customary" }
  ]

  const handleNext = async () => {
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

    try {
      await verifySiteParameters(values)

      navigation.navigate("Results")
    } catch (error) {
      console.log("err", error)
    }
  }
  const handleUnitChange = value => {
    dispatch(setUnitSiteAction(value))
    setUnit(value)
  }

  useEffect(() => {
    if (materialDensity) {
      convertLcmToLcy()
    }
  }, [unitStateValue])

  const convertLcmToLcy = () => {
    // pound/cubic yard in 1 kg/m3 - 1.6855549391294.

    if (unitStateValue?.value === "Metric") {
      const convert = (parseFloat(materialDensity) / 1.6855549391294).toFixed(1)
      setMaterialDensity(convert.toString())
      console.log(convert.toString())
    } else {
      const convert = (parseFloat(materialDensity) * 1.6855549391294).toFixed(1)
      setMaterialDensity(convert.toString())
      console.log(convert.toString())
    }
  }

  const loadDefaults = () => {
    setMaterialDensity(unitStateValue?.value === "Metric" ? "1779.8" : "3000.0")
    setMaterialSwell("20")
    setOperatorEfficiency("50")
    setTruckSpotTime("15")
    setRoundTripTravelTime("10")
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
              handleChangeInputFloat(value, setMaterialDensity)
            }
            symbol={
              unitStateValue?.value === "Metric" ? "(kg/lcm)" : "(lbs/lcy)"
            }
          />
          <Input
            inputLabel="Material Swell (%)"
            value={materialSwell}
            setValue={value => handleChangeInputFloat(value, setMaterialSwell)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Input
            inputLabel="Operator Efficiency (min/hr)"
            setValue={value =>
              handleChangeInputFloat(value, setOperatorEfficiency)
            }
            value={operatorEfficiency}
          />
          <Input
            inputLabel="Truck Spot Time (sec)"
            setValue={value => handleChangeInputFloat(value, setTruckSpotTime)}
            value={truckSpotTime}
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
