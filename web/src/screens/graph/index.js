import { useEffect, useState } from "react"
import Chart from "chart.js/auto"
import DashboardFrame from "../dashboard"
import "./index.css"
import { DashboardButton } from "../../components/Button"
import { Store } from "../../StoreContext"
import logo from "../../assets/logo.png"
import * as html2canvas from "html2canvas"
import jsPdf from "jspdf"
const Body = () => {
  const [metric, setMetric] = useState(false)
  const [volume, setVolume] = useState(false)
  const [loadingToolName, setLoadingToolName] = useState("")
  const [maxRttt, setMaxRttt] = useState(0.7)
  const [truckColor, setTruckColor] = useState("red")
  console.log("----->truckColor", truckColor)
  const {
    estRoundTripTravel,
    haulagePerhour,
    loadingToolOptions,
    haulingTool,
    parameters_unit,
    loadingTool,
    trucks,
  } = Store()
  useEffect(() => {
    handlemaxLdRttt()
    handleLoadingName()
    if (loadingToolName === "" && haulingTool === "") {
      window.location = "/fleet-definition"
    }
  }, [])

  useEffect(() => {
    if (parameters_unit === "metric") {
      setMetric(true)
    } else if (parameters_unit === "us") {
      setMetric(false)
    }
  }, [parameters_unit])

  // func for finding name of loadingTool againist it's ID
  const handleLoadingName = () => {
    const name = loadingToolOptions.find((item) => {
      return item?.value === loadingTool
    })?.label
    setLoadingToolName(name)
  }

// func for metric checkbox
  const HandleMetricChange = e => {
    if (e.target.checked === true) {
      setMetric(true)
    } else {
      setMetric(false)
    }
  }
// func for volume checkbox
  const HandleVolumeChange = e => {
    if (e.target.checked === true) {
      setVolume(true)
    } else {
      setVolume(false)
    }
  }
  // func for  maxLdRttt 
  const handlemaxLdRttt = () => {
      trucks.map((item) => {
        setMaxRttt(item.max_ld_rttt)
      })
  }

  useEffect(() => {
    let color = "";
    trucks.map((item) => {
      if (item.length !== 0) {
        color = `#${Math.floor(Math.random() * 16777215).toString(16)}`
        setTruckColor(color);
      }
    })

    let labels = [0]
    let rtt = trucks.sort((a, b) => b.max_ld_rttt - a.max_ld_rttt)[0]?.max_ld_rttt
    let haulage = metric && !volume ? haulagePerhour.metric
      : !metric && volume ? haulagePerhour.is_volume.metric
        : !metric && !volume ? haulagePerhour.us
          : metric && volume && haulagePerhour.is_volume.us

    // console.log("Sorted trucks --> ", rtt)

    for (let i = 0; i <= (rtt * 10) + 4; i++) {
      let label = labels[labels.length - 1] + 0.1

      labels.push(parseFloat(label.toFixed(1)))
    }


    let dataSet = trucks.map(truck => {
      let data = []
      let lastIndexOfTruth;
      for (let i = 0; i < labels.length; i++) {
        if (truck.max_ld_rttt >= labels[i]) {
          data.push(haulage)
          lastIndexOfTruth = i
        } else {
          let diff = labels.length - lastIndexOfTruth
          data.push(data[i - 1] - haulage / diff)
        }
      }

      return {
        label: "",
        data: data,
        backgroundColor: "transparent",
        borderColor: `${color}`,
        borderWidth: 2,
        pointRadius: 0,
        hitRadius: 10,
        hoverRadius: 10
      }
    })

    console.log("---->", dataSet)

    const ctx = document.getElementById("graph").getContext("2d")

    // Line Chart
    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: dataSet
      },

      // Line Chart options

      options: {
        plugins: { legend: { display: false } },
        scales: {
          y: {
            ticks: {
              beginAtZero: true,
              callback: function (value, index, array) {
                return value < 1000 ? value : value / 1000 + "K"
              }
            },
            grid: {
              display: false
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    })
  }, [])

  return (
    <div className="graph" >
      <div className="graph-checkboxes">
        <div className="graph-checkboxes-container">
          <div>
            <input type="checkbox"
              checked={metric}
              onChange={HandleMetricChange}
              className="checkbox"
            />
            <label htmlFor="">Metric</label>
          </div>
          <div>
            <input type="checkbox"
              checked={volume}
              onChange={HandleVolumeChange}
              className="checkbox"
            />
            <label htmlFor="">Volume</label>
          </div>
        </div>
      </div>
      <div className="chart-container">
        <div className="chart-header">
          <h2>{loadingToolName} x {haulingTool}</h2>
          <ul>
          {trucks.map((item) => {
            return <li>
                {/* <span style={{ color: `${truckColor}` }} />  */}
                <div className="bullet" style={{ backgroundColor: `${truckColor}` }} /> 
                {item.name}
            </li>
          })}
          </ul>

        </div>
        <div className="chart-body">
          <div className="chart_left_text">
            {metric && !volume ?
              <p>Fleet productivity (Tonnes/hr)</p>
              : !metric && volume ?
                <p>Fleet productivity (bcy/hr)</p>
                : !metric && !volume ?
                  <p>Fleet productivity (Tons/hr)</p>
                  : metric && volume ?
                    <p>Fleet productivity (bcm/hr)</p>
                    : ""}

          </div>
          <div className="wrapper">
            <canvas id="graph" height="350px" ></canvas>
          </div>
        </div>
        <div className="chart-footer">
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

const Graph = () => {
  return (
    <DashboardFrame
      title="Graphical View"
      body={<Body />}
      backButtonURL="/result"
    />
  )
}

export default Graph
