import DashboardFrame from "../dashboard"
import { Input, InputContainer, CustomSelect } from "../../components/Input"
import { DashboardButton } from "../../components/Button"
import DropDown from "../../components/Dropdown"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
// import Fll from "../../context/ParametersContext";
import FleetContext from "../../context/FleetContext"
import "./index.css"
import { baseURL } from "../../api"

const Form = () => {
  const [loadingTools, setLoadingTools] = useState([])
  const [loadingToolsIsLoading, setLoadingToolsIsLoading] = useState(true)
  const [haulingTools, setHaulingTools] = useState([])
  const [HaulingToolsIsLoading, setHaulingToolsIsLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [bigHaulingOptions, setBigLHaulingOptions] = useState([])

  const {
    loadingTool,
    setLoadingTool,
    cycleTime,
    setCycleTime,
    bucketFill,
    setBucketFill,
    bucketSize,
    setBucketSize,
    haulingTool,
    setHaulingTool,
    nomPayload,
    setNomPayload
  } = useContext(FleetContext)

  const fetchLoadingTools = () => {
    axios
      .get(`${baseURL}hat/loading-tools/`)
      .then(res => setLoadingTools(res.data))
      .then(setLoadingToolsIsLoading(false))
  }

  const fetchHaulingTools = e => {
    setHaulingToolsIsLoading(true)
    axios
      .get(`${baseURL}hat/loading-tools/${e || loadingTool}/hauling-tools/`)
      .then(res => {
        setHaulingTools(res.data)
        console.log(haulingTools)
        setHaulingToolsIsLoading(false)

        setBigLHaulingOptions(
          res.data.map(tool => ({ value: tool.name, label: tool.name }))
        )
      })
  }

  const fetchAssociatedLoading = async e => {
    await axios
      .get(`${baseURL}hat/loading-tools/${e || loadingTool}/`)
      .then(res => {
        console.log(res.data.bucket_fill)
        setBucketFill(res.data.bucket_fill)
        console.log(bucketFill)
        setCycleTime(res.data.cycle_time_second)
        setBucketSize(res.data.bucket_size_yd3)
        console.log(nomPayload)
        fetchHaulingTools(e)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const fetchAssociatedHaulingToolDetail = async () => {
    await axios
      .get(`${baseURL}hat/loading-tools/${loadingTool}/`)
      .then(res => {
        console.log(res.data.bucket_fill)
        setNomPayload(res.data.capacity_ton)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchLoadingTools()
  }, [])

  let loadingOptions = []
  if (!loadingToolsIsLoading) {
    loadingTools.map(tool => {
      let toolData = {}
      toolData.value = tool.id
      toolData.label = tool.name
      loadingOptions.push(toolData)
    })
  }

  const UnitOptions = [
    {
      label: "Metric",
      value: "metric"
    },
    {
      label: "US Customary",
      value: "customary"
    }
  ]

  return (
    <div>
      <div className="w-1/2 gap-8 md:w-1/4 mb-6">
        <label className="block text-smaller mb-1 font-normal">
          Unit Selection
        </label>
        <DropDown options={UnitOptions} defaultValue={UnitOptions[0]} />
      </div>
      <div className="flex gap-8">
        <div className="w-1/2">
          <label className="block text-smaller mb-1 font-normal">
            Loading Tool
          </label>
          <DropDown
            options={loadingOptions}
            // onChange={(e)=>fetchAssociatedLoading(e)}
            onChange={e => {
              setLoadingTool(e.value)
              fetchAssociatedLoading(e.value)
            }}
          />
        </div>
        <div className="w-1/2">
          <label className="block text-smaller mb-1 font-normal">
            Cycle Time (Sec)
          </label>
          <Input
            onChange={e => setCycleTime(e.target.value)}
            //placeholder="0.95"
            className="mb-6"
            value={cycleTime}
          />
        </div>
      </div>
      <div>
        <div className="flex gap-8 mb-8">
          <div className="w-1/2">
            <label className="block text-smaller mb-1 font-normal">
              Bucket Fill (%)
            </label>
            <Input
              onChange={e => {
                setBucketFill(e.target.value)
              }}
              //placeholder="0.95"
              // className="mb-6"
              value={bucketFill}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-smaller mb-1 font-normal">
              Bucket Size (m<sup>3</sup>)
            </label>
            <Input
              onChange={e => setBucketSize(e.target.value)}
              //placeholder="0.95"
              value={bucketSize}
            />
          </div>
        </div>
        <div className="flex justify-center  md:justify-end mb-8">
          <DashboardButton
            text="Reset Loader"
            backgroundColor="yellow"
            url=""
            onClick={() => fetchAssociatedLoading()}
          />
        </div>
      </div>
      <div>
        <div className="flex gap-8 mb-8">
          <div className="w-1/2">
            <label className="block text-sm mb-1 font-normal">
              Hauling Tool
            </label>
            <DropDown
              options={bigHaulingOptions}
              onChange={e => setHaulingTool(e.value)}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm mb-1 font-normal">
              Nom. Payload (Tons)
            </label>
            <Input
              onChange={e => {
                setNomPayload(e.target.value)
                console.log(nomPayload)
              }}
              //placeholder="0.95"
              // className="mb-6"
              value={nomPayload}
            />
          </div>
        </div>
        <div className="flex justify-center md:justify-end mb-12">
          <DashboardButton text="Reset Truck" backgroundColor="yellow" url="" />
        </div>
        <div className="flex justify-center md:justify-end mb-8">
          <DashboardButton
            text="Next"
            backgroundColor="blue"
            textColor="white"
            url="/parameters"
          />
        </div>
      </div>
    </div>
  )
}

const FleetDefinition = () => {
  return <DashboardFrame title="Fleet Definition" body={<Form />} />
}

export default FleetDefinition
