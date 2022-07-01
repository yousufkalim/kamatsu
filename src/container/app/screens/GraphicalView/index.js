import { View, Text, TouchableOpacity } from "react-native"
import { WebView } from "react-native-webview"
import React, { useRef, useState } from "react"
import CheckBox from "@react-native-community/checkbox"
import { useSelector } from "react-redux"

import * as appStyles from "../../../../utils/appStyles"
import { Layout } from "../../../../components/Layout"
import { Header } from "../../../../components/Header"
import { Button } from "../../../../components/Button"
import { styles } from "./styles"

const GraphicalView = () => {
  const webviewRef = useRef()

  var data = [
    [10, 250],
    [11, 200],
    [12, 150]
  ]

  const unitStateValue = useSelector(state => state.unitState.unitSite)

  const [isMetricChecked, setIsMetricChecked] = useState(
    unitStateValue?.value === "Metric"
  )
  const [isVolumeChecked, setIsVolumeChecked] = useState(false)

  function sendDataToWebView() {
    webviewRef.current.postMessage("message")
  }

  return (
    <Layout>
      <Header showBack />
      <View style={styles.container}>
        <Text style={styles.title}>Graphical View</Text>
        {/* <TouchableOpacity
          onPress={() => sendDataToWebView()}
          style={{
            padding: 20,
            width: 300,
            marginTop: 100,
            backgroundColor: "#6751ff",
            alignItems: "center"
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>
            Send Data To WebView / Website
          </Text>
        </TouchableOpacity> */}

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
          {/* <WebView
            originWhitelist={["*"]}
            source={require("../../../../resources/chart.html")}
          /> */}
          <WebView
            source={require("../../../../resources/chart.html")}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            ref={webviewRef}
            scalesPageToFit={false}
            mixedContentMode="compatibility"
            // onMessage={onMessage}
          />
        </View>

        <Button isPrimary btnText="Save Results" />
      </View>
    </Layout>
  )
}

export default GraphicalView
