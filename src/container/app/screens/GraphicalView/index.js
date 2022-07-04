import { View, Text, TouchableOpacity } from "react-native"
import { WebView } from "react-native-webview"
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
  const webviewRef = useRef()

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

        <View style={styles.chart}>
          <VictoryChart
            theme={VictoryTheme.material}
            minDomain={{ y: 0, x: 0 }}
            domainPadding={{ x: 30 }}
          >
            <VictoryLabel text={"LD= 250 bcm/hr"} x={60} y={40} />

            <VictoryLine
              style={{
                data: { stroke: "#FF8C00" },
                parent: { border: "1px solid #ccc" }
              }}
              data={[
                { x: 10, y: 10 },
                { x: 9, y: 20 },
                { x: 8, y: 30 },
                { x: 7, y: 40 },
                { x: 6, y: 50 },
                { x: 5, y: 60 },
                { x: 0, y: 60 }
              ]}
            />

            <VictoryLine
              style={{
                data: { stroke: "#0000FF" },
                parent: { border: "1px solid #ccc" }
              }}
              data={[
                { x: 12, y: 10 },
                { x: 11, y: 20 },
                { x: 10, y: 30 },
                { x: 9, y: 40 },
                { x: 8, y: 50 },
                { x: 7, y: 60 },
                { x: 5, y: 60 }
              ]}
            />

            <VictoryLine
              style={{
                data: { stroke: "#008000" },
                parent: { border: "1px solid #ccc" }
              }}
              data={[
                { x: 14, y: 10 },
                { x: 13, y: 20 },
                { x: 12, y: 30 },
                { x: 11, y: 40 },
                { x: 10, y: 50 },
                { x: 9, y: 60 },
                { x: 7, y: 60 }
              ]}
            />

            <VictoryAxis
              label="Round Trip Travel Time (minutes)"
              style={{ axisLabel: { padding: 30 } }}
            />
            <VictoryAxis
              dependentAxis
              label="Fleet productivity (bcm/hr)"
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
