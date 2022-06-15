import React, { useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen"
import { useNavigation } from "@react-navigation/native"

import * as appStyles from "../utils/appStyles"
import LogoBlue from "../assets/svg/logo-blue.svg"
import Modal from "../components/Modal"
import { Button } from "../components/Button"

function DrawerContainer({ props }) {
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false)

  const handleCancelSignOut = () => {
    setModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{ flex: 1 }}
      >
        <View style={styles.logo}>
          <LogoBlue height={hp(4)} width={wp(40)} />
        </View>
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>JohnDoe</Text>
          <Text style={styles.email}>johndoe@gmail.com</Text>
        </View>
        <View style={styles.menu}>
          <DrawerItem
            label="Home"
            onPress={() => {
              navigation.navigate("Landing")
            }}
            labelStyle={styles.labelStyle}
            style={styles.drawerItem}
          />
          <DrawerItem
            label="Send Feedback"
            onPress={() => {
              navigation.navigate("SendFeedback")
            }}
            labelStyle={styles.labelStyle}
            style={styles.drawerItem}
          />
          <DrawerItem
            label="Privacy Policy"
            onPress={() => {
              navigation.navigate("PrivacyPolicy")
            }}
            labelStyle={styles.labelStyle}
            style={styles.drawerItem}
          />
          <DrawerItem
            label="Terms and Conditions"
            onPress={() => {
              navigation.navigate("PrivacyPolicy")
            }}
            labelStyle={styles.labelStyle}
            style={styles.drawerItem}
          />
          <DrawerItem
            label="About Us"
            onPress={() => {
              navigation.navigate("AboutUs")
            }}
            labelStyle={styles.labelStyle}
            style={styles.drawerItem}
          />

          <DrawerItem
            label="Sign out"
            onPress={() => {
              setModalVisible(true)
            }}
            labelStyle={styles.labelStyle}
            style={styles.drawerItem}
          />

          <Modal
            modalVisible={modalVisible}
            style={styles.modal}
            setModalVisible={setModalVisible}
            title=""
            showHeader={false}
          >
            <View style={styles.logoutModal}>
              <Text style={styles.logoutMsg}>
                Are you sure you want to sign out?
              </Text>
              <Button btnText="Yes" isPrimary onPress={handleCancelSignOut} />
              <Pressable onPress={handleCancelSignOut}>
                <Text style={styles.logoutMsgCancel}>Cancel</Text>
              </Pressable>
            </View>
          </Modal>
        </View>
      </DrawerContentScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1
  },
  logo: { marginLeft: 20 },
  profileDetails: {
    paddingVertical: hp(2),
    borderBottomColor: appStyles.COLOR_GRAY_1,
    borderBottomWidth: 1,
    marginHorizontal: 10
  },
  profileName: {
    paddingVertical: 5,
    fontSize: 18
  },
  email: {
    fontSize: 12
  },
  labelStyle: {
    color: appStyles.primaryColor,
    fontSize: 18,
    fontWeight: "400"
  },
  drawerItem: {
    marginLeft: 0,
    marginVertical: 0,
    padding: 0
  },
  logoutModal: {
    padding: 10
  },
  logoutMsg: {
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10
  },
  logoutMsgCancel: {
    fontFamily: appStyles.FONT_FAMILY_REGULAR,
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
    color: appStyles.primaryColor
  }
})
export default DrawerContainer
