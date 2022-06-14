export const Button =({text, icon, backgroundColor, textColor}) => {
    // let color = 'blue'
    return(
        <button className={`bg-${backgroundColor} text-${textColor} px-6 py-3 rounded flex w-80 items-center pl-8`} ><img className="mr-4" src={icon}/>{text}</button>
    )
}


export const DashboardButton =({text, backgroundColor, textColor}) => {
    // let color = 'blue'
    return(
        <button className={`bg-${backgroundColor} text-${textColor} px-6 py-2 rounded flex w-80 justify-center font-medium `} >{text}</button>
    )
}
