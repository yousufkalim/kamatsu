import Logo from '../../assets/logo-white.png';
import { Link } from 'react-router-dom';

const Menu = ({text, url}) => {
    return (
        <>
             <div className='py-3 hover:bg-yellow flex justify-start'>
             <div className='text-white hover:text-black px-4 flex justify-center'>
                <Link to={url} className=''>
                    <h4 className=''>{text}</h4>
                </Link>
            </div>
            </div>

        </>
       
    )
}

const DashboardFrame = ({title, body}) => {
    return(
        <div className="flex">
            <div className="w-1/6 bg-blue h-screen py-6 flex-none">
                <div className=''>
                    <div className='mb-6 px-4 flex justify-center'>
                        <img src={Logo} className=""/>
                    </div>
                    <div className=''>
                        <Menu 
                            text = "Home"
                            url = "/test"
                        />
                        <Menu 
                            text = "Send Feedback"
                            url="/test"
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
                            url="/test"
                        />
                    </div>
                </div>
                
                
            </div>
            <div className='bg-deepGray w-full'>
                <div className='bg-white py-5 pr-16 flex justify-end'>
                    <div className=''>
                        <h4 className='text-body leading-smaller font-normal'>John Doe</h4>
                        <p className='text-smaller leading-smaller'>johndoe@gmail.com</p>
                    </div>
                </div>
                <div className='px-12 py-10'>
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