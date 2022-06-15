import './index.css'


export const Button =({text, icon, backgroundColor, textColor}) => {
    // let color = 'blue'
    return(
        <button className={`bg-${backgroundColor} text-${textColor} home-button flex w-[274px] items-center pl-8`} ><img className="mr-4" src={icon}/>{text}</button>
    )
}


export const DashboardButton =({text, backgroundColor, textColor}) => {
    // let color = 'blue'
    return(
        <button className={`bg-${backgroundColor} text-${textColor} home-button flex justify-center font-medium `} >{text}</button>
    )
}
