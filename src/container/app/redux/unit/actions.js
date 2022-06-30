import * as types from "./constants"

export const setUnitFleetAction = data => ({
  type: types.SET_UNIT_FLEET,
  payload: data
})

export const setUnitSiteAction = data => ({
  type: types.SET_UNIT_SITE,
  payload: data
})
