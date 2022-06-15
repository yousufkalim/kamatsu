import { View, Text, Pressable, Linking } from "react-native"
import React from "react"
import { Layout } from "../../../../components/Layout"
import { Header } from "../../../../components/Header"
import { styles } from "./styles"

const AboutUs = () => {
  return (
    <Layout>
      <Header showBack />
      <View style={styles.container}>
        <Text style={styles.title}>About Us</Text>

        <Text style={styles.text}>
          The objective of this tool is to conduct productivity and unit cost
          analyses for mining or construction fleet configurations. The
          parameters in this app can model a specific site for a customer as
          well as utilize industry standard parameters in a loader-dependent or
          truck-dependent application. All values calculated by this tool are
          intended for preliminary planning and budgetary purposes. For
          additional questions, please contact the Komatsu Application
          Engineering team at{" "}
        </Text>
        <Pressable
          onPress={() => {
            Linking.openURL(
              "mailto:miningapplicationengineering@global.komatsu"
            )
          }}
        >
          <Text style={styles.email}>
            MiningApplicationEngineering@global.komatsu
          </Text>
        </Pressable>
      </View>
    </Layout>
  )
}

export default AboutUs
