import { View, Text, Platform, PermissionsAndroid } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import CheckBox from "@react-native-community/checkbox"
import { useSelector } from "react-redux"
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryAxis,
  VictoryScatter
} from "victory-native"
import { captureScreen } from "react-native-view-shot"
import RNHTMLtoPDF from "react-native-html-to-pdf"
import FileViewer from "react-native-file-viewer"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen"

import { toLocaleString } from "../../../../utils/helpers"
import * as appStyles from "../../../../utils/appStyles"
import { Layout } from "../../../../components/Layout"
import { Header } from "../../../../components/Header"
import { Button } from "../../../../components/Button"
import LogoBlue from "../../../../assets/svg/logo-blue.svg"
import { styles } from "./styles"

const GraphicalView = ({ route, navigation }) => {
  const { data } = route.params

  const unitStateValue = useSelector(state => state.unitState.unitSite)

  const [isPrintingPDF, setIsPrintingPDF] = useState(false)
  const [isMetricChecked, setIsMetricChecked] = useState(
    unitStateValue?.value === "Metric"
  )
  const [isVolumeChecked, setIsVolumeChecked] = useState(false)
  const [dataGraph, setDataGraph] = useState([])

  const LDValue =
    isMetricChecked && !isVolumeChecked
      ? toLocaleString(data?.result?.haulage_per_hour?.metric, " tonnes/hr")
      : !isMetricChecked && !isVolumeChecked
      ? toLocaleString(data?.result?.haulage_per_hour?.us, " tons/hr")
      : !isMetricChecked && isVolumeChecked
      ? toLocaleString(data?.result?.haulage_per_hour?.is_volume?.us, " bcy/hr")
      : isMetricChecked &&
        isVolumeChecked &&
        toLocaleString(
          data?.result?.haulage_per_hour?.is_volume?.metric,
          "  bcm/hr"
        )

  const trucks = data.result?.trucks
  const fleet_definition = data.fleet_definition

  useEffect(() => {
    handleCalculation()
  }, [])

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
          console.log("captureScreen uri", uri)
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

  const handleCalculation = () => {
    let labels = [0]
    let rtt = trucks?.sort((a, b) => b.max_ld_rttt - a.max_ld_rttt)[0]
      ?.max_ld_rttt

    let haulage =
      isMetricChecked && !isVolumeChecked
        ? data?.result?.haulage_per_hour?.metric
        : !isMetricChecked && isVolumeChecked
        ? data?.result?.haulage_per_hour?.is_volume.metric
        : !isMetricChecked && !isVolumeChecked
        ? data?.result?.haulage_per_hour?.us
        : isMetricChecked &&
          isVolumeChecked &&
          data?.result?.haulage_per_hour?.is_volume.us

    for (let i = 0; i <= rtt * 10 + 4; i++) {
      let label = labels[labels.length - 1] + 0.1
      labels.push(parseFloat(label.toFixed(1)))
    }

    let dataSet = trucks?.map((truck, index) => {
      let data = []
      let lastIndexOfTruth
      let previosValue
      for (let index = 0; index < labels.length; index++) {
        if (truck.max_ld_rttt >= labels[index]) {
          data.push(parseInt(haulage))
          console.log("abbrNum")
          lastIndexOfTruth = index
        } else {
          let diff = labels.length - lastIndexOfTruth
          data.push(parseInt(data[index - 1] - haulage / diff))
        }
      }

      let xys = []
      for (let i = 0; i < labels.length; i++) {
        xys = [...xys, { x: labels[i], y: data[i] }]
      }
      return xys
    })
    setDataGraph(dataSet)
  }

  return (
    <Layout>
      {!isPrintingPDF && <Header showBack />}
      {isPrintingPDF && <LogoBlue height={hp(3)} width={wp(40)} />}

      <View style={styles.container}>
        <Text style={styles.title}>Graphical View</Text>

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
              tintColor={appStyles.primaryColor}
              onCheckColor={appStyles.primaryColor}
              tintColors={{
                true: appStyles.primaryColor,
                false: appStyles.COLOR_GRAY_1
              }}
            />

            <Text
              style={[
                styles.checkboxLabel,
                Platform.OS == "android" && styles.checkboxLabelAndroid
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
                Platform.OS == "android" && styles.checkboxLabelAndroid
              ]}
            >
              Volume
            </Text>
          </View>
        </View>

        <View style={styles.chart}>
          <Text style={styles.name}>
            {fleet_definition?.loading_tool?.name} X{" "}
            {fleet_definition?.hauling_tool?.name}
          </Text>
          <VictoryChart
            theme={VictoryTheme.material}
            minDomain={{ y: 0, x: 0 }}
            domainPadding={{ x: 10, y: 10 }}
            style={{}}
          >
            <VictoryLabel text={LDValue} x={60} y={40} />

            <VictoryLine
              data={dataGraph[0]}
              style={{
                data: { stroke: "#FF8C00" }
              }}
            />

            <VictoryScatter
              domain={[-10, 10]}
              data={[{ x: trucks[0].max_ld_rttt, y: 0 }]}
              labels={() => ["↑"]}
              labelComponent={
                <VictoryLabel
                  backgroundStyle={[{ fill: "#fff" }]}
                  backgroundPadding={3}
                  style={[{ fill: "#FF8C00", fontSize: 25 }]}
                />
              }
            />

            {dataGraph.length > 1 && (
              <VictoryLine
                data={dataGraph[1]}
                style={{
                  data: { stroke: "#0000FF" }
                }}
              />
            )}

            {dataGraph.length > 1 && (
              <VictoryScatter
                domain={[-10, 10]}
                data={[{ x: trucks[1].max_ld_rttt, y: 0 }]}
                labels={() => ["↑"]}
                labelComponent={
                  <VictoryLabel
                    backgroundStyle={[{ fill: "#fff" }]}
                    backgroundPadding={3}
                    style={[{ fill: "#0000FF", fontSize: 25 }]}
                  />
                }
              />
            )}

            {dataGraph.length > 2 && (
              <VictoryLine
                data={dataGraph[2]}
                style={{
                  data: { stroke: "#008000" }
                }}
              />
            )}

            {dataGraph.length > 2 && (
              <VictoryScatter
                domain={[-10, 10]}
                data={[{ x: trucks[2].max_ld_rttt, y: 0 }]}
                labels={() => ["↑"]}
                labelComponent={
                  <VictoryLabel
                    backgroundStyle={[{ fill: "#fff" }]}
                    backgroundPadding={3}
                    style={[{ fill: "#008000", fontSize: 25 }]}
                  />
                }
              />
            )}

            <VictoryAxis
              label="Round Trip Travel Time (minutes)"
              style={{ axisLabel: { padding: 30 } }}
            />
            <VictoryAxis
              dependentAxis
              label={`Fleet productivity (${
                isMetricChecked && !isVolumeChecked
                  ? "tonnes/hr"
                  : !isMetricChecked && !isVolumeChecked
                  ? "tons/hr"
                  : !isMetricChecked && isVolumeChecked
                  ? "bcy/hr"
                  : "bcm/hr"
              })`}
              style={{ axisLabel: { padding: 40 } }}
            />
          </VictoryChart>

          <View>
            {trucks?.map((truck, idx) => {
              return (
                <View key={truck?.name} style={styles.truckList}>
                  <View
                    style={[
                      styles.dot,
                      idx == 0 && styles.dot01,
                      idx == 1 && styles.dot02,
                      idx == 2 && styles.dot03
                    ]}
                  />
                  <Text>{truck?.name?.toLowerCase()}</Text>
                </View>
              )
            })}
          </View>
        </View>

        <View style={styles.nextBtn} />

        <Button isPrimary btnText="Save Results" onPress={handleSave} />
      </View>
    </Layout>
  )
}

export default GraphicalView
