import { View, Text } from "react-native"
import React, { useState } from "react"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import IIcon from "react-native-vector-icons/Ionicons"

import { useSendFeedback } from "../../../../hooks/query/useFeedback"
import { validateEmail } from "../../../../utils/validateEmail"
import * as appStyles from "../../../../utils/appStyles"
import { Button } from "../../../../components/Button"
import { Layout } from "../../../../components/Layout"
import { Header } from "../../../../components/Header"
import { Input } from "../../../../components/Input"
import { styles } from "./styles"

const SendFeedback = () => {
  const { sendFeedback, isLoading, isSuccess } = useSendFeedback()

  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [message, setMessage] = useState("")
  const [messageError, setMessageError] = useState("")

  const onSubmit = () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address")
      return
    }
    setEmailError("")

    if (message.length < 1) {
      setMessageError("Please enter your message")
      return
    }
    sendFeedback({ email: email, body: message })
  }

  return (
    <Layout>
      <Header showBack goHome={true} />

      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1 }}
        style={styles.container}
      >
        <Text style={styles.title}>Send Feedback</Text>

        {isSuccess ? (
          <View style={styles.successContainer}>
            <Text style={styles.successText}>
              Thank you for sending your feedback!
            </Text>
            <View style={styles.successBtn}>
              <Text style={styles.text}>Successful submission of feedback</Text>
              <IIcon
                size={24}
                name="md-checkmark-circle"
                color={appStyles.primaryColor}
              />
            </View>
          </View>
        ) : (
          <>
            <Input
              placeHolder="johndoe@gmail.com"
              inputLabel="Email Address"
              customContainerStyle={styles.inputEmailContainer}
              setValue={setEmail}
              value={email}
              errorMessage={emailError}
            />

            <Input
              placeHolder="Text here"
              inputLabel="Message"
              customContainerStyle={styles.inputMsgContainer}
              customInputStyle={styles.inputMsg}
              multiline={true}
              setValue={setMessage}
              value={message}
              errorMessage={messageError}
            />

            <View style={styles.submitBtn} />

            <Button
              btnText="Submit"
              isPrimary
              onPress={onSubmit}
              isLoading={isLoading}
            />
          </>
        )}
      </KeyboardAwareScrollView>
    </Layout>
  )
}

export default SendFeedback
