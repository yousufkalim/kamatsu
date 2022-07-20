import * as types from "./constants"

export const setSiteValuesAction = data => ({
  type: types.SET_SITE_VALUES,
  payload: data
})


export const setMaterialDensityAction = data => ({
  type: types.SET_MATERIAL_DENSITY,
  payload: data
})
