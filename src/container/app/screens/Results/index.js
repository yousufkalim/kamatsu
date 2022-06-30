import React, { useEffect, useRef, useState } from "react"
import { View, Text, ScrollView, Image, Dimensions } from "react-native"
import CheckBox from "@react-native-community/checkbox"
import { useSelector } from "react-redux"
import ViewShot from "react-native-view-shot"
import RNImageToPdf from "react-native-image-to-pdf"

import { useResultPreview } from "../../../../hooks/query/useResults"
import { Layout } from "../../../../components/Layout"
import { Header } from "../../../../components/Header"
import { Button } from "../../../../components/Button"
import { styles } from "./styles"

const deviceWidth = Dimensions.get("window").width
const deviceHeight = Dimensions.get("window").height

const Results = ({ navigation }) => {
  const ref = useRef()

  const fleetDefinitionState = useSelector(state => state.fleetDefinitionState)
  const siteParameterState = useSelector(state => state.siteParameterState)

  const { resultPreview, isLoading, isSuccess, data } = useResultPreview()

  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [isMetricChecked, setIsMetricChecked] = useState(false)
  const [isVolumeChecked, setIsVolumeChecked] = useState(false)
  const [image, setImage] = useState(null)

  useEffect(() => {
    handleGetResult()
  }, [])

  const handleGetResult = () => {
    const values = {
      fleet_definition: fleetDefinitionState?.fleetValues,
      site_parameters: siteParameterState?.siteValues
    }

    console.log("values", values)
    resultPreview(values)
  }

  const handleGraphicalView = () => {
    navigation.navigate("GraphicalView")
  }

  const handleSave = () => {
    console.log("eemj")
    ref.current
      .capture()
      .then(uri => {
        console.log("do something with ", uri)
        // setImage(uri)
        myAsyncPDFFunction(uri)
      })
      .catch(err => console.log("err", err))
  }

  const myAsyncPDFFunction = async uri => {
    try {
      const options = {
        imagePaths: [uri],
        name: "PDFName",
        maxSize: {
          // optional maximum image dimension - larger images will be resized
          width: 900,
          height: Math.round((deviceHeight / deviceWidth) * 900)
        },
        quality: 0.7 // optional compression paramter
      }
      const pdf = await RNImageToPdf.createPDFbyImages(options)

      console.log("pdf", pdf.filePath)
    } catch (e) {
      console.log("errr", e)
    }
  }

  return (
    <Layout>
      <Header showBack />
      <View style={styles.container}>
        <Text style={styles.title}>Results</Text>

        {isLoading ? (
          <></>
        ) : (
          <View style={{ flex: 1 }}>
            <ViewShot
              style={styles.resultsContainer}
              ref={ref}
              options={{
                fileName: "Your-Name",
                format: "jpg",
                quality: 0.9
              }}
            >
              <View style={styles.section}>
                <Text style={styles.label}>Current Loading Tool:</Text>
                <Text style={styles.value}>
                  {fleetDefinitionState?.fleetValues?.loading_tool?.name}
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.label}>Current Hauling Tool:</Text>
                <Text style={styles.value}>
                  {fleetDefinitionState?.fleetValues?.hauling_tool?.name}
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.sectionCheckbox}>
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    boxType="square"
                    onValueChange={newValue => setIsMetricChecked(newValue)}
                    lineWidth={1}
                  />
                  <Text style={styles.value}>Metric</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    boxType="square"
                    onValueChange={newValue => setToggleCheckBox(newValue)}
                    lineWidth={1}
                  />
                  <Text style={styles.value}>Volume</Text>
                </View>
              </View>
              <View style={styles.divider} />
              <Text style={styles.sectionHeader}>Loader Dependent Fleet</Text>
              <View style={styles.section}>
                <Text style={styles.label}>Productivity:</Text>
                <Text style={styles.value}>
                  {isMetricChecked
                    ? `${data?.result?.load_size?.metric} Tonnes/hr`
                    : `${data?.result?.load_size?.us} Tons/hr`}
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.label}>Trucks Required:</Text>
                <Text style={styles.value}>
                  {isMetricChecked
                    ? `${data?.result?.ld_number_of_trucks?.metric}`
                    : `${data?.result?.ld_number_of_trucks?.us}`}
                </Text>
              </View>
              <View style={styles.divider} />
              <Text style={styles.sectionHeader}>Truck Dependent Fleet</Text>
              {data?.result?.trucks.map((truck, idx) => (
                <View style={styles.section} key={idx}>
                  <Text style={styles.label}>{truck?.name}:</Text>
                  <Text style={styles.value}>
                    {isMetricChecked
                      ? `${truck?.value_metric} Tonnes/hr`
                      : `${truck?.value_us} Tons/hr`}{" "}
                    (96%)
                  </Text>
                </View>
              ))}
              <View style={styles.divider} />
              <Text style={styles.sectionHeader}>
                Key Fleet Performance Components
              </Text>

              {isMetricChecked ? (
                <Text style={styles.value}>
                  {data?.result?.scoops_per_load?.metric} passes @{" "}
                  {data?.result?.tons_per_scoop?.metric} Tonnes/pass
                </Text>
              ) : (
                <Text style={styles.value}>
                  {data?.result?.scoops_per_load?.us} passes @{" "}
                  {data?.result?.tons_per_scoop?.us} Tons/pass
                </Text>
              )}
            </ViewShot>

            <Button btnText="Graphical View" onPress={handleGraphicalView} />

            <Button
              btnText="Save Results"
              isPrimary
              customStyle={{ marginTop: 10 }}
              onPress={handleSave}
            />
          </View>
        )}
      </View>
    </Layout>
  )
}

export default Results
