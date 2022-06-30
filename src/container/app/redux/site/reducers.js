import * as types from "./constants"

const initialState = {
  siteValues: {}
}

export default siteDefinitionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SITE_VALUES:
      return {
        ...state,
        siteValues: action.payload
      }
    default:
      return state
  }
}
