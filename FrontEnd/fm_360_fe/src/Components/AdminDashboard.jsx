import { Route, Routes } from "react-router-dom";
import DnDFlow from "./DnDFlow";
import Navbar from "./Navbar";
import ViewCircuit from "./ViewCircuit";

const AdminDashboard = () =>{
    return(
        <div className="admindashboard">
            <Navbar/>
           <Routes>
           
           <Route path="/" element={ <DnDFlow/>}/>
          
           <Route path="/view" element={<ViewCircuit/>}/>
           </Routes>
        </div>
    );
}
export default AdminDashboard;