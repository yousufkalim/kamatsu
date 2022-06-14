import * as React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import { IconButton } from "./index"
import HaulageIcon from "../../assets/svg/haulage.svg"

describe("IconButton component test", () => {
  test("it shows correct button text", () => {
    const { getAllByLabelText, getByText } = render(
      <IconButton btnText="Haulage Analysis Tool" BtnIcon={HaulageIcon} />
    )
    const showBtnText = getByText("Haulage Analysis Tool")
    expect(showBtnText).toBeTruthy()

    //   const answerInputs = getAllByLabelText("answer input")

    //   fireEvent.changeText(answerInputs[0], "a1")
    //   fireEvent.changeText(answerInputs[1], "a2")
    //   fireEvent.press(getByText("Submit"))

    //   expect(mockFn).toBeCalledWith({
    //     1: { q: "q1", a: "a1" },
    //     2: { q: "q2", a: "a2" }
    //   })
  })
})
