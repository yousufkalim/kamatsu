import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { StyleSheet } from "react-native"
import { createDrawerNavigator } from "@react-navigation/drawer"

import Landing from "../container/app/screens/Landing"
import FleetDefinition from "../container/app/screens/FleetDefinition"
import SiteParameters from "../container/app/screens/SiteParameters"
import DrawerContainer from "./drawerContainer"

const RootStack = createStackNavigator()
const MainStack = createStackNavigator()

const Drawer = createDrawerNavigator()

const MainStackScreens = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Landing" component={Landing} />
      <MainStack.Screen name="FleetDefinition" component={FleetDefinition} />
      <MainStack.Screen name="SiteParameters" component={SiteParameters} />
    </MainStack.Navigator>
  )
}

function DrawerStack() {
  return (
    <Drawer.Navigator
      drawerType="slide"
      overlayColor="transparent"
      drawerStyle={styles.drawerStyles}
      contentContainerStyle={{ flex: 1 }}
      screenOptions={{
        activeBackgroundColor: "transparent",
        activeTintColor: "white",
        inactiveTintColor: "white"
        // drawerPosition: "right"
      }}
      sceneContainerStyle={{ backgroundColor: "transparent" }}
      drawerContent={props => {
        return <DrawerContainer {...props} props={props} />
      }}
    >
      <Drawer.Screen name="MainStackScreens" options={{ headerShown: false }}>
        {props => <MainStackScreens {...props} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  )
}

const MainNavigator = () => {
  // const token = useSelector(state => state.authState.token)
  const token = true
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <>
          <RootStack.Screen name="DrawerStack" component={DrawerStack} />
        </>
      ) : (
        <>{/* <RootStack.Screen name="Signin" component={Signin} /> */}</>
      )}
    </RootStack.Navigator>
  )
}

export default MainNavigator

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: "#FFF",
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5
  },
  drawerStyles: {
    flex: 1,
    backgroundColor: "transparent"
  },
  drawerItem: {
    alignItems: "flex-start",
    marginVertical: 0
  },
  drawerLabel: {
    color: "white",
    marginLeft: -16
  },
  avatar: {
    borderRadius: 60,
    marginBottom: 16,
    borderColor: "white"
  }
})
