import { useEffect, useState } from "react"
import DashboardFrame from "../dashboard"
import { Input, InputContainer, CustomSelect } from "../../components/Input"
import { DashboardButton } from "../../components/Button"
import DropDown from "../../components/Dropdown"
import ParametersContext from "../../context/ParametersContext"
import { useContext } from "react"
import "./index.css"
import DensityPopupIcon from "../../assets/density-popup.svg"
import Modal from "react-modal"
import CloseModal from "../../assets/close-modal.svg"
import axios from "axios"
import { baseURL } from "../../api"
import { Store, UpdateStore } from "../../StoreContext"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
    border: "none",
    overflow: "scroll",
    height: "80%",
    className: "modal-class",
    //   position:'relaive',

    //   backgroundColor: "#000",
    overlay: {
      background: "#000"
    }
  }
}

const Form = () => {
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

  const [densityPopupOpen, setDensityPopupOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [apiDensities, setApiDensities] = useState([])

  const {
    materialDensity,
    truckSpotTime,
    operatorEfficiency,
    estRoundTripTravel,
    materialSwell,
    unit
  } = Store()

  const updateStore = UpdateStore()

  const fetchSiteDensities = async () => {
    const densities = await axios.get(`${baseURL}hat/material-densities/`)
    setApiDensities(densities.data)
    setIsLoading(false)
  }

  const fetchSiteParameters = async () => {
    const site_parameters = await axios.get(
      `${baseURL}hat/defaults/screens/site-parameters/`
    )
    updateStore({
      materialDensity: parseFloat(
        site_parameters.data.material_density
      ).toFixed(1),
      truckSpotTime: parseFloat(
        site_parameters.data.truck_sport_time_sec
      ).toFixed(1),
      operatorEfficiency: parseFloat(
        site_parameters.data.operator_efficiency
      ).toFixed(1),
      estRoundTripTravel: parseFloat(
        site_parameters.data.est_round_trip_travel_time
      ).toFixed(1),
      materialSwell: parseFloat(site_parameters.data.material_swell).toFixed(1)
    })
  }

  useEffect(() => {
    fetchSiteDensities()
    fetchSiteParameters()
  }, [])

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

  const DensityModal = () => {
    return (
      <div className="bg-white p-5">
        <div className="flex justify-end">
          <img
            className=""
            src={CloseModal}
            onClick={() => setDensityPopupOpen(false)}
          />
        </div>
        <div className="p-5 rounded-md">
          <div>
            <h4 className="modal-title">Material Density</h4>
            <p className="modal-body">
              The following table references values for a variety of loose
              densities by material type. Reference values should be used for
              internal use only. Otherwise, verify density values directly with
              a customer.
            </p>
          </div>
        </div>
        <div>
          <div className="p-5 gap-x-10 densities-container">
            {!isLoading &&
              apiDensities.map(density => {
                return (
                  <div className="density-object" key={density.id}>
                    <h4 className="density-title">{density.title}</h4>
                    <p className="density-body">Density</p>
                    <p className="density-body">
                      {density.metric_standard.density} (kgs/lcm)
                      {/* {density.metric_standard.density.unit_text} */}
                    </p>
                    <p className="density-body">{density.density} (lbs/lcy)</p>
                    <hr className="line" />
                  </div>
                )
              })}

            {/* {
                        apiDensities.map((test)=>{
                            re
                        })
                    } */}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div>
        <Modal
          isOpen={densityPopupOpen}
          // onRequestClose= {true}
          style={customStyles}
          ariaHideApp={false}
          shouldCloseOnOverlayClick={true}
        >
          <DensityModal />
        </Modal>
      </div>

      <div className="hidden md:block">
        <div className="w-1/2">
          {/* <CustomSelect >

                    
                </CustomSelect> */}
        </div>
        <div className="flex gap-8">
          <div className="w-1/2">
            <label className="block text-smaller mb-1 font-normal">
              Material Density {unit === "metric" ? "(kgs/lcm)" : "(lbs/lcy)"}
              <img
                className="inline"
                src={DensityPopupIcon}
                onClick={() => setDensityPopupOpen(true)}
              />
            </label>
            <Input
              value={materialDensity}
              onChange={handleInput}
              name="materialDensity"
              className="mb-6"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-smaller mb-1 font-normal">
              Truck Spot Time
            </label>
            <Input
              className="mb-6"
              value={truckSpotTime}
              onChange={handleInput}
              name="truckSpotTime"
            />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="w-1/2">
            <label className="block text-smaller mb-1 font-normal">
              Operator Efficiency (min/hr)
            </label>
            <Input
              className="mb-6"
              value={operatorEfficiency}
              onChange={handleInput}
              name="operatorEfficiency"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-smaller mb-1 font-normal">
              Est. Round Trip Travel Time (min)
            </label>
            <Input
              className="mb-6"
              value={estRoundTripTravel}
              onChange={handleInput}
              name="estRoundTripTravel"
            />
          </div>
        </div>
        <div className="flex gap-8 items-center">
          <div className="w-1/2">
            <label className="block text-smaller mb-1 font-normal">
              Material Swell (%)
            </label>
            <Input
              className="mb-6"
              value={materialSwell}
              onChange={handleInput}
              name="materialSwell"
            />
          </div>
          <div className="w-1/2 flex justify-between">
            <DashboardButton
              text="Default"
              backgroundColor="yellow"
              className="mb-6"
              url=""
              onClick={fetchSiteParameters}
            />
            <DashboardButton
              text="Next"
              backgroundColor="blue"
              className="mb-6"
              textColor="white"
              url=""
            />
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <div className="flex gap-8 mb-8">
          <div className="w-1/2">
            <label className="block text-smaller mb-1 font-normal">
              Unit Selection
            </label>
            <DropDown
              options={UnitOptions}
              onChange={e => console.log(e.value)}
            />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="w-1/2">
            <label className="block text-smaller mb-1 font-normal">
              Material Density (lbs/lcy){" "}
              <img
                className="inline"
                src={DensityPopupIcon}
                onClick={() => setDensityPopupOpen(true)}
              />
            </label>
            <Input
              onChange={e => console.log(e.target.value)}
              className="mb-6"
              value={materialDensity}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-smaller mb-1 font-normal">
              Material Swell (%)
            </label>
            <Input
              onChange={e => console.log(e.target.value)}
              className="mb-6"
              value={materialSwell}
            />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="w-1/2">
            <label className="block text-smaller mb-1 font-normal">
              Operator Efficiency (min/hr)
            </label>
            <Input
              onChange={e => console.log(e.target.value)}
              className="mb-6"
              value={operatorEfficiency}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-smaller mb-1 font-normal">
              Truck Spot Time (sec)
            </label>
            <Input
              onChange={e => console.log(e.target.value)}
              className="mb-6"
              value={truckSpotTime}
            />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="w-1/2">
            <label className="block text-smaller mb-1 font-normal">
              Est. Round Trip
              <br />
              Travel Time (min)
            </label>
            <Input
              onChange={e => console.log(e.target.value)}
              className="mb-6"
              value={estRoundTripTravel}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-smaller mb-1 font-small invisible">
              Est. Round Trip Travel Time (min)
            </label>
            <DashboardButton
              text="Default"
              backgroundColor="yellow"
              className="mb-6"
              url=""
            />
          </div>
        </div>
        <div className="flex gap-8">
          <DashboardButton
            text="Next"
            backgroundColor="blue"
            className="mb-6"
            textColor="white"
            url=""
          />
        </div>
      </div>
    </div>
  )
}

const Parameters = () => {
  return (
    <DashboardFrame
      title="Site Parameters"
      body={<Form />}
      displayBackButton={true}
      backButtonURL="/fleet-definition"
    />
  )
}

export default Parameters
