import myImage from './myimage.jpg';
import './App.css'
import { useParams } from "react-router-dom";
import bi from './bicycle.jpg';
import wa from './watch.jpg';
import sp from './sp.jpg';
import ta from './ta.jpg';
import er from './er.jpg';
import wt from './wt.jpg';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import React from 'react'
import { useEffect,useState} from 'react'

function Conn(){
    const[mii,setmii]=useState();
    const [a,setA]=useState([]);
    const navigate=useNavigate();
    const { id } = useParams();
    const [se,setse]=useState(0);
    function fds(event){
        setse(event.target.value);
    }
    function sea(){
      
      axios.post("/api/product",se,{
           
  headers: { "Content-Type": "text/plain" }})
        .then((response)=>{
        setA(response.data);
        })
        .catch(error=>console.error(error));
      
    }







        function inp(did){
          console.log("poid"+did)
             navigate(`/detail/${did}/${id}`); 
    
        }
        
    function s1(){
                                      
    navigate(`/${id}/Sell`);
    }


    function c1(url,desc,cos,dis){
      
      axios.post("/api/itdata",{id,url,desc,cos,dis})
      .then((response)=>{
        console.log(response.data.message)
      });

    
      
    }


    useEffect(()=>{
      axios.get("/api/product")
        .then((response)=>{
        setA(response.data);
        })
        .catch(error=>console.error(error));
    },[]);
    useEffect(()=>{
      axios.post("/api/perinf",id,{
           
  headers: { "Content-Type": "text/plain" }})
      .then((response)=>{
        setmii(response.data);
        console.log(response.data)
      })
      .catch(error=>console.error(error));
    },[id]);
    return(<>

    <div id='a3'>
                <div id='a2'>
                        <b id='i'>BS Traders</b>
                        <div id='a4'> 
                          
                        <input type='text' size='60'  placeholder='   Search  for Products , Brands and More' onChange={fds}></input>
                        <i className='btn  btn-sm btn-light bi bi-search' onClick={sea}></i>
                        
                        </div>
                        <div>
                              <div id='a7' className='btn  btn-lg btn-light' data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><i className="bi bi-person-circle"></i>Profile</div>
                          <Link to={`/${id}/Sell`}><div id='a7' className='btn  btn-lg btn-light'> <i className="bi bi-shop" onClick={s1}></i> Sell</div></Link>

                          <Link to={`/${id}/Card`}><div id='a8' className='btn  btn-lg btn-light'><i className="bi bi-cart" onClick={c1}></i>Add To Cart</div></Link>
                        </div>


<div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
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
                    <div id="u1">
                    </div>
                    <div id="hie">
                       <center><h1 id="bi"><b>Best Deals, Best Prices!</b></h1></center>
                       <br></br>
                       <br></br>
                      <div id="sr">
                          <img id="yty" src={bi} alt="logo" height="280px" width="370px"></img>
                          <img id="yty" src={wa} alt="logo" height="280px" width="370px"></img>
                          <img id="yty" src={sp} alt="logo" height="280px" width="370px"></img>
                          <img id="yty" src={ta} alt="logo" height="280px" width="370px"></img>
                          <img id="yty" src={er} alt="logo" height="280px" width="370px"></img>
                          <img id="yty" src={wt} alt="logo" height="280px" width="370px"></img>
                      </div>
                    </div>
                    
                  <div style={{marginTop:"100px"}}></div>
                    
                    <form id='b1' >
                    
                         
                          {a.map(item => (
  <b key={item._id} id="b2"  style={{marginTop:"40px"}}>
    <div id="b9" onClick={() => inp(item._id)}>
      <img src={item.url} alt="logo" height="280px" width="370px" />
    </div>

    <h6>{item.desc}</h6>
    <h6>Rating: ⭐⭐⭐⭐☆</h6>
    <b>
      ₹{item.cos - (item.cos * item.dis / 100)}
      <span style={{paddingLeft:"10px"}}>MRP:</span><s> ₹{item.cos}</s>
      <span style={{paddingLeft:"10px"}}>discount:</span><span style={{color:"red"}}>{item.dis}% off</span>
    </b>
     <div id='b7' className='btn  btn-lg btn-dark btn-light' onClick={() => c1(item.url,item.desc,item.cos,item.dis)}> 🛒 Add to Card</div>
  </b>
))}

                    </form>
            </div>


    </>)
}
export default Conn
