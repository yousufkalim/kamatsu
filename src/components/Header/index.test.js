import * as React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import { NavigationContainer } from "@react-navigation/native"
import { Header } from "./index"

describe("Header component test", () => {
  test("it renders without crashing", () => {
    render(
      <NavigationContainer>
        <Header />
      </NavigationContainer>
    )
  })
})
