import { View, Text } from "react-native"
import React from "react"
import { Layout } from "../../../../components/Layout"
import { Header } from "../../../../components/Header"
import { Button } from "../../../../components/Button"
import { styles } from "./styles"

const Results = ({ navigation }) => {
  const handleGraphicalView = () => {
    navigation.navigate("GraphicalView")
  }

  return (
    <Layout>
      <Header showBack />
      <View style={styles.container}>
        <Text style={styles.title}>Results</Text>
        <Text>Results</Text>

        <View style={styles.nextBtn} />

        <Button btnText="Graphical View" onPress={handleGraphicalView} />

        <Button
          btnText="Save Results"
          isPrimary
          customStyle={{ marginTop: 10 }}
        />
      </View>
    </Layout>
  )
}

export default Results
