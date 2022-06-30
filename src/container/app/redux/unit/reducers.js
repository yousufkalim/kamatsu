import * as types from "./constants"

const initialState = {
  unitFleet: { label: "Metric", value: "Metric" },
  unitSite: { label: "Metric", value: "Metric" }
}

export default unitReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_UNIT_FLEET:
      return {
        ...state,
        unitFleet: action.payload
      }

    case types.SET_UNIT_SITE:
      return {
        ...state,
        unitSite: action.payload
      }

    default:
      return state
  }
}
