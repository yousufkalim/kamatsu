import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Layout } from "../../../../components/Layout"
import { Header } from "../../../../components/Header"
import { Select } from "../../../../components/Select"
import { Input } from "../../../../components/Input"
import { Button } from "../../../../components/Button"
import Modal from "../../../../components/Modal"
import { setUnitAction } from "../../redux/unit/actions"
import { MaterialDensity } from "../../../../components/MaterialDensity"
import { styles } from "./styles"
import { useGetMaterialDensities } from "../../../../hooks/query/useSiteParameter"

const SiteParameters = ({ navigation }) => {
  const dispatch = useDispatch()

  const unitStateValue = useSelector(state => state.unitState.unit)

  const { materialDensities, isLoading } = useGetMaterialDensities()

  const [unit, setUnit] = useState(unitStateValue)
  const [materialDensity, setMaterialDensity] = useState(
    unitStateValue?.value === "Metric" ? "3000.00" : "1779.82926"
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

  const handleNext = () => {
    // navigation.navigate("Results")
  }

  const handleUnitChange = value => {
    dispatch(setUnitAction(value))
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
      const convert = (parseFloat(materialDensity) / 1.6855549391294).toFixed(2)
      setMaterialDensity(convert.toString())
      console.log(convert.toString())
    } else {
      const convert = (parseFloat(materialDensity) * 1.6855549391294).toFixed(2)
      setMaterialDensity(convert.toString())
      console.log(convert.toString())
    }
  }

  const loadDefaults = () => {
    setMaterialDensity(
      unitStateValue?.value === "Metric" ? "3000.00" : "1779.82926"
    )
    setMaterialSwell("20")
    setOperatorEfficiency("50")
    setTruckSpotTime("15")
    setRoundTripTravelTime("10")
  }

  return (
    <Layout>
      <Header showBack />
      <View style={styles.container}>
        <Text style={styles.title}>Site Parameters</Text>

        <Select
          label="Unit Selection"
          items={units}
          handleChange={handleUnitChange}
          selected={unit}
          showDefault={true}
          labelName="label"
          customStyle={{ zIndex: 20 }}
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
          <MaterialDensity materialDensities={materialDensities} />
        </Modal>
      </View>
    </Layout>
  )
}

export default SiteParameters
