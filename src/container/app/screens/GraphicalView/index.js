import { View, Text, Platform } from "react-native"
import React, { useRef, useState } from "react"
import CheckBox from "@react-native-community/checkbox"
import { useSelector } from "react-redux"
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryAxis
} from "victory-native"

import * as appStyles from "../../../../utils/appStyles"
import { Layout } from "../../../../components/Layout"
import { Header } from "../../../../components/Header"
import { Button } from "../../../../components/Button"
import { styles } from "./styles"

const GraphicalView = () => {  
  const unitStateValue = useSelector(state => state.unitState.unitSite)

  const [isMetricChecked, setIsMetricChecked] = useState(
    unitStateValue?.value === "Metric"
  )
  const [isVolumeChecked, setIsVolumeChecked] = useState(false)

  return (
    <Layout>
      <Header showBack />
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
          <VictoryChart
            theme={VictoryTheme.material}
            minDomain={{ y: 0, x: 0 }}
            domainPadding={{ x: 30 }}
            style={{}}
          >
            <VictoryLabel
              text={`LD= 250 ${
                isMetricChecked && !isVolumeChecked
                  ? "Tonnes/hr"
                  : !isMetricChecked && !isVolumeChecked
                  ? "Tons/hr"
                  : !isMetricChecked && isVolumeChecked
                  ? "bcy/hr"
                  : "bcm/hr"
              }`}
              x={60}
              y={40}
            />

            <VictoryLine
              data={[
                // { x: 10, y: 10 },
                // { x: 9, y: 20 },
                // { x: 8, y: 30 },
                // { x: 7, y: 40 },
                // { x: 6.5, y: 65 },
                // { x: 7.5, y: 75 },
                { x: 8.5, y: 85 }
                // { x: 0, y: 60 }
              ]}
              style={{
                data: { stroke: "#FF8C00" }
              }}
            />

            <VictoryLine
              data={[
                { x: 5.9, y: 59 },
                { x: 4.9, y: 49 },
                { x: 3.9, y: 39 }
                // { x: 11, y: 20 },
                // { x: 10, y: 30 },
                // { x: 9, y: 40 },
                // { x: 8, y: 50 },
                // { x: 7, y: 60 },
                // { x: 5, y: 60 }
              ]}
              style={{
                data: { stroke: "#0000FF" }
              }}
            />

            <VictoryLine
              data={[
                { x: 14, y: 10 },
                { x: 13, y: 20 },
                { x: 12, y: 30 },
                { x: 11, y: 40 },
                { x: 10, y: 50 },
                { x: 9, y: 60 },
                { x: 7, y: 60 }
              ]}
              style={{
                data: { stroke: "#008000" }
              }}
              labelComponent={
                <VictoryLabel
                  // text={"LD= 250 bcm/hr"}
                  // x={10}
                  // y={20}
                  backgroundStyle={{ fill: "pink" }}
                  backgroundPadding={3}
                />
              }
            />

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
              style={{ axisLabel: { padding: 30 } }}
            />
          </VictoryChart>
        </View>

        <Button isPrimary btnText="Save Results" />
      </View>
    </Layout>
  )
}

export default GraphicalView
