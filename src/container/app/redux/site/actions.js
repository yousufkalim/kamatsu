import * as types from "./constants"

export const setSiteValuesAction = data => ({
  type: types.SET_SITE_VALUES,
  payload: data
})

export const saveSiteInitialValues = data => ({
  type: types.SAVE_SITE_INITIAL_VALUES,
  payload: data
})

export const resetSiteInitialValues = () => ({
  type: types.RESET_SITE_INITIAL_VALUES
})
