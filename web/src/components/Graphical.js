import React from "react"
import { useState } from "react"
import { render } from "react-dom"
import { Line } from "react-chartjs-2"
// import Chart from "./LineChart"
import "./Graphical.css"
import { DashboardButton } from "./Button"
const Graphical = () => {
  const [metric, setMetric] = useState(false)
  const [volume, setVolume] = useState(false)
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
  return (
    <div>
      <div className="checkbox_div">
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            value={metric}
            type="checkbox"
            onChange={HandleMetricChange}
            className="checkbox"
          />
          <p>Metric</p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            value={volume}
            type="checkbox"
            onChange={HandleVolumeChange}
            className="checkbox"
          />
          <p>Volume</p>
        </div>
      </div>
      <div className="chart_div">
        <div className="chart_heading">WA470 x HM300</div>

        <div className="right_label_div">
          <div className="round_parent_div">
            <div
              className="round_div"
              style={{ backgroundColor: "#FF8C00" }}
            ></div>
            5 Trucks
          </div>
          <div className="round_parent_div">
            <div className="round_div" style={{ backgroundColor: "#0000FF" }} />
            6 Trucks
          </div>
          <div className="round_parent_div">
            <div className="round_div" style={{ backgroundColor: "#008000" }} />
            7 Trucks
          </div>
        </div>
        <div>{/* Chart div */}</div>
        <div className="last_text_div">
          <p>Round Trip Travel Time (minutes)</p>
        </div>
      </div>
      <div className="btn_div">
        <div style={{ cursor: "pointer" }}>
          <DashboardButton
            text="Save Results"
            backgroundColor="blue"
            textColor="white"
            url=""
          />
        </div>
      </div>
    </div>
  )
}
export default Graphical
