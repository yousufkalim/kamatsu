import DashboardFrame from "../dashboard";
import { Input, InputContainer, CustomSelect } from "../../components/Input";
import { DashboardButton } from "../../components/Button";
import DropDown from "../../components/Dropdown";
import ParametersContext from "../../context/ParametersContext";
import { useContext } from "react";


const Form = () => {
    const UnitOptions =[
        {
            label: 'Metric',
            value: 'metric'
        },
        {
            label: 'US Customary',
            value: 'customary'
        }
    ]

    const {
        materialDensity, setMaterialDensity,
        truckSpotTime, setTruckSpotTime,
        operatorEfficiency, setOperatorEfficiency,
        estRoundTripTravel, setEstRoundTripTravel,
        materialSwell, serMaterialSwell
    } = useContext(ParametersContext)
    
    return(
        <div>
            <div className="hidden md:block">
                <div className="w-1/2">
                {/* <CustomSelect >

                    
                </CustomSelect> */}
                </div>
                <div className="flex gap-8">
                    <div className="w-1/2">
                        <label className="block text-smaller mb-1 font-normal">Material Density (lbs/lcy)</label>
                        <Input
                            onChange={(e)=>console.log(e.target.value)}
                            value={materialDensity}
                            className="mb-6"

                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-smaller mb-1 font-normal">Truck Spot Time</label>
                        <Input
                            onChange={(e)=>console.log(e.target.value)}
                            className="mb-6"
                            value={truckSpotTime}
                        />
                    </div>
                </div>
                <div className="flex gap-8">
                    <div className="w-1/2">
                        <label className="block text-smaller mb-1 font-normal">Operator Efficiency (min/hr)</label>
                        <Input
                            onChange={(e)=>console.log(e.target.value)}
                            className="mb-6"
                            value={operatorEfficiency}
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-smaller mb-1 font-normal">Est. Round Trip Travel Time (min)</label>
                        <Input
                            onChange={(e)=>console.log(e.target.value)}
                            className="mb-6"
                            value={estRoundTripTravel}
                        />
                    </div>

                </div>
                <div className="flex gap-8 items-center">
                    <div className="w-1/2">
                        <label className="block text-smaller mb-1 font-normal">Material Swell (%)</label>
                        <Input
                            onChange={(e)=>console.log(e.target.value)}
                            className="mb-6"
                            value={materialSwell}
                            
                        />
                    </div>
                    <div className="w-1/2 flex justify-between">
                        <DashboardButton 
                            text="Default"
                            backgroundColor = "yellow"
                            className = "mb-6"
                            url=""
                        />
                        <DashboardButton 
                            text="Next"
                            backgroundColor = "blue"
                            className = "mb-6"
                            textColor= "white"
                            url=""
                        />
                    </div>
                </div>
            </div>
            <div className="md:hidden">
                <div className="flex gap-8 mb-8">
                    <div className="w-1/2"> 
                        <label className="block text-smaller mb-1 font-normal">Unit Selection</label>
                        <DropDown 
                            options={UnitOptions}
                            onChange={(e)=>console.log(e.value)}
                        />
                    </div>
                    
                </div>
                <div className="flex gap-8">
                    <div className="w-1/2">
                        <label className="block text-smaller mb-1 font-normal">Material Density (lbs/lcy)</label>
                            <Input
                                onChange={(e)=>console.log(e.target.value)}
                                className="mb-6"
                                value={materialDensity}
                            />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-smaller mb-1 font-normal">Material Swell (%)</label>
                            <Input
                                onChange={(e)=>console.log(e.target.value)}
                                className="mb-6"
                                value={materialSwell}
                            />
                    </div>
                
                </div>
                <div className="flex gap-8">
                    <div className="w-1/2">
                        <label className="block text-smaller mb-1 font-normal">Operator Efficiency (min/hr)</label>
                            <Input
                                onChange={(e)=>console.log(e.target.value)}
                                className="mb-6"
                                value={operatorEfficiency}
                            />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-smaller mb-1 font-normal">Truck Spot Time (sec)</label>
                            <Input
                                onChange={(e)=>console.log(e.target.value)}
                                className="mb-6"
                                value={truckSpotTime}
                            />
                    </div>
                    
                    </div>
                    <div className="flex gap-8">
                    <div className="w-1/2">
                        <label className="block text-smaller mb-1 font-normal">Est. Round Trip<br />Travel Time (min)</label>
                            <Input
                                onChange={(e)=>console.log(e.target.value)}
                                className="mb-6"
                                value={estRoundTripTravel}
                            />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-smaller mb-1 font-small invisible">Est. Round Trip Travel Time (min)</label>
                        <DashboardButton 
                            text="Default"
                            backgroundColor = "yellow"
                            className = "mb-6"
                            url=""
                        />
                    </div>
                </div>
                <div className="flex gap-8">
                    <DashboardButton 
                        text="Next"
                        backgroundColor = "blue"
                        className = "mb-6"
                        textColor="white"
                        url=""
                    />
                </div>
                </div>
                
                
                
        </div>
    )
}

const Parameters = () => {
    return(
        <DashboardFrame 
            title="Site Parameters"
            body = {<Form/>}
            displayBackButton = {true}
            backButtonURL = "/fleet-definition"

        />
    )
}


export default Parameters;