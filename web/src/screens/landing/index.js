import HaulIcon from '../../assets/haul-icon.png';
import Crane from '../../assets/crane.png';
import GroupedMachines from '../../assets/grouped-machines.png';
import Trolley from '../../assets/trolley.png';
import Logo from '../../assets/logo.png';
import Photo from '../../assets/landing-photo.png';
import { Button } from '../../components/Button';




const Landing =  () => {
    return(
        <div className="flex items-center">
            <div className="w-1/2 pl-12">
                <div className='mb-8'>
                    <img src={Logo} />
                </div>
                <div className='mb-12'>
                    <h1 className="text-headline leading-headline font-bold">Application<br />Engineering <br/>Tools</h1>
                    <h4 className="text-body leading-body font-normal">Creating value together with 21st century fleet studies and solutions.</h4>
                </div>
                <div className="">
                <div className="flex mb-6 gap-x-10">
                    <Button
                        backgroundColor="yellow"
                        text = "Haulage Analysis Tool"
                        icon = {HaulIcon}
                        textColor = "black"
                    />
                    <Button
                        backgroundColor="gray"
                        text = "DozePro"
                        icon = {Crane}
                        textColor = "white"
                    />
                </div>
                <div className="flex mb-4 gap-x-10">
                    <Button
                        backgroundColor="gray"
                        text = "Equipment Selector Tool"
                        icon = {GroupedMachines}
                        textColor = "white"
                    />
                    <Button
                        backgroundColor="gray"
                        text = "Trolley Feasibillity Tool"
                        icon = {Trolley}
                        textColor = "white"
                    />
                </div>
            </div>
            </div>
            
            <div className="w-1/2 flex">
                <img src={Photo}/>
            </div>
        </div>
    )
}

export default Landing;