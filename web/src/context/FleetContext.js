import React, { useState } from "react"

const FleetContext = React.createContext({})

export const FleetProvider = ({ children }) => {
  const [loadingTool, setLoadingTool] = useState()
  const [cycleTime, setCycleTime] = useState()
  const [bucketFill, setBucketFill] = useState()
  const [bucketSize, setBucketSize] = useState()
  const [haulingTool, setHaulingTool] = useState()
  const [nomPayload, setNomPayload] = useState()

  return (
    <FleetContext.Provider
      value={{
        loadingTool,
        setLoadingTool,
        cycleTime,
        setCycleTime,
        bucketFill,
        setBucketFill,
        bucketSize,
        setBucketSize,
        haulingTool,
        setHaulingTool,
        nomPayload,
        setNomPayload
      }}
    >
      {children}
    </FleetContext.Provider>
  )
}

export default FleetContext
