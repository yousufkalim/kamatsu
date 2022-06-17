import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import ParametersProvider from '../src/context/ParametersContext'
// import ParametersContext from '../src/context/ParametersContext';

// const {setMaterialDensity} = useContext(ParametersContext)

ReactDOM.render(
  <React.StrictMode>
    {/* <ParametersProvider value={{setMaterialDensity}}> */}
    
    <App />
    {/* </ParametersProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
