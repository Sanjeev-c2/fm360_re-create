import { useState } from 'react';
import '../Styles/RegisterPage.css';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () =>{

    let [name,setname] = useState("")
    let [email,setemail] = useState("")
    let [password,setpassword] = useState("")

    let data = {name,email,password}

    let navigate = useNavigate()


    let signup=(e)=>{
        e.preventDefault();
        // axios.post('http://localhost:8000/api/user/save/',data)
        // .then((res)=>{
        //     console.log(res.data);
        //     alert("Registered Successfully!!!")
        //     navigate("/")
        // })
        // .catch((err)=>{
        //     console.log(err);
        //     alert("Couldn't Registered!!!")
            
        // })
        
        localStorage.setItem('Admin', JSON.stringify(data));
        alert("Registered Successfully!!!")
        navigate("/")
    }

    return(
        <div className="registerpage">
            <div className="form">
                <h2>Admin SignUp</h2>
            <form action="" onSubmit={signup}>
                <div><label htmlFor="">Name: </label>
                <input type="text" placeholder='Enter your Name' required
                value={name}
                onChange={(e)=>{setname(e.target.value)}}/></div>
                <div><label htmlFor="">Email: </label>
                <input type="email" placeholder='Enter your Email' required
                value={email}
                onChange={(e)=>{setemail(e.target.value)}}/></div>
                <div><label htmlFor="">Password: </label>
                <input type="password" placeholder='Enter your Password' required
                value={password}
                onChange={(e)=>{setpassword(e.target.value)}}/></div>
                <button>Submit</button>
            </form>
            </div>
            
        </div>
    );
}
export default RegisterPage;