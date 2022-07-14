// Init
import React, { useContext, useState, createContext } from "react"

// Initializing Create Context Hook
const storeContext = createContext()
const storeUpdateContext = createContext()

// We are also initializing useContexts here then we only call these functions where we need that data
export function Store() {
  return useContext(storeContext)
}

export function UpdateStore() {
  return useContext(storeUpdateContext)
}

// Initializing Store Provider
export function StoreProvider({ children }) {
  // Initializing State
  let [store, setStore] = useState({
    loadingTool: "",
    cycleTime: "",
    bucketFill: "",
    bucketSize: "",
    bucketSizeYd: "",
    haulingTool: "",
    nomPayload: "",
    unit: "metric",
    loadingTools: [],
    haulingTools: [],
    haulingToolOptions: [],
    loadingToolOptions: [],
    loadingToolCostPerHour: "",

    // permanent values
    parameters_unit: "metric",
    materialDensity: "",
    truckSpotTime: "",
    operatorEfficiency: "",
    estRoundTripTravel: "",
    materialSwell: "",
    haulingToolCostPerHour: "",

    //result page 
    haulagePerhour: {},
    haulagePerWeight: {},
    ldNumberOfTrucks: {},
    ldUnitPerCostHour: {},
    loadSize: {},
    minutesPerLoad: {},
    scopePerLoad: {},
    tonsPerScope: {},
    unitsPerHours: {},
    trucks: [],
  })

  const updateStore = data => {
    setStore(prev => {
      return {
        ...prev,
        ...data
      }
    })
  }

  // Render
  return (
    <storeContext.Provider value={store}>
      <storeUpdateContext.Provider value={updateStore}>
        {children}
      </storeUpdateContext.Provider>
    </storeContext.Provider>
  )
}
