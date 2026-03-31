import './App.css'
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function Abc(){
    const navigate=useNavigate();
    const [z1,setz1]=useState(false);
    const [t1,sett1]=useState();
    const [b1,setb1]=useState();
    const [name,setname]=useState();
    const [email,setemail]=useState();
    const [ne,setne]=useState(false);
    const [ll,setll]=useState();
    const [fll,setfll]=useState("");
    const [gender,setgender]=useState();
    const [phone,setphone]=useState();
    const [aphone,setaphone]=useState();
    function f1(event){
      setname(event.target.value);
    }
    function f2(event){
      setemail(event.target.value);
    }

    function locadd(){
      console.log(ll)
      setfll(ll)
    }
    
      useEffect(() => {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      try {
        const res = await fetch("/api/get-address", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          })
        });

        const data = await res.json();
        console.log("ADDRESS:", data);

        setll(
          `${data.area}, ${data.city}, ${data.district}, ${data.state}, ${data.country}`
        );
      } catch (err) {
        console.error("API error", err);
      }
    },
    (error) => {
      // 👇 USER DENIED LOCATION
      alert("Please allow location to auto-fill address");
      console.error(error);
    }
  );
}, []);

    function al(e){
        if(z1==true){
           alert("check a password,email")
        }
        e.preventDefault();
         axios
        .post("/api/newreg", {name,email,t1,gender,phone,aphone,address:fll})
        .then((response) => {
          if(response.data.message==true && !z1){
              alert("Regisration is successfully completed")
              navigate("/"); 
          }
          else{
            alert("your email is already registered")
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
    return (<>
      <form id="f1" onSubmit={al}>
    <div id="c2">
  
    <center><h2>Create New Account</h2></center><br></br>
    {!ne && (<>
    <div>
    <label forhtml="email1" className="form-label" style={{marginLeft:"15px"}}>User Name</label>
    <input type="text"  id="email1"  className="form-control"  onChange={f1} style={{marginLeft:"15px",width:"370px"}}/>
    <br></br>
    <label forhtml="email1" className="form-label" style={{marginLeft:"15px"}}>Email address</label>
    <input type="email"  id="email1"  className="form-control" aria-describedby="emailHelp" onChange={f2} style={{marginLeft:"15px",width:"370px"}}/>
  </div>
  <br></br>
  <div className="mb-3">
    <label forhtml="p1" className="form-label" style={{marginLeft:"15px"}}>Password</label>
    <input type="password" className="form-control" id="p1"  value={t1} onChange={pass} style={{marginLeft:"15px",width:"370px"}}/>
  </div>
  <div className="mb-3">
    <label forhtml="p1" className="form-label" style={{marginLeft:"15px"}}>Re type-Password</label>
    <input type="password" className="form-control" id="p1"  value={b1} onChange={ck} style={{marginLeft:"15px",width:"370px"}}/>
  </div>
  {z1 && <p style={{color:"red",marginLeft:"15px"}}>Password is InCorrect</p>}
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="c1y" style={{marginLeft:"0px"}}/>
    <label className="form-check-label" forhtml="c1y"  style={{marginLeft:"5px"}}>Access a terms and condition</label>
    <br></br>
    <br></br>
    <center><button type="button" className="btn btn-primary btn-outline-dark" onClick={() => {setne(true)}}>Next</button></center>
  </div></>)}

  {ne && (<>
  <div>
      <label htmlFor="mf" style={{marginLeft:"15px"}}>Gender: </label>
      <br></br>
  <div className="form-check form-check-inline" id="mf">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" style={{marginLeft:"15px"}} value="Male" onChange={(e) => setgender(e.target.value)} checked={gender === "Male"}/>
  <label className="form-check-label" htmlFor="inlineRadio1" style={{marginLeft:"5px"}}> Male</label>
</div>

<div className="form-check form-check-inline" id="mf">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Female" onChange={(e) => setgender(e.target.value)} checked={gender === "Female"}/>
  <label className="form-check-label" htmlFor="inlineRadio2"> Female</label>
</div>
</div>
<br></br>
  <div>
    <label forhtml="pno" className="form-label" style={{marginLeft:"15px"}}>Phone</label>
    <input type="text"  id="pno"  className="form-control" style={{marginLeft:"15px",width:"370px"}} value={phone} onChange={(e) => setphone(e.target.value)}/>
  </div>
  <br></br>
   <div>
    <label forhtml="apno" className="form-label" style={{marginLeft:"15px"}}>Another-Phone</label>
    <input type="text"  id="apno"  className="form-control" style={{marginLeft:"15px",width:"370px"}} value={aphone} onChange={(e) => setaphone(e.target.value)}/>
  </div>
  <br></br>
  <button type="button" className="btn btn-primary btn-outline-dark" style={{marginLeft:"15px"}} onClick={locadd}>Generate by Current Location</button>
   <div>
    <label forhtml="apno1" className="form-label" style={{marginLeft:"15px"}} >Address</label>
    <textarea  id="apno1"  className="form-control"   style={{marginLeft:"15px",width:"370px"}} value={fll} onChange={(e) => setfll(e.target.value)}/>
  </div>
   <br></br>
  <center><button type="submit" className="btn btn-primary btn-outline-dark" >Submit</button></center>
    </>)}
</div>
</form>
    </>);
}
export default Abc
