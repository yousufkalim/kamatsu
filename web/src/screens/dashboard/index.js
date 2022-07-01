import Logo from "../../assets/logo-white.png"
import { Link, NavLink } from "react-router-dom"
import "./index.css"
import BackArrow from "../../assets/back-arrow.svg"
import MobileLogoBlue from "../../assets/mobile-logo-blue.png"
import Hamburger from "../../assets/hamburger.png"
import { useState } from "react"

const Menu = ({ text, url }) => {
  return (
    <>
      <NavLink
        to={url}
        className=""
        style={({ isActive }) =>
          isActive
            ? {
                color: "#000",
                backgroundColor: "#FFC82F",
                width: "100%",
                display: "block",
                paddingTop: "13px",
                paddingBottom: "13px",
                paddingLeft: "32px"
              }
            : {
                color: "#fff",
                width: "100%",
                display: "block",
                paddingTop: "13px",
                paddingBottom: "13px",
                paddingLeft: "32px",
                "&:hover": {
                  color: "#000",
                  backgroundColor: "#FFC82F"
                }
              }
        }
      >
        {" "}
        {text}
      </NavLink>
    </>
  )
}
const MobileMenuLink = ({ text, url }) => {
  return (
    <>
      <NavLink
        to={url}
        className=""
        style={({ isActive }) =>
          isActive
            ? {
                color: "#FFC82F",
                width: "100%",
                display: "block",
                lineHeight: "40px",
                fontSize: "18px"
                // paddingTop: '13px',
                // paddingBottom: '13px',
              }
            : {
                color: "#2D2F8A",
                width: "100%",
                display: "block",
                lineHeight: "40px",
                fontSize: "18px",
                // paddingTop: '13px',
                // paddingBottom: '13px',
                "&:hover": {
                  color: "#FFC82F"
                }
              }
        }
      >
        {" "}
        {text}
      </NavLink>
    </>
  )
}

const MobileMenu = ({ mobileMenuIsOpen, onClickOuterSpace }) => {
  return (
    <div
      className={mobileMenuIsOpen ? "mobile-menu-overlay" : null}
      onClick={onClickOuterSpace}
    >
      <div className="bg-white h-screen flex ml-20 justify-start px-6 z-10 rounded-t-2xl rounded-b-2xl md:hidden">
        <div>
          <div>
            <div className="mt-14 mb-8">
              <img src={MobileLogoBlue} />
            </div>
            <div className="mb-8">
              <h4 className="text-body leading-smaller font-normal">
                John Doe
              </h4>
              <p className="text-smaller leading-smaller">johndoe@gmail.com</p>
            </div>
            <div className="">
              <hr className="resultLabel w-screen mr-6" />
            </div>
          </div>
          <div className="py-6">
            <MobileMenuLink text="Home" url="/fleet-definition" />
            <MobileMenuLink text="Send Feedback" url="/feedback" />
            {/* <MobileMenuLink 
                        text = "Privacy Policy"
                        url="/test"
                    /> */}
            {/* <div> */}
            <a
              className="mobile-menu-anchor"
              href="https://www.komatsu.com/en/terms-of-use/"
              target="_blank"
            >
              Terms and Conditions
            </a>
            {/* </div> */}
            {/* <div> */}
            <a
              className="mobile-menu-anchor"
              href="https://www.komatsu.com/en/terms-of-use/"
              target="_blank"
            >
              Privacy Policy
            </a>
            {/* </div> */}

            {/* <MobileMenuLink 
                        text = "Terms and Conditions"
                        url="https://www.komatsu.com/en/terms-of-use/"
                    /> */}
            <MobileMenuLink text="About Us" url="/about" />
          </div>
        </div>
      </div>
    </div>
  )
}

const DashboardFrame = ({
  title,
  body,
  displayBackButton,
  backButtonURL,
  homePage
}) => {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)
  return (
    <div className="flex">
      <div className="hidden md:block md:w-1/6 blue md:h-screen">
        <div className="">
          <div className="top-bar px-8 flex items-center">
            <Link to="/">
              <img src={Logo} className="" />
            </Link>
          </div>
          <div className="py-6">
            <Menu text="Home" url="/fleet-definition" />
            <Menu text="Send Feedback" url="/feedback" />
            <div>
              <a
                className="web-menu-anchor"
                href="https://www.komatsu.com/en/terms-of-use/"
                target="_blank"
              >
                Terms and Conditions
              </a>
            </div>
            <div>
              <a
                className="web-menu-anchor"
                href="https://www.komatsu.com/en/privacy-statement/"
                target="_blank"
              >
                Privacy Policy
              </a>
            </div>
            <Menu text="About Us" url="/about" />
          </div>
        </div>
      </div>
      <div className="deepGray w-full md:h-screen " style={{ overflow: "hidden" }}>
        <div className="hidden md:flex bg-white top-bar items-center px-12 justify-between">
          <div>
            {!homePage && (
              <Link to={backButtonURL}>
                <img src={BackArrow} />
              </Link>
            )}
          </div>
          <div className="">
            <h4 className="text-body leading-smaller font-normal">John Doe</h4>
            <p className="text-smaller leading-smaller">johndoe@gmail.com</p>
          </div>
        </div>
        <div>
          {mobileMenuIsOpen && (
            <MobileMenu
              mobileMenuIsOpen={mobileMenuIsOpen}
              // onClickOuterSpace = {setMobileMenuIsOpen(false)}
              onClickOuterSpace={() => setMobileMenuIsOpen(false)}
            />
          )}
        </div>
        <div className=" md:hidden bg-white top-bar flex items-center px-4 justify-between">
          <div>
            {!homePage && (
              <Link to="/fleet-definition">
                <img src={BackArrow} />
              </Link>
            )}
          </div>

          <div >
            <Link to="/">
              <img src={MobileLogoBlue} />
            </Link>
          </div>
          <div >
            <img src={Hamburger} onClick={() => setMobileMenuIsOpen(true)} />
          </div>
        </div>
        <div className="px-4 md:px-12 py-1">
          <div>
            <h4 className="text-title leading-title font-medium">{title}</h4>
          </div>
          <div className="mt-1" style={{ height: "100%" }}>{body}</div>
        </div>
      </div>
    </div>
  )
}

export default DashboardFrame
