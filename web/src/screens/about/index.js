import DashboardFrame from "../dashboard";


const Body = () => {
    return(
        <div>
            <p className="font-normal text-about leading-about">
            The objective of this tool is to conduct productivity and unit cost analyses for mining or construction fleet configurations. The parameters in this app can model a specific site for a customer as well as utilize industry standard parameters in a loader-dependent or truck-dependent application. All values calculated by this tool are intended for preliminary planning and budgetary purposes.
            For additional questions, please contact the Komatsu Application Engineering team at <span className="text-email">MiningApplicationEngineering@global.komatsu</span>
            </p>
        </div>
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