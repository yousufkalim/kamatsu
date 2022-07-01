import React, { useEffect, useRef, useState } from "react"
import { View, Text, ScrollView, Dimensions } from "react-native"
import CheckBox from "@react-native-community/checkbox"
import { useSelector } from "react-redux"
// import ViewShot from "react-native-view-shot"
// import RNImageToPdf from "react-native-image-to-pdf"
import * as Progress from "react-native-progress"

import * as appStyles from "../../../../utils/appStyles"
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
  const unitStateValue = useSelector(state => state.unitState.unitSite)

  const { resultPreview, isLoading, isSuccess, data } = useResultPreview()

  const [isMetricChecked, setIsMetricChecked] = useState(
    unitStateValue?.value === "Metric"
  )
  const [isVolumeChecked, setIsVolumeChecked] = useState(false)

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
    //   ref.current
    //     .capture()
    //     .then(uri => {
    //       console.log("do something with ", uri)
    //       // setImage(uri)
    //       // myAsyncPDFFunction(uri)
    //     })
    //     .catch(err => console.log("err", err))
  }

  // const myAsyncPDFFunction = async uri => {
  //   try {
  //     const options = {
  //       imagePaths: [uri],
  //       name: "komatsu",
  //       maxSize: {
  //         // optional maximum image dimension - larger images will be resized
  //         width: 900,
  //         height: Math.round((deviceHeight / deviceWidth) * 900)
  //       },
  //       quality: 0.7 // optional compression paramter
  //     }
  //     const pdf = await RNImageToPdf.createPDFbyImages(options)

  //     console.log("pdf", pdf.filePath)
  //   } catch (e) {
  //     console.log("errr", e)
  //   }
  // }

  return (
    <Layout>
      <Header showBack />
      <View style={styles.container}>
        <Text style={styles.title}>Results</Text>

        {isLoading ? (
          <>
            <View style={styles.loading}>
              <Progress.Circle
                size={40}
                indeterminate={true}
                color={appStyles.primaryColor}
                thickness={11}
              />

              <Text style={styles.loadingText}>Processing...</Text>
            </View>
          </>
        ) : (
          <View style={{ flex: 1 }}>
            <ScrollView style={styles.resultsContainer}>
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
                    value={isMetricChecked}
                    boxType="square"
                    onValueChange={newValue => setIsMetricChecked(newValue)}
                    lineWidth={1}
                    style={styles.checkbox}
                    onTintColor={appStyles.primaryColor}
                    onCheckColor={appStyles.primaryColor}
                  />
                  <Text style={styles.checkboxLabel}>Metric</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    disabled={false}
                    value={isVolumeChecked}
                    boxType="square"
                    onValueChange={newValue => setIsVolumeChecked(newValue)}
                    lineWidth={1}
                    style={styles.checkbox}
                    onTintColor={appStyles.primaryColor}
                    onCheckColor={appStyles.primaryColor}
                  />
                  <Text style={styles.checkboxLabel}>Volume</Text>
                </View>
              </View>
              <View style={styles.divider} />
              <Text style={styles.sectionHeader}>Loader Dependent Fleet</Text>
              <View style={styles.section}>
                <Text style={styles.label}>Productivity:</Text>
                <Text style={styles.value}>
                  {isMetricChecked &&
                    !isVolumeChecked &&
                    `${data?.result?.load_size?.metric} Tonnes/hr`}

                  {!isMetricChecked &&
                    !isVolumeChecked &&
                    `${data?.result?.load_size?.us} Tons/hr`}

                  {!isMetricChecked &&
                    isVolumeChecked &&
                    `${data?.result?.load_size?.us} bcy/hr`}

                  {isMetricChecked &&
                    isVolumeChecked &&
                    `${data?.result?.load_size?.metric} bcm/hr`}
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
              {data?.result?.trucks?.slice(1)?.map((truck, idx) => (
                <View style={styles.section} key={idx}>
                  <Text style={styles.label}>{truck?.name}:</Text>
                  <Text style={styles.value}>
                    {isMetricChecked &&
                      !isVolumeChecked &&
                      `${truck?.value_metric} Tonnes/hr`}

                    {!isMetricChecked &&
                      !isVolumeChecked &&
                      `${truck?.value_us} Tons/hr`}

                    {!isMetricChecked &&
                      isVolumeChecked &&
                      `${truck?.value_us} bcy/hr`}

                    {isMetricChecked &&
                      isVolumeChecked &&
                      `${truck?.value_metric} bcm/hr`}
                 
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
            </ScrollView>

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
