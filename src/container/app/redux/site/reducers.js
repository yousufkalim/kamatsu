import * as types from "./constants"

const initialState = {
  siteValues: {},
  materialDensity: { us: "3000.0", metric: "1779.8" },
  materialSwell: "20",
  operatorEfficiency: "50",
  truckSpotTime: "15",
  roundTripTravelTime: "10"
}

export default siteDefinitionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SITE_VALUES:
      return {
        ...state,
        siteValues: action.payload
      }

    case types.SAVE_SITE_INITIAL_VALUES:
      return {
        ...state,
        materialDensity: action.payload.materialDensity,
        materialSwell: action.payload.materialSwell,
        operatorEfficiency: action.payload.operatorEfficiency,
        truckSpotTime: action.payload.truckSpotTime,
        roundTripTravelTime: action.payload.roundTripTravelTime
      }

    case types.RESET_SITE_INITIAL_VALUES:
      return {
        ...state,
        materialDensity: { us: "3000.0", metric: "1779.8" },
        materialSwell: "20",
        operatorEfficiency: "50",
        truckSpotTime: "15",
        roundTripTravelTime: "10"
      }
      
    default:
      return state
  }
}
