import DashboardFrame from "../dashboard"
import { Input, TextArea } from "../../components/Input"
import { DashboardButton } from "../../components/Button"
import "./index.css"
import { useState } from "react"
import axios from "axios"
import { baseURL } from "../../api"
import toast from "react-hot-toast"

const Body = () => {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const sendFeedback = () => {
    if (!email || !message) {
      return toast.error("Please fill out all fields")
    }
    // Email validation
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return toast.error("Please enter a valid email address")
    }

    axios
      .post(`${baseURL}feedbacks/customer-feedbacks/`, {
        email: email,
        body: message,
        user: 1
      })
      .then(res => {
        toast.success("Feedback sent successfully")
        setEmail("")
        setMessage("")
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="w-1/1 md:w-2/5">
      <div className="mb-10">
        <label className="block text-smaller mb-1 font-normal">
          Email Address
        </label>
        <Input
          placeholder="johndoe@gmail.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-smaller mb-1 font-normal">Message</label>
        <TextArea
          placeholder="Text here"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
      </div>
      <div className="mt-10 flex justify-end">
        <DashboardButton
          text="Submit"
          backgroundColor="blue"
          textColor="white"
          url=""
          onClick={() => sendFeedback()}
        />
      </div>
    </div>
  )
}

const Feedback = () => {
  return (
    <DashboardFrame
      title="Send Feedback"
      body={<Body />}
      displayBackButton={true}
      backButtonURL="/fleet-definition"
    />
  )
}

export default Feedback
