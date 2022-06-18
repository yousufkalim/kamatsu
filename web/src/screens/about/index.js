import axios from "axios";
import { useEffect, useState } from "react";
import DashboardFrame from "../dashboard";
import './index.css'
import { baseURL } from "../../api";

const Body = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [title, setTitle] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [description, setDescription] = useState("")

    const fetchAboutData = () => {
        axios.get(`${baseURL}api/v1/pages/about-us/`)
        .then((res)=>{
            setTitle(res.data.title);
            setEmail(res.data.contact_email);
            setPhone(res.data.contact_phone);
            setDescription(res.data.description);
            setIsLoading(false)
            console.log()

        })
    }

    useEffect(()=>{
        fetchAboutData();
    })

    return(
        <>
            {
            !isLoading && (
                <div>
            <p className="font-normal text-about leading-about">
                {description} &nbsp;
                <span className="email-color">{email}</span>
            </p>
            </div>
            )
            }
        </>
        
        
    )
}

const About = () => {
    return(
        <DashboardFrame 
            title="About Us"
            body = {<Body/>}

        />
    )
}


export default About;