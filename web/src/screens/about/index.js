import axios from "axios"
import { useEffect, useState } from "react"
import DashboardFrame from "../dashboard"
import "./index.css"
import { baseURL } from "../../api"

const Body = ({ setTitle }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [description, setDescription] = useState("")

  const fetchAboutData = () => {
    axios.get(`${baseURL}pages/about-us/`).then(res => {
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
            {description} &nbsp;
            <a className="email-color" href={`mailto:${email}`}>
              {email}
            </a>
          </p>
        </div>
      )}
    </>
  )
}

const About = () => {
  const [title, setTitle] = useState("")

  return <DashboardFrame title={title} body={<Body setTitle={setTitle} />} />
}

export default About
