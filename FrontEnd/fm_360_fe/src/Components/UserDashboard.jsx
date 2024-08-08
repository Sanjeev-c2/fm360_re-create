import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import ViewPage from "./ViewPage";

const UserDashboard = () =>{
    return(
        <div className="userdashboard">
            <Navbar/>
            <Routes>
                <Route path="/" element={<ViewPage/>}/>
            </Routes>
        </div>
    );
}
export default UserDashboard;