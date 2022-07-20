import * as types from "./constants"

const initialState = {
  siteValues: {},
  materialDensity: { us: "3000.0", metric: "1779.8" }
}

export default siteDefinitionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SITE_VALUES:
      return {
        ...state,
        siteValues: action.payload
      }

    case types.SET_MATERIAL_DENSITY:
      return {
        ...state,
        materialDensity: action.payload
      }
    default:
      return state
  }
}
