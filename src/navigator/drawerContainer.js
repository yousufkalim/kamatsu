import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native"
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen"
import { useNavigation } from "@react-navigation/native"

import * as appStyles from "../utils/appStyles"
import IIcon from "react-native-vector-icons/Ionicons"
import LogoBlue from "../assets/svg/logo-blue.svg"

function DrawerContainer({ props }) {
  const navigation = useNavigation()

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
              navigation.navigate("UserRank")
            }}
            labelStyle={styles.labelStyle}
            style={styles.drawerItem}
          />
          <DrawerItem
            label="Send Feedback"
            onPress={() => {
              navigation.navigate("UserRank")
            }}
            labelStyle={styles.labelStyle}
            style={styles.drawerItem}
          />
          <DrawerItem
            label="Privacy Policy"
            onPress={() => {
              navigation.navigate("UserRank")
            }}
            labelStyle={styles.labelStyle}
            style={styles.drawerItem}
          />
          <DrawerItem
            label="Terms and Conditions"
            onPress={() => {
              navigation.navigate("UserRank")
            }}
            labelStyle={styles.labelStyle}
            style={styles.drawerItem}
          />
          <DrawerItem
            label="About Us"
            onPress={() => {
              navigation.navigate("UserRank")
            }}
            labelStyle={styles.labelStyle}
            style={styles.drawerItem}
          />

          <DrawerItem
            label="Sign out"
            onPress={() => {
              navigation.navigate("UserRank")
            }}
            labelStyle={styles.labelStyle}
            style={styles.drawerItem}
          />
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
  }
})
export default DrawerContainer
