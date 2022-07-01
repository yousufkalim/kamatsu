import { useEffect, useState } from "react"
import Chart from "chart.js/auto"
import DashboardFrame from "../dashboard"
import "./index.css"
import { DashboardButton } from "../../components/Button"
const Body = () => {
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
  useEffect(() => {
    const ctx = document.getElementById("graph").getContext("2d")
    let labels = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20

    ]
    // Line Chart
    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "",
            fill: false,
            data: [6000, 6000, 5000, 4000, 3000, 2000, 1000],
            backgroundColor: "transparent",
            borderColor: "#008000",
            borderWidth: 2,
            pointRadius: 0,
            hitRadius: 10,
            hoverRadius: 10
          },
          {
            label: "",
            data: [5000, 5000, 4000, 3000, 2000, 1000],
            backgroundColor: "transparent",
            borderColor: "#0000FF",
            borderDash: [],
            borderWidth: 2,
            pointRadius: 0,
            hitRadius: 10,
            hoverRadius: 10
          },
          {
            label: "",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "transparent",
            borderColor: "#FF8C00",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [4000, 4000, 3000, 2000, 1000]
          }
        ]
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
    <div className="graph">
      <div className="graph-checkboxes">
        <div className="graph-checkboxes-container">
          <div>
            <input type="checkbox"
              value={metric}
              onChange={HandleMetricChange}
              className="checkbox"
            />
            <label htmlFor="">Metric</label>
          </div>
          <div>
            <input type="checkbox"
              value={volume}
              onChange={HandleVolumeChange}
              className="checkbox"
            />
            <label htmlFor="">Volume</label>
          </div>
        </div>
      </div>
      <div className="chart-container">
        <div className="chart-header">
          <h2>WA470 x HM300</h2>
          <ul>
            <li>
              <span className="bullet orange" /> 5 Trucks
            </li>
            <li>
              <span className="bullet blue" /> 6 Trucks
            </li>
            <li>
              <span className="bullet green" /> 7 Trucks
            </li>
          </ul>
        </div>
        <div className="chart-body">
          <div className="chart_left_text">
            <p>Fleet productivity (bcm/hr)</p>
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
