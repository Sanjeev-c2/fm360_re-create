import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar';
import RegisterPage from './Components/RegisterPage';
import LandingPage from './Components/LandingPage';
import UserDashboard from './Components/UserDashboard';
import AdminDashboard from './Components/AdminDashboard';
import ViewCircuit from './Components/ViewCircuit';
import UserSignup from './Components/UserSignup';
// import DnDFlow from './Components/DnDFlow';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/adminsignup' element={<RegisterPage/>}/>
        <Route path='/usersignup' element={<UserSignup/>}/>
        {/* <Route path='/navbar' element={<Navbar/>}/> */}
        <Route path='/userdashboard/*' element={<UserDashboard/>}/>
        <Route path='/admindashboard/*' element={<AdminDashboard/>}/>
        {/* <Route path='/admindashboard/' element={<DnDFlow/>}/> */}
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
