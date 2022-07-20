import DashboardFrame from "../dashboard"
import { Input } from "../../components/Input"
import { DashboardButton } from "../../components/Button"
import DropDown from "../../components/Dropdown"
import axios from "axios"
import { useContext, useEffect, useState, useRef } from "react"
// import Fll from "../../context/ParametersContext";
import "./index.css"
import { baseURL } from "../../api"
import { Store, UpdateStore } from "../../StoreContext"

const Form = () => {
  const {
    loadingTool,
    cycleTime,
    bucketFill,
    bucketSize,
    bucketSizeYd,
    haulingTool,
    nomPayload,
    unit,
    loadingTools,
    haulingTools,
    haulingToolOptions,
    parameters_unit,
    loadingToolOptions,
    loadingToolCostPerHour,
    haulingToolCostPerHour
  } = Store()
  const updateStore = UpdateStore()
  const [loadingToolsIsLoading, setLoadingToolsIsLoading] = useState(true)
  const [HaulingToolsIsLoading, setHaulingToolsIsLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [bigHaulingOptions, setBigLHaulingOptions] = useState([])

  const fetchLoadingTools = () => {
    axios
      .get(`${baseURL}hat/loading-tools/`)
      .then(res => {
        updateStore({
          loadingToolOptions: res.data?.map(a => ({
            value: a.id,
            label: a.name
          })),
          loadingTools: res.data
        })
      })
      .then(setLoadingToolsIsLoading(false))
  }

  const fetchHaulingTools = e => {
    setHaulingToolsIsLoading(true)
    axios
      .get(`${baseURL}hat/loading-tools/${e || loadingTool}/hauling-tools/`)
      .then(res => {
        updateStore({
          haulingTools: res.data,
          haulingToolOptions: res.data.map(tool => ({
            value: tool.name,
            label: tool.name
          })),
          haulingTool: haulingTool,
          nomPayload: nomPayload
        })
        setHaulingToolsIsLoading(false)
      })
  }

  const fetchAssociatedLoading = async e => {
    await axios
      .get(`${baseURL}hat/loading-tools/${e || loadingTool}/`)
      .then(res => {
        updateStore({
          bucketFill: res.data.bucket_fill,
          cycleTime: res.data.cycle_time_second,
          loadingToolCostPerHour: parseFloat(res.data.cost_per_hour).toFixed(1),
          bucketSizeYd: parseFloat(res.data.bucket_size_yd3).toFixed(1),
          bucketSize: parseFloat(
            res.data.metric_standard.bucket_size_m3
          ).toFixed(1)
        })

        fetchHaulingTools(e)
      })
      .catch(err => {
        console.log(err)
      })
  }

  //   On hauling tool change
  const onHaulingToolChange = e => {
    let weight

    if (!e) return null

    if (unit === "metric") {
      weight = haulingTools.filter(a => a.name === e)[0]?.metric_standard
        .capacity_tonne
    } else {
      // convert to tonne
      weight = haulingTools.filter(a => a.name === e)[0]?.capacity_ton
    }

    updateStore({
      haulingTool: e,
      nomPayload: parseFloat(weight).toFixed(1) || "",
      haulingToolCostPerHour: parseFloat(
        haulingTools.filter(a => a.name === e)[0]?.cost_per_hour
      ).toFixed(1)
    })
  }

  const fetchAssociatedHaulingToolDetail = async () => {
    await axios
      .get(`${baseURL}hat/loading-tools/${loadingTool}/`)
      .then(res => {
        updateStore({ nomPayload: res.data.capacity_ton })
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchLoadingTools()
  }, [])

  const changeUnit = e => {
    updateStore({ unit: e, parameters_unit: e })

    if (e === "us") {
      updateStore({
        bucketSize:
          bucketSize &&
          parseFloat(
            loadingTools.filter(a => a.id === loadingTool)[0]?.bucket_size_yd3
          ).toFixed(1),
        nomPayload:
          nomPayload &&
          parseFloat(
            haulingTools.filter(a => a.name === haulingTool)[0]?.capacity_ton
          ).toFixed(1)
      })
    } else if (e === "metric") {
      updateStore({
        bucketSize:
          bucketSize &&
          parseFloat(
            loadingTools.filter(a => a.id === loadingTool)[0]?.metric_standard
              .bucket_size_m3
          ).toFixed(1),
        nomPayload:
          nomPayload &&
          parseFloat(
            haulingTools.filter(a => a.name === haulingTool)[0]?.metric_standard
              .capacity_tonne
          ).toFixed(1)
      })
    }
  }

  const handleInput = e => {
    // Don't allow more than one decimal point
    if (e.target.value.includes(".")) {
      e.target.value = e.target.value.substring(
        0,
        e.target.value.indexOf(".") + 2
      )
    }
    // don't allow alphabetical characters
    if (!e.target.value.match(/[a-z]/i)) {
      updateStore({ [e.target.name]: e.target.value })
    }
  }

  const UnitOptions = [
    {
      label: "Metric",
      value: "metric"
    },
    {
      label: "US Customary",
      value: "us"
    }
  ]

  return (
    <div>
      <div className="w-1/2 gap-8 md:w-1/4 mb-6">
        <label className="block text-smaller mb-1 font-normal">
          Unit Selection
        </label>
        <DropDown
          options={UnitOptions}
          onChange={e => changeUnit(e.value)}
          defaultValue={() => UnitOptions.filter(a => a.value === unit)[0]}
        />
      </div>
      <div className="flex gap-8">
        <div className="w-1/2">
          <label className="block text-smaller mb-1 font-normal">
            Loading Tool
          </label>
          <DropDown
            options={loadingToolOptions}
            defaultValue={
              loadingToolOptions.filter(a => a.value === loadingTool)[0]
            }
            // onChange={(e)=>fetchAssociatedLoading(e)}
            onChange={e => {
              updateStore({ loadingTool: e.value })
              fetchAssociatedLoading(e.value)
            }}
          />
        </div>
        <div className="w-1/2">
          <label className="block text-smaller mb-1 font-normal">
            Cycle Time (Sec)
          </label>
          <Input
            onChange={handleInput}
            name="cycleTime"
            type="text"
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
              onChange={handleInput}
              name="bucketFill"
              type="text"
              value={bucketFill}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-smaller mb-1 font-normal">
              Bucket Size ({unit === "metric" ? "m" : "y"}
              <sup>3</sup>)
            </label>
            <Input
              onChange={handleInput}
              name={unit === "metric" ? "bucketSize" : "bucketSizeYd"}
              value={unit === "metric" ? bucketSize : bucketSizeYd}
              type="text"
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
              options={haulingToolOptions}
              onChange={e => {
                onHaulingToolChange(e.value)
              }}
              defaultValue={
                haulingToolOptions.filter(a => a.value === haulingTool)[0]
              }
              value={haulingTool ? undefined : null}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm mb-1 font-normal">
              Nom. Payload {unit === "metric" ? "(Tonnes)" : "(Tons)"}
            </label>
            <Input
              onChange={handleInput}
              type="text"
              name="nomPayload"
              value={nomPayload}
            />
          </div>
        </div>
        <div className="flex justify-center md:justify-end mb-8">
          <DashboardButton
            text="Reset Truck"
            backgroundColor="yellow"
            url=""
            onClick={() => onHaulingToolChange(haulingTool)}
          />
        </div>
        <div className="flex justify-center md:justify-end mb-8">
          <DashboardButton
            text="Next"
            backgroundColor="blue"
            textColor="white"
            disabled={
              !loadingTool ||
              !cycleTime ||
              !bucketFill ||
              !bucketSize ||
              !nomPayload ||
              !haulingTool
            }
            // onClick={fetchSiteParameters}
            url="/parameters"
          />
        </div>
      </div>
    </div>
  )
}

const FleetDefinition = () => {
  return (
    <DashboardFrame title="Fleet Definition" homePage={true} body={<Form />} />
  )
}

export default FleetDefinition
