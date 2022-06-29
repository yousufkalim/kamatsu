import React from "react"
import DashboardFrame from "../dashboard"
import Graphical from "../../components/Graphical"

const GraphicalView = () => {
  return (
    <DashboardFrame
      title="Graphical View"
      body={<Graphical />}
      displayBackButton={true}
      backButtonURL="/parameters"
    />
  )
}

export default GraphicalView
