import DashboardFrame from "../dashboard";
import { Input, InputContainer, CustomSelect } from "../../components/Input";
import { DashboardButton } from "../../components/Button";
import DropDown from "../../components/Dropdown";
import axios from 'axios'
import { useEffect, useState } from "react";


const Form = () => {
    const [loadingTools, setLoadingTools] = useState([])
    const [loadingToolsIsLoading, setLoadingToolsIsLoading] = useState(true)
    const [haulingTools, setHaulingTools] = useState([])
    const [HaulingToolsIsLoading, setHaulingToolsIsLoading] = useState(true)

    const fetchLoadingTools =() =>{
        axios.get('https://komatsu-demo-34942.botics.co/api/v1/hat/loading-tools/')
        .then((res)=>setLoadingTools(res.data))
        .then(setLoadingToolsIsLoading(false))
        
    }

    const fetchHaulingTools =() =>{
        axios.get('https://komatsu-demo-34942.botics.co/api/v1/hat/loading-tools/78/hauling-tools/')
        .then((res)=>setHaulingTools(res.data))
        .then(setHaulingToolsIsLoading(false))
        
    }


    useEffect(()=>{
        fetchLoadingTools()
        fetchHaulingTools()
        // !loadingToolsIsLoading && console.log(loadingTools)
        // console.log(loadingTools)
    }, [])

    console.log(loadingTools)

    let loadingOptions = []
    if (!loadingToolsIsLoading) {
        // console.log(loadingTools)
        loadingTools.map((tool) => {
            let toolData ={}
            toolData.value = tool.name
            toolData.label = tool.name
            loadingOptions.push(toolData)
            // console.log(tool.name)
        })

        // console.log(loadingOptions)
    }

    let haulingOptions = []
    if (!HaulingToolsIsLoading) {
        // console.log(loadingTools)
        haulingTools.map((tool) => {
            let toolData ={}
            toolData.value = tool.name
            toolData.label = tool.name
            haulingOptions.push(toolData)
            // console.log(tool.name)
        })

        // console.log(loadingOptions)
    }

    // var loadingOptions = loadingTools.map((tool)=>{
    //     return {
    //         label: tool.name,
    //         value: tool.id
    //     }
    // })


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

    // const Loading


    return(
        <div>
            <div className="w-1/2 gap-8 md:w-1/4 mb-6">
                <label className="block text-smaller mb-1 font-normal">Unit Selection</label>
            <DropDown 
                options={UnitOptions}
                onChange={(e)=>console.log(e.value)}
            />

            </div>
            <div className="flex gap-8">
                <div className="w-1/2"> 
                    <label className="block text-smaller mb-1 font-normal">Loading Tool</label>
                    <DropDown 
                        options={loadingOptions}
                        onChange={(e)=>console.log(e.value)}
                    />
                </div>
                <div className="w-1/2">
                    <label className="block text-smaller mb-1 font-normal">Cycle Time (Sec)</label>
                    <Input
                        onChange={(e)=>console.log(e.target.value)}
                        placeholder="0.95"
                        className="mb-6"
                    />
                </div>
            </div>
            <div>
                <div className="flex gap-8 mb-8">
                    <div className="w-1/2">
                        <label className="block text-smaller mb-1 font-normal">Bucket Fill (%)</label>
                        <Input
                            onChange={(e)=>console.log(e.target.value)}
                            placeholder="0.95"
                            // className="mb-6"
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-smaller mb-1 font-normal">Bucket Size (m3)</label>
                        <Input
                            onChange={(e)=>console.log(e.target.value)}
                            placeholder="0.95"
                            // className="mb-6"
                        />
                    </div>
                    
                </div>
                <div className="flex justify-center  md:justify-end mb-8">
                    <DashboardButton 
                            text="Reset Loader"
                            backgroundColor = "yellow"
                            // className = "mb-6"
                        />
                    </div>

            </div>
            <div>
                <div className="flex gap-8 mb-8">
                    <div className="w-1/2">
                        <label className="block text-sm mb-1 font-normal">Hauling Tool</label>
                        <DropDown 
                        options={haulingOptions}
                        onChange={(e)=>console.log(e.value)}
                    />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-sm mb-1 font-normal">Nom. Payload (Tons)</label>
                        <Input
                            onChange={(e)=>console.log(e.target.value)}
                            placeholder="0.95"
                            // className="mb-6"
                        />
                    </div>
                </div>
                <div className="flex justify-center md:justify-end mb-12">
                    <DashboardButton 
                        text="Reset Truck"
                        backgroundColor = "yellow"
                    />

                </div>
                <div className="flex justify-center md:justify-end mb-8">
                    <DashboardButton 
                        text="Next"
                        backgroundColor = "blue"
                        textColor="white"
                    />

                </div>
            </div>
            
        </div>
    )
}

const FleetDefinition = () => {
    return(
        <DashboardFrame 
            title="Fleet Definition"
            body = {<Form/>}

        />
    )
}


export default FleetDefinition;