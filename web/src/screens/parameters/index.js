import DashboardFrame from "../dashboard";
import { Input, InputContainer, CustomSelect } from "../../components/Input";
import { DashboardButton } from "../../components/Button";


const Form = () => {
    return(
        <div>
            <div className="w-1/2">
            {/* <CustomSelect >

                
            </CustomSelect> */}
            </div>
            <div className="flex gap-8">
                <div className="w-1/2">
                    <label className="block text-smaller mb-1 font-normal">Material Density (lbs/lcy)</label>
                    <Input
                        onChange={(e)=>console.log(e.target.value)}
                        placeholder="0.95"
                        className="mb-6"
                    />
                </div>
                <div className="w-1/2">
                    <label className="block text-smaller mb-1 font-normal">Truck Spot Time</label>
                    <Input
                        onChange={(e)=>console.log(e.target.value)}
                        placeholder="0.95"
                        className="mb-6"
                    />
                </div>
            </div>
            <div className="flex gap-8">
                <div className="w-1/2">
                    <label className="block text-smaller mb-1 font-normal">Operator Efficiency (min/hr)</label>
                    <Input
                        onChange={(e)=>console.log(e.target.value)}
                        placeholder="0.95"
                        className="mb-6"
                    />
                </div>
                <div className="w-1/2">
                    <label className="block text-smaller mb-1 font-normal">Est. Round Trip Travel Time (min)</label>
                    <Input
                        onChange={(e)=>console.log(e.target.value)}
                        placeholder="0.95"
                        className="mb-6"
                    />
                   
                </div>

            </div>
            <div className="flex gap-8 items-center">
                <div className="w-1/2">
                    <label className="block text-sm mb-1 font-normal">Material Swell (%)</label>
                    <Input
                        onChange={(e)=>console.log(e.target.value)}
                        placeholder="0.95"
                        className="mb-6"
                    />
                </div>
                <div className="w-1/2 flex justify-between">
                    <DashboardButton 
                        text="Default"
                        backgroundColor = "yellow"
                        className = "mb-6"
                    />
                     <DashboardButton 
                        text="Next"
                        backgroundColor = "blue"
                        className = "mb-6"
                        textColor= "white"
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
            backButtonURL = "/home"

        />
    )
}


export default Parameters;