import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Dropdown from 'react-bootstrap/Dropdown';
import '../Styles/Navbar.css';
const Navbar = ()=>{


    return(
        <div className="navbar">
            <div id="logo">
            <h3>Fm<span style={{color:'red',fontStyle:'italic'}}>360</span></h3>
            
            </div>
            <div id="menu">
            <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
      <AccountCircleIcon/>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {/* <Dropdown.Item href="/admindashboard/view">Admin View</Dropdown.Item> */}
        <Dropdown.Item href="/userdashboard">User View</Dropdown.Item>
        <Dropdown.Item href="/">Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
               

            </div>
        </div>
    );
}
export default Navbar;