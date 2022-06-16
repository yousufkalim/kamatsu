import Logo from '../../assets/logo-white.png';
import { Link, NavLink } from 'react-router-dom';
import './index.css'
import BackArrow from '../../assets/back-arrow.svg'

const Menu = ({text, url}) => {
    return (
        <>
             {/* <div className='py-3 hover:bg-yellow flex justify-start'> */}
             {/* <div className='text-white hover:text-black px-4 flex justify-center'> */}
                <NavLink to={url} className=''
                    style={({isActive})=> isActive ? {
                        color: '#000',
                        backgroundColor: '#FFC82F',
                        width: '100%',
                        display: 'block',
                        paddingTop: '13px',
                        paddingBottom: '13px',
                        paddingLeft: '32px',
                        
                    } : {
                        color: "#fff",
                        width: '100%',
                        display: 'block',
                        paddingTop: '13px',
                        paddingBottom: '13px',
                        paddingLeft: '32px',
                        '&:hover' : {
                            color: '#000',
                            backgroundColor: '#FFC82F',
                        }
                    }
                }
                > {text}
                </NavLink>
        </>
       
    )
}

const DashboardFrame = ({title, body, displayBackButton, backButtonURL}) => {
    return(
        <div className="flex">
            <div className="hidden md:block md:w-1/6 md:bg-blue md:h-screen">
                <div className=''>
                    <div className='top-bar px-8 flex items-center'>
                        <img src={Logo} className=""/>
                    </div>
                    <div className='py-6'>
                        <Menu 
                            text = "Home"
                            url = "/home"
                        />
                        <Menu 
                            text = "Send Feedback"
                            url="/feedback"
                        />
                        <Menu 
                            text = "Privacy Policy"
                            url="/test"
                        />
                        <Menu 
                            text = "Terms and Conditions"
                            url="/test"
                        />
                        <Menu 
                            text = "About Us"
                            url="/about"
                        />
                    </div>
                </div>
                
                
            </div>
            <div className='bg-deepGray w-full md:h-screen'>
                <div className='bg-white top-bar flex items-center px-12 justify-between'>
                    <div>
                        {
                            displayBackButton ? 
                            <Link to={backButtonURL}>
                                <img src={BackArrow}/>
                            </Link>
                             : null
                        }
                    </div>
                    <div className=''>
                        <h4 className='text-body leading-smaller font-normal'>John Doe</h4>
                        <p className='text-smaller leading-smaller'>johndoe@gmail.com</p>
                    </div>
                </div>
                <div className='px-4 md:px-12 py-6'>
                    <div>
                        <h4 className='text-title leading-title font-medium'>{title}</h4>
                    </div>
                    <div className='mt-10'>
                        {body}
                    </div>
                </div>
            </div>

        </div>

    )
}

export default DashboardFrame;