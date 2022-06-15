import * as React from "react"
import { render } from "@testing-library/react-native"
import { IconButton } from "./index"
import HaulageIcon from "../../assets/svg/haulage.svg"

describe("IconButton component test", () => {
  test("it shows correct button text", () => {
    const { getByText } = render(
      <IconButton btnText="Haulage Analysis Tool" BtnIcon={HaulageIcon} />
    )
    const showBtnText = getByText("Haulage Analysis Tool")
    expect(showBtnText).toBeTruthy()
  })
})
