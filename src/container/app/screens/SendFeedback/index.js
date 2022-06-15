import { View, Text } from "react-native"
import React, { useState } from "react"

import { Layout } from "../../../../components/Layout"
import { Header } from "../../../../components/Header"
import { Input } from "../../../../components/Input"
import { Button } from "../../../../components/Button"
import { styles } from "./styles"

const SendFeedback = () => {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const onSubmit = () => {}

  return (
    <Layout>
      <Header showBack />
      <View style={styles.container}>
        <Text style={styles.title}>Send Feedback</Text>

        <Input
          placeHolder="johndoe@gmail.com"
          inputLabel="Email Address"
          customContainerStyle={styles.inputEmailContainer}
          setValue={setEmail}
          value={email}
        />

        <Input
          placeHolder="Text here"
          inputLabel="Message"
          customContainerStyle={styles.inputMsgContainer}
          customInputStyle={styles.inputMsg}
          multiline={true}
          setValue={setMessage}
          value={message}
        />

        <View style={styles.nextBtn} />

        <Button btnText="Submit" isPrimary onPress={onSubmit} />
      </View>
    </Layout>
  )
}

export default SendFeedback
