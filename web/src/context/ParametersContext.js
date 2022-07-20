import React, { useState } from "react"

const ParametersContext = React.createContext({ })

export const ParametersProvider = ({children})=>{
    const [materialDensity, setMaterialDensity] = useState(3000)
    const [truckSpotTime, setTruckSpotTime] = useState(15)
    const [operatorEfficiency, setOperatorEfficiency] = useState(50)
    const [estRoundTripTravel, setEstRoundTripTravel] = useState(10)
    const [materialSwell, setMaterialSwell] = useState(20)

    return (
      <ParametersContext.Provider
        value={{
          materialDensity,
          setMaterialDensity,
          truckSpotTime,
          setTruckSpotTime,
          operatorEfficiency,
          setOperatorEfficiency,
          estRoundTripTravel,
          setEstRoundTripTravel,
          materialSwell,
          setMaterialSwell
        }}
      >
        {children}
      </ParametersContext.Provider>
    )
}

export default ParametersContext;