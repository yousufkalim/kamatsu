import { View, Text, Pressable, Linking } from "react-native"
import React from "react"
import { Layout } from "../../../../components/Layout"
import { Header } from "../../../../components/Header"
import { useGetAboutUs } from "../../../../hooks/query/useAbout"
import { styles } from "./styles"

const AboutUs = () => {
  const { data } = useGetAboutUs()

  return (
    <Layout>
      <Header showBack goHome={true} />
      <View style={styles.container}>
        <Text style={styles.title}>About Us</Text>

        <Text style={styles.text}>{data?.description}</Text>
        <Pressable
          onPress={() => {
            Linking.openURL(
              "mailto:miningapplicationengineering@global.komatsu"
            )
          }}
        >
          <Text style={styles.email}>{data?.contact_email}</Text>
        </Pressable>
      </View>
    </Layout>
  )
}

export default AboutUs
