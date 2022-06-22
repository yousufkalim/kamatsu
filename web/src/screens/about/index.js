import axios from "axios"
import { useEffect, useState } from "react"
import DashboardFrame from "../dashboard"
import "./index.css"
import { baseURL } from "../../api"

const Body = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [title, setTitle] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [description, setDescription] = useState("")

  const fetchAboutData = () => {
    axios.get(`${baseURL}api/v1/pages/about-us/`).then(res => {
      console.log("about us data", res.data)
      setTitle(res.data.title)
      setEmail(res.data.contact_email)
      setPhone(res.data.contact_phone)
      setDescription(res.data.description)
      setIsLoading(false)
    })
  }

  useEffect(() => {
    fetchAboutData()
  })

  return (
    <>
      {!isLoading && (
        <div>
          <p className="font-normal text-about leading-about">
            The objective of this tool is to conduct productivity and unit cost
            analyses for mining or construction fleet configurations. The
            parameters in this app can model a specific site for a customer as
            well as utilize industry standard parameters in a loader-dependent
            or truck-dependent application. All values calculated by this tool
            are intended for preliminary planning and budgetary purposes. <br />{" "}
            For additional questions, please contact the Komatsu Application
            Engineering team at &nbsp;
            <span className="email-color">
              MiningApplicationEngineering@global.komatsu
            </span>
          </p>
        </div>
      )}
    </>
  )
}

const About = () => {
  return <DashboardFrame title="About Us" body={<Body />} />
}

export default About
