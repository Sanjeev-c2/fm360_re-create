import { useState } from 'react';
import '../Styles/LandingPage.css'
import { useNavigate } from 'react-router-dom';
const LandingPage = () =>{

    let [name,setname] = useState("")
    let [password,setpassword] = useState("")

    let navigate = useNavigate('')

      function login(){
        let Admin = JSON.parse(localStorage.getItem('Admin'));
        let User = JSON.parse(localStorage.getItem('User'));
        if(name === Admin.name && password === Admin.password){
            alert("Logging Success!!")
            navigate('/admindashboard')
        }
        else if(name === User.name && password === User.password){
            alert("Logging Success!!")
            navigate('/userdashboard')
        }
        else{
            alert("Incorrect Username or password!!!")
        }
      }

    return(
        <div className="landingpage">
            <div id='img'>
                <img src="https://images.pexels.com/photos/5554755/pexels-photo-5554755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
            </div>
        <div id="container">
            <form action="" onSubmit={login}>
                <h2>Login</h2>
                <><input type="text" placeholder='Enter the username' required
                value={name} onChange={(e)=>{setname(e.target.value)}}/></>
                <><input type="password" placeholder='Enter the password' required
                value={password} onChange={(e)=>{setpassword(e.target.value)}}/></>
                <><button>Login</button></>
                <><a href="">forgot password?</a></> 
                <p>Are you new to the page? <a href="/adminsignup">Admin Signup</a> <a href="/usersignup">User Signup</a></p>
            </form>
        </div>
        </div>
    );
}
export default LandingPage;