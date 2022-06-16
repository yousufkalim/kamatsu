import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route,} from 'react-router-dom';
import Landing from './screens/landing';
import DashboardFrame from './screens/dashboard';
import FleetDefinition from './screens/home';
import About from './screens/about';
import Feedback from './screens/feedback';
import Results from './screens/results';
import Parameters from './screens/parameters';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element ={<Landing />} />
          <Route path="/dashboard" element ={<DashboardFrame />} />
          <Route path="/fleet-definition" element ={<FleetDefinition />} />
          <Route path ="/about" element={<About />} />
          <Route path ="/feedback" element={<Feedback />} />
          <Route path ="/result" element={<Results />} />
          <Route path ="/parameters" element={<Parameters />} />
        </Routes>

    </BrowserRouter>
    </div>
  );
}

export default App;
