import DashboardFrame from "../dashboard";
import { Input, TextArea } from "../../components/Input";
import { DashboardButton } from "../../components/Button";


const Body = () => {
    return(
        <div className="w-2/5">
            <div className="mb-10">
                <label className="block text-smaller mb-1 font-normal">Email Address</label>
                <Input 
                placeholder="johndoe@gmail.com"
            />
            </div>
           <div>
            <label className="block text-smaller mb-1 font-normal">Message</label>
                <TextArea 
                    placeholder="Text here"
                />
           </div>
           <div className="mt-10 flex justify-end">
               <DashboardButton 
                text="Submit"
                backgroundColor="blue"
                textColor = "white"
               />
           </div>
           
        </div>
    )
}

const Feedback = () => {
    return(
        <DashboardFrame 
            title="Send Feedback"
            body = {<Body/>}

        />
    )
}


export default Feedback;