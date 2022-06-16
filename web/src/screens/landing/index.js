import HaulIcon from '../../assets/haul-icon.png';
import Crane from '../../assets/crane.png';
import GroupedMachines from '../../assets/grouped-machines.png';
import Trolley from '../../assets/trolley.png';
import Logo from '../../assets/logo.png';
import WhiteLogo from '../../assets/mobile-logo-white.png'
import Photo from '../../assets/landing-photo.png';
import LandingPhoto from '../../assets/landing-photo-mobile.png'
import Ellipsis from '../../assets/ellipsis.png'
import { Button } from '../../components/Button';
import './index.css'




const Landing =  () => {
    return(
        <div className="flex items-center">
            <div className="w-full md:w-1/2 md:pl-12 ">
                <div className='hidden md:block md:mb-8 '>
                    <img src={Logo} />
                </div>
                <div className='hidden md:block md:mb-12'>
                    <h1 className="text-headline leading-headline font-bold">Application<br />Engineering <br/>Tools</h1>
                    <h4 className="text-body leading-body font-normal">Creating value together with 21st century fleet studies<br /> and solutions.</h4>
                </div>
                <div className='flex justify-center align-middle mobile-header bg-black md:hidden'>
                    <div className='px-6'>
                        <div  className='flex justify-center mb-12 mt-12'>
                            <img src={WhiteLogo}/>
                        </div>
                        <div className='mb-5'>
                            <h4 className='mobile-head'>Harness the power <br />of data to optimize <br />your job site</h4>
                        </div>
                        <div className='mb-20'>
                            <p className='mobile-body'>Creating value together with 21st century <br />fleet studies and solutions</p>
                        </div>
                        <div  className='flex justify-center'>
                            <img src={Ellipsis}/>
                        </div>
                    </div>
                    
                    

                </div>
                <div className="flex justify-center mt-6 md:mt-0 md:justify-start">
                    <div>
                    <div className="block md:flex md:mb-6 gap-x-10">
                    <Button
                        backgroundColor="yellow"
                        text = "Haulage Analysis Tool"
                        icon = {HaulIcon}
                        textColor = "black"
                        url = "/fleet-definition"

                    />
                    <Button
                        backgroundColor="gray"
                        text = "DozePro"
                        icon = {Crane}
                        textColor = "white"
                        comingSoon= {true}
                        url = ""
                        modal = {true}
                    />
                </div>
                <div className="block md:flex mb-4 gap-x-10">
                    <Button
                        backgroundColor="gray"
                        text = "Equipment Selector Tool"
                        icon = {GroupedMachines}
                        textColor = "white"
                        comingSoon= {true}
                        url = ""
                        modal={true}
                    />
                    <Button
                        backgroundColor="gray"
                        text = "Trolley Feasibillity Tool"
                        icon = {Trolley}
                        textColor = "white"
                        comingSoon= {true}
                        url = ""
                        modal={true}
                    />
                </div>
                    </div>
                
            </div>
            </div>
            
            <div className="hidden md:flex md:w-1/2 right-landing ">
                <h4>Hii</h4>
                {/* <img src={Photo}/> */}
            </div>
        </div>
    )
}

export default Landing;