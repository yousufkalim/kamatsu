import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  PermissionsAndroid,
  Platform
} from "react-native"
import CheckBox from "@react-native-community/checkbox"
import { useSelector } from "react-redux"
import FileViewer from "react-native-file-viewer"

import { captureScreen } from "react-native-view-shot"
import * as Progress from "react-native-progress"
import RNHTMLtoPDF from "react-native-html-to-pdf"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen"
import RNFetchBlob from "rn-fetch-blob"

import * as appStyles from "../../../../utils/appStyles"
import { useResultPreview } from "../../../../hooks/query/useResults"
import { Layout } from "../../../../components/Layout"
import { Header } from "../../../../components/Header"
import { Button } from "../../../../components/Button"
import LogoBlue from "../../../../assets/svg/logo-blue.svg"

import { styles } from "./styles"
import { toLocaleString } from "../../../../utils/helpers"

const deviceWidth = Dimensions.get("window").width
const deviceHeight = Dimensions.get("window").height

const Results = ({ navigation }) => {
  const fleetDefinitionState = useSelector(state => state.fleetDefinitionState)
  const siteParameterState = useSelector(state => state.siteParameterState)
  const unitStateValue = useSelector(state => state.unitState.unitSite)

  const { resultPreview, isLoading, isSuccess, data, isError, error } =
    useResultPreview()

  const [isMetricChecked, setIsMetricChecked] = useState(
    unitStateValue?.value === "Metric"
  )
  const [isVolumeChecked, setIsVolumeChecked] = useState(false)
  const [isPrintingPDF, setIsPrintingPDF] = useState(false)

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
    navigation.navigate("GraphicalView", {
      data: data
    })
  }

  const permissionWriteExternalStorage = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    )
    return granted === PermissionsAndroid.RESULTS.GRANTED
  }

  const handleSave = () => {
    setIsPrintingPDF(true)

    setTimeout(() => {
      captureScreen({
        format: "jpg",
        quality: 1
      }).then(
        uri => {
          setIsPrintingPDF(false)

          if (permissionWriteExternalStorage) {
            genPDF(uri)
          }
        },
        error => console.error("Oops, Something Went Wrong", error)
      )
    }, 500)
  }

  const genPDF = async uri => {
    const html = `<img src=${uri} alt="alt"  style="height:880px;width:520px;object-fit:contain;" />`

    try {
      let options = {
        html: html,
        fileName: `Komatsu_HAT_${data?.fleet_definition?.loading_tool?.name}_${data?.fleet_definition?.hauling_tool?.name}`,
        directory: "Documents"
      }

      let file = await RNHTMLtoPDF.convert(options)
      console.log("file genPDF", file.filePath)

      await FileViewer.open(file.filePath)
    } catch (error) {
      console.log("err", error)
    }
  }

  return (
    <Layout customStyle={isPrintingPDF && { backgroundColor: "#fff" }}>
      {!isPrintingPDF && <Header showBack />}
      {isPrintingPDF && <LogoBlue height={hp(3)} width={wp(40)} />}

      <View style={styles.container}>
        <Text style={styles.title}>Results</Text>

        {isLoading && (
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
        )}

        {!isLoading && isError && (
          <>
            {error?.message && error?.message === "Network Error" ? (
              <Text>Please check your internet connection</Text>
            ) : (
              <Text>Something went wrong </Text>
            )}
          </>
        )}

        {!isLoading && isSuccess && (
          <View style={{ flex: 1 }}>
            <ScrollView style={styles.resultsContainer}>
              <View style={styles.section}>
                <Text style={styles.label}>Current Loading Tool:</Text>
                <Text style={styles.value}>
                  {data?.fleet_definition?.loading_tool?.name}
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.label}>Current Hauling Tool:</Text>
                <Text style={styles.value}>
                  {data?.fleet_definition?.hauling_tool?.name}
                </Text>
              </View>
              {!isPrintingPDF && (
                <>
                  <View style={styles.divider} />

                  <View style={styles.sectionCheckbox}>
                    <View style={styles.checkboxContainer}>
                      <CheckBox
                        disabled={false}
                        value={isMetricChecked}
                        boxType="square"
                        onValueChange={newValue => setIsMetricChecked(newValue)}
                        lineWidth={1}
                        style={[
                          styles.checkbox,
                          Platform.OS == "android" && styles.checkboxAndroid
                        ]}
                        onTintColor={appStyles.primaryColor}
                        onCheckColor={appStyles.primaryColor}
                        tintColor={appStyles.primaryColor}
                        tintColors={{
                          true: appStyles.primaryColor,
                          false: appStyles.COLOR_GRAY_1
                        }}
                      />
                      <Text
                        style={[
                          styles.checkboxLabel,
                          Platform.OS == "android" &&
                            styles.checkboxLabelAndroid
                        ]}
                      >
                        Metric
                      </Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                      <CheckBox
                        disabled={false}
                        value={isVolumeChecked}
                        boxType="square"
                        onValueChange={newValue => setIsVolumeChecked(newValue)}
                        lineWidth={1}
                        style={[
                          styles.checkbox,
                          Platform.OS == "android" && styles.checkboxAndroid
                        ]}
                        onTintColor={appStyles.primaryColor}
                        onCheckColor={appStyles.primaryColor}
                        tintColor={appStyles.primaryColor}
                        tintColors={{
                          true: appStyles.primaryColor,
                          false: appStyles.COLOR_GRAY_1
                        }}
                      />
                      <Text
                        style={[
                          styles.checkboxLabel,
                          Platform.OS == "android" &&
                            styles.checkboxLabelAndroid
                        ]}
                      >
                        Volume
                      </Text>
                    </View>
                  </View>
                  <View style={styles.divider} />
                </>
              )}
              <Text style={styles.sectionHeader}>Loader Dependent Fleet</Text>
              <View style={styles.section}>
                <Text style={styles.label}>Productivity:</Text>
                <Text style={styles.value}>
                  {isMetricChecked &&
                    !isVolumeChecked &&
                    toLocaleString(
                      data?.result?.haulage_per_hour?.metric,
                      " tonnes/hr"
                    )}

                  {!isMetricChecked &&
                    !isVolumeChecked &&
                    toLocaleString(
                      data?.result?.haulage_per_hour?.us,
                      " tons/hr"
                    )}

                  {!isMetricChecked &&
                    isVolumeChecked &&
                    toLocaleString(
                      data?.result?.haulage_per_hour?.is_volume?.us,
                      " bcy/hr"
                    )}

                  {isMetricChecked &&
                    isVolumeChecked &&
                    toLocaleString(
                      data?.result?.haulage_per_hour?.is_volume?.metric,
                      "  bcm/hr"
                    )}
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
              {data?.result?.trucks?.map((truck, idx) => (
                <View style={styles.section} key={idx}>
                  <Text style={styles.label}>{truck?.name}:</Text>
                  <Text style={styles.value}>
                    {isMetricChecked &&
                      !isVolumeChecked &&
                      `${Number(
                        truck?.metric?.toFixed(0)
                      ).toLocaleString()} tonnes/hr`}
                    {!isMetricChecked &&
                      !isVolumeChecked &&
                      `${Number(
                        truck?.us?.toFixed(0)
                      ).toLocaleString()} tons/hr`}
                    {!isMetricChecked &&
                      isVolumeChecked &&
                      `${Number(
                        truck?.is_volume?.us?.toFixed(0)
                      ).toLocaleString()} bcy/hr`}
                    {isMetricChecked &&
                      isVolumeChecked &&
                      `${Number(
                        truck?.is_volume?.metric?.toFixed(0)
                      ).toLocaleString()} bcm/hr`}{" "}
                    ({truck?.percentage}%)
                  </Text>
                </View>
              ))}
              <View style={styles.divider} />
              <Text style={styles.sectionHeader}>
                Key Fleet Performance Components
              </Text>

              {isMetricChecked ? (
                <Text style={{ ...styles.value, marginLeft: 0 }}>
                  {data?.result?.scoops_per_load?.metric} passes @{" "}
                  {data?.result?.tons_per_scoop?.metric} tonnes/pass
                </Text>
              ) : (
                <Text style={{ ...styles.value, marginLeft: 0 }}>
                  {data?.result?.scoops_per_load?.us} passes @{" "}
                  {data?.result?.tons_per_scoop?.us} tons/pass
                </Text>
              )}
            </ScrollView>

            {!isPrintingPDF && (
              <>
                <Button
                  btnText="Graphical View"
                  onPress={handleGraphicalView}
                />

                <Button
                  btnText="Save Results"
                  isPrimary
                  customStyle={{ marginTop: 10 }}
                  onPress={handleSave}
                />
              </>
            )}
          </View>
        )}
      </View>
    </Layout>
  )
}

export default Results
