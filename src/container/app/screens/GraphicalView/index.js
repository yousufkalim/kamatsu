import { View, Text } from "react-native"
import React from "react"
import { Layout } from "../../../../components/Layout"
import { Header } from "../../../../components/Header"
import { styles } from "./styles"
import { Button } from "../../../../components/Button"

const GraphicalView = () => {
  return (
    <Layout>
      <Header showBack />
      <View style={styles.container}>
        <Text style={styles.title}>Graphical View</Text>
        <Text>Graphical View</Text>

        <View style={styles.nextBtn} />

        <Button isPrimary btnText="Save Results" />
      </View>
    </Layout>
  )
}

export default GraphicalView
