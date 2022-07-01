
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./screens/landing"
import DashboardFrame from "./screens/dashboard"
import FleetDefinition from "./screens/home"
import About from "./screens/about"
import Feedback from "./screens/feedback"
import Results from "./screens/results"
import Parameters from "./screens/parameters"
import Graph from "./screens/graph"
import { ParametersProvider } from "./context/ParametersContext"
import { FleetProvider } from "./context/FleetContext"
import { useContext } from "react"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <div>
      <Toaster />
      <BrowserRouter>
        <FleetProvider>
          <ParametersProvider>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/dashboard" element={<DashboardFrame />} />
              <Route path="/fleet-definition" element={<FleetDefinition />} />
              <Route path="/about" element={<About />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/parameters" element={<Parameters />} />
              <Route path="/graphical-view" element={<Graph />} />
              <Route path="/result" element={<Results />} />
            </Routes>
          </ParametersProvider>
        </FleetProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
