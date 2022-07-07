import { DashboardButton } from "../../components/Button"
import DashboardFrame from "../dashboard"
import "./index.css"
import { useState, useEffect } from "react"
import logo from "../../assets/logo.png"
import * as html2canvas from "html2canvas"
import jsPdf from "jspdf"
import { Store } from "../../StoreContext"

const ResultValue = ({ label, value }) => {
  return (
    <div className="flex mb-6">
      <label className="font-normal label">{label}:</label>
      <label className="ml-4 value">{value}</label>
    </div>
  )
}

const Line = () => {
  return (
    <div>
      <hr className="resultLabel mb-8 mt-8 " />
    </div>
  )
}

const Title = ({ title }) => {
  return (
    <>
      <h4 className="text-[20px] leading-[27px] font-medium mb-6 title">
        {title}
      </h4>
    </>
  )
}

const Body = () => {
  const [metric, setMetric] = useState(false)
  const [volume, setVolume] = useState(false)
  const [loadingToolName, setLoadingToolName] = useState("")

  const {
    loadingTool,
    haulingTool,
    parameters_unit,
    loadingToolOptions,
    ldNumberOfTrucks,
    trucks,
    tonsPerScope,
    scopePerLoad,
    haulagePerhour
  } = Store()
  useEffect(() => {
    handleLoadingName()
    if (loadingToolName === "" && haulingTool === "") {
      window.location = "/fleet-definition"
    }
  }, [])
  const handleLoadingName = () => {
    const name = loadingToolOptions.find(item => {
      return item?.value === loadingTool
    })?.label
    setLoadingToolName(name)
  }
  const HandleMetricChange = e => {
    if (e.target.checked === true) {
      setMetric(true)
    } else {
      setMetric(false)
    }
  }
  const HandleVolumeChange = e => {
    if (e.target.checked === true) {
      setVolume(true)
    } else {
      setVolume(false)
    }
  }
  const printPDF = () => {
    const domElement = document.getElementById("resultBox")
    html2canvas(domElement, {
      onclone: document => {
        document.getElementById("print").style.visibility = "hidden"
        document.getElementById("unit_selection").style.display = "none"
      }
    }).then(canvas => {
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPdf()
      pdf.setFillColor(40, 43, 56)
      pdf.addImage(logo, "PNG", 65, 15, 80, 15)
      // first from Left
      // second from Top
      // Third from width
      // Fourth from heigth
      pdf.addImage(imgData, "JPEG", 10, 50, 250, 100)
      pdf.save(`Komatsu_HAT_${loadingToolName}_${haulingTool}.pdf`)
    })
  }
  useEffect(() => {
    if (parameters_unit === "metric") {
      setMetric(true)
    } else if (parameters_unit === "us") {
      setMetric(false)
    }
  }, [parameters_unit])
  return (
    <div>
      <div className="bg-white p-10 rounded-md" id="resultBox">
        <div>
          <ResultValue label="Current Loading Tool" value={loadingToolName} />
          <ResultValue label="Current Hauling Tool" value={haulingTool} />
          <Line />
        </div>
        <div id="unit_selection">
          <div className="unit_selection_div">
            <p className="label">Unit Selection : </p>
            <div className="unit_selection_checkbox_div">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <input
                  checked={metric}
                  type="checkbox"
                  onChange={HandleMetricChange}
                  className="checkbox"
                />
                <p className="checkbox_text">Metric</p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  checked={volume}
                  type="checkbox"
                  onChange={HandleVolumeChange}
                  className="checkbox"
                />
                <p className="checkbox_text">Volume</p>
              </div>
            </div>
          </div>
          <Line />
        </div>
        <div>
          <div className="flex">
            <div className="w-1/2">
              <Title title="Loader Dependent Fleet" />
              {metric && !volume ? (
                <ResultValue
                  label="Productivity"
                  value={`${haulagePerhour?.metric} tonnes/hr`}
                />
              ) : !metric && volume ? (
                <ResultValue
                  label="Productivity"
                  value={`${haulagePerhour?.is_volume?.us} bcy/hr`}
                />
              ) : !metric && !volume ? (
                <ResultValue
                  label="Productivity"
                  value={`${haulagePerhour?.us} tons/hr`}
                />
              ) : metric && volume ? (
                <ResultValue
                  label="Productivity"
                  value={`${haulagePerhour?.is_volume?.metric} bcm/hr`}
                />
              ) : (
                ""
              )}
              {metric ? (
                <ResultValue
                  label="Trucks Required"
                  value={ldNumberOfTrucks?.metric}
                />
              ) : (
                <ResultValue
                  label="Trucks Required"
                  value={ldNumberOfTrucks?.us}
                />
              )}
            </div>
            <div>
              <Title title="Truck Dependent Fleet" />
              {trucks.map(item => {
                return metric && !volume ? (
                  <ResultValue
                    label={item.name}
                    value={`${item.metric} tonnes/hr (${item.percentage}%)`}
                  />
                ) : !metric && volume ? (
                  <ResultValue
                    label={item.name}
                    value={`${item.is_volume.us} bcy/hr (${item.percentage}%)`}
                  />
                ) : !metric && !volume ? (
                  <ResultValue
                    label={item.name}
                    value={`${item.us} tons/hr (${item.percentage}%)`}
                  />
                ) : metric && volume ? (
                  <ResultValue
                    label={item.name}
                    value={`${item.is_volume.metric} bcm/hr (${item.percentage}%)`}
                  />
                ) : (
                  ""
                )
              })}
            </div>
          </div>
          <div>
            <Line />
          </div>
        </div>
        <div>
          <Title title="Key Fleet Performance Components" />

          {metric ? (
            <p className="checkbox_text">
              {scopePerLoad.metric} passes @{" "}
              {parseFloat(tonsPerScope.metric).toFixed(1)} tonnes/pass
            </p>
          ) : !metric ? (
            <p className="checkbox_text">
              {scopePerLoad.us} passes @{" "}
              {parseFloat(tonsPerScope.us).toFixed(1)} tons/pass
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-8">
        <DashboardButton
          text="Graphical View"
          backgroundColor="yellow"
          textColor="black"
          url="/graphical-view"
        />
        <DashboardButton
          id="print"
          text="Save Results"
          backgroundColor="blue"
          textColor="white"
          url=""
          onClick={printPDF}
        />
      </div>
    </div>
  )
}

const Results = () => {
  return (
    <DashboardFrame
      title="Results"
      body={<Body />}
      backButtonURL="/parameters"
    />
  )
}

export default Results
