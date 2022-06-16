import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { Provider } from "react-redux"
import { QueryClient, QueryClientProvider } from "react-query"
import Toast from "react-native-toast-message"
import { store } from "./src/store/store"
import MainNavigator from "./src/navigator/mainNavigator"

const queryClient = new QueryClient()

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <MainNavigator />
          <Toast />
        </QueryClientProvider>
      </NavigationContainer>
    </Provider>
  )
}

export default App
