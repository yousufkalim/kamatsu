import { useEffect } from "react"
import Chart from "chart.js/auto"
import DashboardFrame from "../dashboard"
import "./index.css"

const Body = () => {
  useEffect(() => {
    const ctx = document.getElementById("graph").getContext("2d")
    let labels = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July"
    ]
    let currentMonth = [100, 200, 300, 400, 500, 600, 700]
    let lastMonth = [1000, 2000, 3000, 4000, 5000, 6000, 7000]

    // Line Chart
    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: ["Current Month"],
            data: currentMonth,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
            pointRadius: 0,
            hitRadius: 10,
            hoverRadius: 10
          },
          {
            label: ["Last Month"],
            data: lastMonth,
            backgroundColor: "rgba(255, 102, 153, 0.1)",
            borderColor: "rgba(255, 102, 153, 1)",
            borderDash: [5, 3],
            borderWidth: 1,
            pointRadius: 0,
            hitRadius: 10,
            hoverRadius: 10
          }
        ]
      },

      // Line Chart options
      options: {
        scales: {
          y: {
            // grid: false,
            ticks: {
              beginAtZero: true,
              callback: function (value, index, array) {
                return value < 1000 ? value : value / 1000 + "K"
              }
            }
          },
          x: {
            gridLines: {
              display: false
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 6
            }
          }
        }
      }
    })
  }, [])

  //   <canvas id="myChart" width="400" height="100"></canvas>
  return (
    <div className="graph">
      <div className="graph-checkboxes">
        <div className="graph-checkboxes-container">
          <div>
            <input type="checkbox" />
            <label htmlFor="">Metric</label>
          </div>
          <div>
            <input type="checkbox" />
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
          <div>
            <p>Fleet productivity (bcm/hr)</p>
          </div>
          <div>
            <canvas id="graph" height="350px"></canvas>
          </div>
        </div>
        <div className="chart-footer">
          <p>Round Trip Travel Time (minutes)</p>
        </div>
      </div>
    </div>
  )
}

const Graph = () => {
  return <DashboardFrame title="Graphical View" body={<Body />} />
}

export default Graph
