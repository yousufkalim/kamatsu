import { View, Text } from "react-native"
import { WebView } from "react-native-webview"
import React from "react"

import { Layout } from "../../../../components/Layout"
import { Header } from "../../../../components/Header"
import { Button } from "../../../../components/Button"
import { styles } from "./styles"

const GraphicalView = () => {
  return (
    <Layout>
      <Header showBack />
      <View style={styles.container}>
        <Text style={styles.title}>Graphical View</Text>
        <Text>Graphical View</Text>

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
          />
        </View>

        <Button isPrimary btnText="Save Results" />
      </View>
    </Layout>
  )
}

export default GraphicalView
