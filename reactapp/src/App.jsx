import Conn from './Conn.jsx'  
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider,useGoogleLogin} from "@react-oauth/google";
import { useState} from 'react';
function App() {
  const navigate=useNavigate();
  const [p1,setp1]=useState(false);
  const [name,setname]=useState("");
  const [password,setpassword]=useState("");
  const [ne,setne]=useState(false)
  const [t1,sett1]=useState();
  const [b1,setb1]=useState();
  const [z1,setz1]=useState(false);
  const fi = (e) => setname(e.target.value);
  const se = (e) => setpassword(e.target.value);

    function handleSubmit(e){
        e.preventDefault(); 
    axios
      .post("/api/", { name,password })
      .then((response) => {
        setp1(response.data.message); 
      
    if(response.data.message){
   
      alert("Successfully Login")
      navigate(`/${response.data.id}/product`);
    }
    else{
      alert("invalid email or password")
    }});
  }

  function fpp(){
      setne(true)
  }

  function ibh(){
    axios
      .post("/api/passch", { name,newpassword:t1})
      .then((response) => {
        if(response.data.message){
          alert("Successfully password Changed")
          setne(false)
        }
        else{
          alert("Invalid email")
        }
      });
  }
  function pass(event){
      const d=event.target.value;
      sett1(event.target.value);
    }
    function ck(event){
      const v=event.target.value
      setb1(event.target.value);
      if(v!==t1){
        setz1(true);}
      else{
         setz1(false);
      }
  
    }

  function Reg2(){
    navigate("/newreg"); 
  }

  const login = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    try {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );

      const email = userInfo.data.email;

      const res = await axios.post(
        "/api/google-login",
        { email }
      );

      if (res.data.message) {
        alert("Login Success");
        navigate(`/${res.data.id}/product`);
      }

    } catch (err) {
      alert("Email not registered. Please register first.");
    }
  },
  onError: () => alert("Google login failed"),
});

  return (

    <>
  
  {!p1 && !ne &&(
<form id="f1" onSubmit={handleSubmit}>
    <div id="c1" >

  <div>
    <center><h2>Login</h2></center><br></br>
    <label htmlFor="email1" className="form-label" style={{marginLeft:"15px"}}>Email address</label>
    <input type="email"  id="email1"  className="form-control" aria-describedby="emailHelp" onChange={fi}  style={{marginLeft:"15px",width:"370px"}}/>
  </div>
  <br></br>
  <div className="mb-3">
    <label htmlFor="p1" className="form-label" style={{marginLeft:"15px"}}>Password</label>
    <input type="password" className="form-control" id="p1" onChange={se} style={{marginLeft:"15px",width:"370px"}}/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="c1y" style={{marginLeft:"0px"}}/>
    <label className="form-check-label" htmlFor="c1y" style={{marginLeft:"5px"}}>Check me out</label>
  </div>
  <center><div><button type="submit" className="btn btn-primary btn-outline-dark"  style={{cursor:"pointer"}}>Submit</button></div></center>
    <br></br>
<div className='a1' style={{marginLeft:"15px"}}><p>Don't have an account ? <a onClick={Reg2} style={{cursor:"pointer",color:'blue'}}> Register here</a></p></div>
<a style={{marginLeft:"15px",color:"red",cursor:"pointer"}} onClick={fpp}>Forgot password</a>
<br></br>
<br></br>
      <div
      className="btn btn-primary btn-outline-dark w-100"
      onClick={() => login()}
    >
      <i className="bi bi-google"></i> Login with Google
      
    </div>

</div>
</form>)}
    {p1 && 
            <Conn></Conn>
    }
    {ne &&(<>
    <div id="f1">
    <div id="c1" >
      <div>
    <center><h2 style={{paddingTop:"30px"}}>Change a Password</h2></center><br></br>
    <label htmlFor="email1" className="form-label" style={{marginLeft:"15px"}}>Email address</label>
    <input type="email"  id="email1"  className="form-control" aria-describedby="emailHelp" onChange={fi}  style={{marginLeft:"15px",width:"370px"}}/>
  </div>
  <br></br>
   <div className="mb-3">
    <label htmlfor="p1" className="form-label" style={{marginLeft:"15px"}}>New Password</label>
    <input type="password" className="form-control" id="p1"  value={t1} onChange={pass} style={{marginLeft:"15px",width:"370px"}}/>
  </div>
  <div className="mb-3">
    <label htmlfor="p1" className="form-label" style={{marginLeft:"15px"}}>Re type-Password</label>
    <input type="password" className="form-control" id="p1"  value={b1} onChange={ck} style={{marginLeft:"15px",width:"370px"}}/>
  </div>
  {z1 && <p style={{color:"red",marginLeft:"15px"}}>Password is InCorrect</p>}
    <center><div><button type="button" className="btn btn-primary btn-outline-dark"  style={{cursor:"pointer",marginTop:"50px"}} onClick={ibh}>Submit</button></div></center>
    </div>
    </div>
    </>)

    }
    
      </>
  );
}

export default App
























