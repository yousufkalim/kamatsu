import { View, Text, SafeAreaView } from "react-native"
import React from "react"

export const Layout = ({ children }) => {
  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#fff" }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F6F6" }}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: "#F6F6F6"
          }}
        >
          {children}
        </View>
        {/* {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={[styles.container, style]}>{children}</View>
      )} */}
      </SafeAreaView>
    </>
  )
}
