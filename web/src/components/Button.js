import { useState } from 'react'
import './index.css'
import { Link } from 'react-router-dom';
import Modal from 'react-modal';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: 'auto',
      borderRadius: '8px',
      border: 'none'
    },
  };

// const Popup = () => {
//     const
//     <>
//         <Modal
//             isOpen={modalIsOpen}
//             onRequestClose={closeModal}
//             style={customStyles}
//           >
//         <div className='flex bg-white rounded-md'>
//             <h4>This feature is coming soon.</h4>
//         </div>
//     </Modal>
//     </>
    
// }

export const Button =({text, icon, url, backgroundColor, textColor, comingSoon, modal}) => {
    const [isShown, setIsShown] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    // const closeModal
    // let color = 'blue'
    return(
        <>
            {/* <div> */}
                <Modal
                isOpen={modalIsOpen}
                // onRequestClose= {true}
                style={customStyles}
                ariaHideApp={false}
                shouldCloseOnOverlayClick = {true}
              >
                <div className='flex bg-white p-12'>
                    <h4 className='text-xl'>This feature is coming soon.</h4>
                </div>
            </Modal>
            {/* </div> */}
            {/* <div> */}
                <Link
                    to={url}
                >
                <button className={`bg-${backgroundColor} text-${textColor} home-button flex w-[274px] items-center pl-8`} 
                onMouseEnter={()=>setIsShown(true)}
                onMouseLeave={()=> setIsShown(false)}
                onClick={()=>modal && setModalIsOpen(!modalIsOpen)}
                ><img className="mr-4" src={icon}/>{
                    isShown && comingSoon ? 'Coming Soon' : text
                }</button>
                </Link>
        {/* </div> */}
        </>
    )
}


export const DashboardButton =({text, backgroundColor, url, textColor, onClick}) => {
    // let color = 'blue'
    return(
        <Link
            to={url}
        >
        
        <button className={`bg-${backgroundColor} text-${textColor} dashboard-button flex justify-center font-medium `} onClick={onClick}>{text}</button>
        </Link>
    )
}
