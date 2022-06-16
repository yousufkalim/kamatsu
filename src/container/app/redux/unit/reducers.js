import * as types from "./constants"

const initialState = {
  unit: { label: "Metric", value: "Metric" }
}

export default unitReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_UNIT:
      return {
        ...state,
        unit: action.payload
      }

    default:
      return state
  }
}
