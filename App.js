import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { QueryClient, QueryClientProvider } from "react-query"
import Toast from "react-native-toast-message"
import MainNavigator from "./src/navigator/mainNavigator"

const queryClient = new QueryClient()

const App = () => {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <MainNavigator />
        <Toast />
      </QueryClientProvider>
    </NavigationContainer>
  )
}

export default App
