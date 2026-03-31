
import Conn from './Conn.jsx'  
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState ,useEffect} from 'react';
import Reg from './Newreg.jsx';
import axios from "axios";
import { useParams } from "react-router-dom";
import myImage from './myimage.jpg';
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

import React from 'react'
import { useNavigate } from 'react-router-dom';

function Sell() {
      const[mii,setmii]=useState();
       const [img,setimg]=useState();
       const [desc,setdesc]=useState();
       const [cos,setcos]=useState();
       const [dis,setdis]=useState();
       const [nop,setnop]=useState();
       const [mob,setmob]=useState();
      const { id } = useParams();
      function a1(event){
          const file = event.target.files[0];
          setimg(file);
      }

      function a2(event){
          if(event.target.value.length>160)
          {
            alert("Reduce a descrption Size")
          }
          setdesc(event.target.value);
      }

      function a3(event){
          setcos(event.target.value);
      }

      function a4(event){
          setdis(event.target.value);
      }

      function a5(event){
            
          setnop(event.target.value);}
      

      function a6(event){
          setmob(event.target.value);
      }

      function uu(e){
        if(desc===undefined || img===undefined || cos===undefined || dis===undefined || nop===undefined || mob===undefined){
          alert("Fill a product details")
        }
        else{
        const formData=new FormData();
        formData.append("img", img);
        formData.append("desc", desc);
        formData.append("cos", cos);
        formData.append("dis", dis);
        formData.append("nop", nop);
        formData.append("mob", mob);
        e.preventDefault();
         axios
        .post("/api/Sell",formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          if(response.data.message==true){
              alert("your product is ready to sell")       
          }
          else{
            alert("your product is not saved")
          }
        });
      }
    
    }





    useEffect(()=>{
      axios.post("/api/perinf",id,{
           
  headers: { "Content-Type": "text/plain" }})
      .then((response)=>{
        setmii(response.data);
        console.log(response.data)
      })
      .catch(error=>console.error(error));
    },[id]);


      function hi(){
        navigate(`/${id}/Product`)
                
            }
      
        const navigate=useNavigate();
            function s1(){
          navigate(`/${id}/Card`)
            }
  return (
    <>
  <div id='aw' style={{height:"1000px"}}>
        <div id='a2'>
                            <b id='i'>BS Traders</b>
                            <div id='a4'> 
                            <input type='text' size='60'  placeholder='   Search  for Products , Brands and More'></input>
                            <i className="bi bi-search"> </i>
                            </div>
                            <div>
                                  <div id='a7' className='btn  btn-lg btn-light' data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><i className="bi bi-person-circle"></i>Profile</div>
                             
    
                                  <Link to={`/${id}/Card`}><div id='a8' className='btn  btn-lg btn-light'><i className="bi bi-cart" onClick={s1}></i>Add To Cart</div></Link>
                                  <Link to={`/${id}/Product`}><div id='awe' className='btn  btn-lg btn-light'><i className="bi bi-house-door-fill" onClick={hi}></i>Home</div></Link>
                            </div>
    
    
    
<div className="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
  <div className="offcanvas-header">
    <h1 className="offcanvas-title" id="offcanvasWithBothOptionsLabel"><i className="bi bi-person-circle"></i>Profile</h1>
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    
  </div>
  {mii &&
  <div className="offcanvas-body">
    <h2 >{mii.username}</h2>
   <div  id="abcd" style={{ marginTop: "20px", padding: "12px 18px", borderRadius: "10px", background: "linear-gradient(135deg, #f8f9fa, #e9ecef)", boxShadow: "0 4px 10px rgba(0,0,0,0.08)", maxWidth: "420px" }}>
  <div style={{ fontWeight: "600", fontSize: "13px", color: "#495057", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
    <i className="bi bi-envelope-fill" style={{ color: "#0d6efd" }}></i>
    EMAIL
  </div>
  <div style={{ fontSize: "15px", fontWeight: "500", color: "#212529", wordBreak: "break-word" }}>
    {mii.useremail}
  </div>
</div>

<div id="abcd" style={{ marginTop: "16px", padding: "12px 18px", borderRadius: "10px", background: "linear-gradient(135deg, #f8f9fa, #e9ecef)", boxShadow: "0 4px 10px rgba(0,0,0,0.08)", maxWidth: "420px" }}>
  <div style={{ fontWeight: "600", fontSize: "13px", color: "#495057", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
    <i className="bi bi-gender-ambiguous" style={{ color: "#0d6efd" }}></i>
    GENDER
  </div>
  <div style={{ fontSize: "15px", fontWeight: "500", color: "#212529" }}>
    {mii.gender}
  </div>
</div>

<div id="abcd" style={{ marginTop: "16px", padding: "12px 18px", borderRadius: "10px", background: "linear-gradient(135deg, #f8f9fa, #e9ecef)", boxShadow: "0 4px 10px rgba(0,0,0,0.08)", maxWidth: "420px" }}>
  <div style={{ fontWeight: "600", fontSize: "13px", color: "#495057", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
    <i className="bi bi-telephone-fill" style={{ color: "#0d6efd" }}></i>
    PHONE
  </div>
  <div style={{ fontSize: "15px", fontWeight: "500", color: "#212529" }}>
    {mii.phone}
  </div>
</div>

<div id="abcd" style={{ marginTop: "16px", padding: "12px 18px", borderRadius: "10px", background: "linear-gradient(135deg, #f8f9fa, #e9ecef)", boxShadow: "0 4px 10px rgba(0,0,0,0.08)", maxWidth: "420px" }}>
  <div style={{ fontWeight: "600", fontSize: "13px", color: "#495057", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
    <i className="bi bi-telephone-plus-fill" style={{ color: "#0d6efd" }}></i>
    ANOTHER PHONE
  </div>
  <div style={{ fontSize: "15px", fontWeight: "500", color: "#212529" }}>
    {mii.aphone}
  </div>
</div>

<div id="abcd" style={{ marginTop: "16px", padding: "12px 18px", borderRadius: "10px", background: "linear-gradient(135deg, #f8f9fa, #e9ecef)", boxShadow: "0 4px 10px rgba(0,0,0,0.08)", maxWidth: "420px" }}>
  <div style={{ fontWeight: "600", fontSize: "13px", color: "#495057", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
    <i className="bi bi-house-door-fill" style={{ color: "#0d6efd" }}></i>
    ADDRESS
  </div>
  <div style={{ fontSize: "15px", fontWeight: "500", color: "#212529", wordBreak: "break-word" }}>
    {mii.address}
  </div>
</div>

    
  </div> }
</div>
    </div>
            <div id='u1'>
                <div id='oo'>        
                <center><h1>SALES YOUR PRODUCT</h1></center>
                      <br></br> <br></br>
                      <form onSubmit={uu}>
                      <table id="ui1">
                            <tr>
                          
                              <td><label htmlfor="aq">Product Image</label></td>
                              <td><input type="file" accept='image/*' id="aq" onChange={a1}></input></td>
                              <td><label htmlfor="tt">Description</label></td>
                              <td><textarea placeholder="maximum 30 words" id="tt" rows="5" cols="60" style={{fontfamily: "Courier New, Courier, monospace"}} onChange={a2}  maxLength={160}></textarea></td>
                               
                              </tr>
                              <br></br>
                              <tr>
                              <td><label htmlfor="ayq">Cost of Product</label></td>
                              <td><input type="number" id="ayq" onChange={a3}></input></td>
                              <td><label htmlfor="aypq">Discount of Product</label></td>
                              <td><input type="number" id="aypq" onChange={a4}></input></td>
                              </tr>
                              <br></br>
                              <tr>
                              <td><label htmlfor="a">No of product</label></td>
                              <td><input type="number" id="a" onChange={a5}></input></td>
                              <td><label>Phone:No</label></td>
                              <td><input type="number" onChange={a6}></input></td>
                              </tr>
                           </table>
                            <center><div style={{paddingTop:"100px"}}><button type="submit" className="btn btn-primary btn-outline-dark"  style={{cursor:"pointer"}} >Submit</button></div></center>
                            </form>
                      </div></div>
            </div>
                    

    </>
  )
}

export default Sell

