import { DashboardButton } from "../../components/Button"
import * as html2canvas from "html2canvas"
import DashboardFrame from "../dashboard"
import "./index.css"
import { useState, useEffect } from "react"
import logo from "../../assets/logo.png"
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
      <h4 className="text-[20px] leading-[27px] font-medium mb-6 title">{title}</h4>
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
    unit,
    loadingToolOptions,
    ldNumberOfTrucks,
    trucks,
    tonsPerScope,
    scopePerLoad,
    haulagePerhour
  } = Store()
  useEffect(() => {
    handleLoadingName()
  }, [])
  const handleLoadingName = () => {
    const name = loadingToolOptions.find((item) => {
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
    const domElement = document.getElementById("resultBox");
    html2canvas(domElement, {
      onclone: document => {
        document.getElementById("print").style.visibility = "hidden";
      }
    }).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPdf();
      pdf.setFillColor(40, 43, 56);
      pdf.addImage(logo, "PNG", 65, 15, 80, 15);
      // first from Left
      // second from Top
      // Third from width
      // Fourth from heigth
      pdf.addImage(imgData, "JPEG", 10, 50, 250, 100);
      pdf.save(`${new Date().toISOString()}.pdf`);
    });
  };
  useEffect(() => {
    if (unit === "metric") {
      setMetric(true)
    } else if (unit === "us") {
      setMetric(false)
    }
  }, [unit])
  return (
    <div>
      <div className="bg-white p-10 rounded-md" id="resultBox">
        <div>
          <ResultValue label="Current Loading Tool" value={loadingToolName} />
          <ResultValue label="Current Hauling Tool" value={haulingTool} />
          <Line />
        </div>
        <div className="unit_selection_div">
          <p className="label">Unit Selection : </p>
          <div className="unit_selection_checkbox_div">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
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
        <div>
          <div className="flex">
            <div className="w-1/2">
              <Title title="Loader Dependent Fleet" />
              {metric && !volume ?
                <ResultValue label="Productivity" value={`${haulagePerhour?.metric_without_volume} Tonnes/hr`} />
                : !metric && volume ?
                  <ResultValue label="Productivity" value={`${haulagePerhour?.us} bcy/hr`} />
                  : !metric && !volume ?
                    <ResultValue label="Productivity" value={`${haulagePerhour?.us_without_volume} Tons/hr`} />
                    : metric && volume ?
                      <ResultValue label="Productivity" value={`${haulagePerhour?.metric} bcm/hr`} />
                  : ""} 
              {metric ?
                <ResultValue label="Trucks Required" value={ldNumberOfTrucks?.metric} />
                :
                <ResultValue label="Trucks Required" value={ldNumberOfTrucks?.us} />
              }
            </div>
            <div>
              <Title title="Truck Dependent Fleet" />
              {trucks.map((item) => {
                return metric ?
                  <ResultValue label={item.name} value={`${item.value_metric} Tonnes/hr (${item.percentage}%)`} /> 
                  : !metric ?
                    <ResultValue label={item.name} value={`${item.value_us} Tons/hr (${item.percentage}%)`} />
                    : ""
              })}
            </div>
          </div>
          <div>
            <Line />
          </div>
        </div>
        <div>
          <Title title="Key Fleet Performance Components" />

          {metric ?
              <p className="checkbox_text">{scopePerLoad.metric} passes @ {parseFloat(tonsPerScope.metric).toFixed(1)} Tonnes/pass</p>
            : !metric ?
              <p className="checkbox_text">{scopePerLoad.us} passes @ {parseFloat(tonsPerScope.us).toFixed(1)} Tons/pass</p>
              : ""}
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
