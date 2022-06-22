import DashboardFrame from "../dashboard"
import { Input, InputContainer, CustomSelect } from "../../components/Input"
import { DashboardButton } from "../../components/Button"
import DropDown from "../../components/Dropdown"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
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
    haulingTool,
    nomPayload,
    unit,
    loadingTools,
    haulingTools,
    haulingToolOptions
  } = Store()
  const updateStore = UpdateStore()
  const [loadingToolsIsLoading, setLoadingToolsIsLoading] = useState(true)
  const [HaulingToolsIsLoading, setHaulingToolsIsLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [bigHaulingOptions, setBigLHaulingOptions] = useState([])

  const fetchLoadingTools = () => {
    axios
      .get(`${baseURL}hat/loading-tools/`)
      .then(res =>
        updateStore({
          loadingTools: res.data?.map(a => ({ value: a.id, label: a.name }))
        })
      )
      .then(setLoadingToolsIsLoading(false))
  }

  const fetchHaulingTools = e => {
    setHaulingToolsIsLoading(true)
    axios
      .get(`${baseURL}hat/loading-tools/${e || loadingTool}/hauling-tools/`)
      .then(res => {
        updateStore({ haulingTools: res.data })
        updateStore({
          haulingToolOptions: res.data.map(tool => ({
            value: tool.name,
            label: tool.name
          }))
        })
        setHaulingToolsIsLoading(false)
      })
  }

  const fetchAssociatedLoading = async e => {
    await axios
      .get(`${baseURL}hat/loading-tools/${e || loadingTool}/`)
      .then(res => {
        updateStore({ bucketFill: res.data.bucket_fill })
        updateStore({ cycleTime: res.data.cycle_time_second })
        if (unit === "metric") {
          updateStore({
            bucketSize: parseInt(
              res.data.metric_standard.bucket_size_m3
            ).toFixed(1)
          })
        } else {
          updateStore({
            bucketSize: parseInt(res.data.bucket_size_yd3).toFixed(1)
          })
        }

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
    updateStore({ unit: e })

    if (bucketSize && e === "customary") {
      updateStore({ bucketSize: (bucketSize * 1.308).toFixed(1) })
    } else if (bucketSize && e === "metric") {
      updateStore({ bucketSize: (bucketSize / 1.308).toFixed(1) })
    }
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
        <DropDown
          options={UnitOptions}
          onChange={e => changeUnit(e.value)}
          defaultValue={UnitOptions[0]}
        />
      </div>
      <div className="flex gap-8">
        <div className="w-1/2">
          <label className="block text-smaller mb-1 font-normal">
            Loading Tool
          </label>
          <DropDown
            options={loadingTools}
            defaultValue={loadingTools.filter(a => a.value === loadingTool)[0]}
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
            onChange={e => updateStore({ cycleTime: e.target.value })}
            type="text"
            maxLength="4"
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
                updateStore({ bucketFill: e.target.value })
              }}
              type="text"
              maxLength="4"
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
              onChange={e => updateStore({ bucketSize: e.target.value })}
              //placeholder="0.95"
              value={bucketSize}
              type="text"
              maxLength="4"
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
                updateStore({
                  nomPayload: haulingTools.filter(
                    tool => tool.name === e.value
                  )[0]?.capacity_ton
                })
                updateStore({ haulingTool: e.value })
              }}
              defaultValue={
                haulingToolOptions.filter(a => a.value === haulingTool)[0]
              }
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm mb-1 font-normal">
              Nom. Payload (Tons)
            </label>
            <Input
              onChange={e => {
                updateStore({ nomPayload: e.target.value })
              }}
              type="text"
              //placeholder="0.95"
              // className="mb-6"
              value={nomPayload}
            />
          </div>
        </div>
        <div className="flex justify-center md:justify-end mb-12">
          <DashboardButton
            text="Reset Truck"
            backgroundColor="yellow"
            url=""
            onClick={() => {
              updateStore({
                nomPayload: haulingTools.filter(
                  tool => tool.name === haulingTool
                )[0].capacity_ton
              })
            }}
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
