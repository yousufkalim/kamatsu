import { DashboardButton } from "../../components/Button"
import * as html2canvas from "html2canvas"
import DashboardFrame from "../dashboard"
import "./index.css"
import { useState } from "react"
import logo from "../../assets/logo.png"
import jsPdf from "jspdf"


const ResultValue = ({ label, value }) => {
  return (
    <div className="flex mb-6">
      <h4 className="resultLabel font-normal">{label}:</h4>
      <h4 className="ml-4">{value}</h4>
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
    <h4 className="text-[20px] leading-[27px] font-medium mb-6">{title}</h4>
  )
}

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
  return (
    <div>
      <div className="bg-white p-10 rounded-md" id="resultBox">
        <div>
          <ResultValue label="Current Loading Tool" value="WA470" />
          <ResultValue label="Current Hauling Tool" value="HM300" />
          <Line />
        </div>
        <div className="unit_selection_div">
          <p className="reusltLabel">Unit Selection : </p>
          <div className="unit_selection_checkbox_div">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
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
          <Line />
        </div>
        <div>
          <div className="flex">
            <div className="w-1/2">
              <Title title="Loader Dependent Fleet" />
              <ResultValue label="Productivity" value="571 tons/hr" />
              <ResultValue label="Trucks Required" value="6" />
            </div>
            <div>
              <Title title="Truck Dependent Fleet" />
              <ResultValue label="5 Trucks" value="548 tons/hr (96%)" />
              <ResultValue label="4 Trucks" value="440 tons/hr (77%)" />
              <ResultValue label="3 Trucks" value="331 tons/hr (58%)" />
            </div>
          </div>
          <div>
            <Line />
          </div>
        </div>
        <div>
          <Title title="Key Fleet Performance Components" />
          <p>3 passes @ 8.6 tons/pass</p>
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
