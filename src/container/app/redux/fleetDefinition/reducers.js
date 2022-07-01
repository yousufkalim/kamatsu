import * as types from "./constants"

const initialState = {
  fleetValues: {}
}

export default fleetDefinitionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_FLEET_VALUES:
      return {
        ...state,
        fleetValues: action.payload
      }
    default:
      return state
  }
}
