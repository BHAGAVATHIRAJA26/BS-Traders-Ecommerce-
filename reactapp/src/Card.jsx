import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import {useState,useEffect} from 'react'
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useParams } from "react-router-dom";
function Card(){
          
          const [a,setA]=useState([]);
          const { id } = useParams();
           const[mii,setmii]=useState();
          useEffect(()=>{
            console.log(id)
          axios
      .post("/api/Card", {id})
      .then((response) => {
        console.log(response.data)
        setA(response.data); })
         },[id]);
          const [q,setq]=useState(0);
          const [t,sett]=useState(0);

          function ho(event,dis,cos){
            sett(t+cos-(cos*dis/100))
            setq(q+1)
          }

          function remov(id){
            

      axios.post("/api/Cardre", {id})
      .then((response) => {
        console.log(response.data)
         })
         window.location.reload();

          }
  
















          useEffect(()=>{
      axios.post("/api/perinf",id,{
           
  headers: { "Content-Type": "text/plain" }})
      .then((response)=>{
        setmii(response.data);
       
      })
      .catch(error=>console.error(error));
    },[id]);

          function hoo(event,dis,cos){
            if(t>0){
            sett(t-(cos-(cos*dis/100)))
            }
            if(q>=1){
            setq(q-1)
          }
          }
        const navigate=useNavigate();
         


            const payNow = async () => {
    // 1️⃣ Create order
    const { data: order } = await axios.post(
      "/api/create-order",
      { amount: t }
    );

    // 2️⃣ Razorpay options
    const options = {
      key: "rzp_test_Rav7PqqDQLc4Wd",
      amount: order.amount,
      currency: "INR",
      name: "BS Traders",
      description: "Purchase Payment",
      order_id: order.id,

      prefill: {
        name: "Bhagavathi Raja",
        email: "bhagavathiraja@gmail.com",
        contact: "9443278330", // ✅ SENDER PHONE NUMBER
      },

      handler: async function (response) {
        // 3️⃣ Verify payment
        const verify = await axios.post(
          "/api/verify-payment",
          response
        );

        alert(verify.data.message);
      },

      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };       
            function s1(){
          navigate(`/${id}/Sell`)
          
            }

            function hi(){
              navigate(`/${id}/Product`)
            }
   return(<>
   <div id='aw'>
        <div id='a2'>
                            <b id='i'>BS Traders</b>
                            <div id='a4'> 
                            <input type='text' size='60'  placeholder='   Search  for Products , Brands and More'></input>
                            <i className="bi bi-search"> </i>
                            </div>
                            <div>
                                  <div id='a7' className='btn  btn-lg btn-light' data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><i className="bi bi-person-circle"></i>Profile</div>
                              <Link to={`/${id}/Sell`}><div id='a7' className='btn  btn-lg btn-light'> <i className="bi bi-shop" onClick={s1}></i> Sell</div></Link>
    
                            <Link to={`/${id}/Product`}><div id='a8' className='btn  btn-lg btn-light'><i className="bi bi-house-door-fill" onClick={hi}></i>Home</div></Link>
                            </div>
    
    
    
<div className="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
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


    <div id="content" style={{position:"fixed",marginLeft:"1065px",marginTop:"150px"}}>
    <center><h1>PAYMENT</h1></center>
    <br></br>
    <br></br>
    <h3 style={{paddingLeft:"10px"}}>Total Amount:{t}</h3>
    <br></br>
    <h3 style={{paddingLeft:"10px"}}>No of Items:{q}</h3>
    <br></br>
    <div>
    <label htmlfor="email1" className="form-label" style={{marginLeft:"15px"}}><h3>Address</h3></label>
    <input type="text"  id="email1"  className="form-control"   style={{marginLeft:"15px",width:"370px"}} placeholder='Optional(taken by reg detail)'/>
    </div>
    <br></br>
    <br></br>
    <h3 style={{paddingLeft:"10px"}}>Type Of Payment</h3>
    <select style={{marginLeft:"10px"}}>
        <option>UPI</option>
        <option>CASH ON DELEVERIY</option>
        <option>NET BANKING</option>
        <option>EMI</option>
        <option>Credit/Debit Card</option>
    </select>
    <br></br>
    <br></br>
    <center><div id='abcd' className='btn  btn-dark btn-lg btn-light' onClick={payNow} >Buy Now</div></center>
  </div>

            <div id='u1' style={{width:"80%"}}>
    
                <div id='oo'>
                    <div id="container">
  <div id="ratings">
    <div className="rating">
      
    {a.map(products=>(  
      <div key={products._id} >
      
        <img src={products.url} alt="logo" height="280px" width="370px"></img> 
    
        <div id="la"><b>
        {products.desc}</b>
        <br></br><br></br><br></br>
        Rating: ⭐⭐⭐⭐<b>₹{products.cos-(products.cos*products.dis/100)} <span style={{paddingLeft:"10px"}}>MRP:</span>
        <s> ₹{products.cos} </s> <span style={{paddingLeft:"10px"}}>discount:</span>  {products.dis}% off</b></div><br></br>
        <div id="chk">
        <div id='a8' className='btn  btn-dark btn-lg btn-light' onClick={(e)=>ho(e,products.dis,products.cos)}>Buy Now</div>
        <div id="a8" className='btn  btn-dark btn-lg btn-light' onClick={(e)=>hoo(e,products.dis,products.cos)}>Remove</div>
        <div id="a8" className="btn btn-danger btn-lg" onClick={() =>  remov(products._id)}>Remove to Cart</div>

        </div>
        
      <br></br><h1></h1><h1></h1><hr></hr>
        </div>))}
      </div>
    <div>
        </div>
  </div>

  
</div>
                </div>
                </div>
            </div>   
           
    
    </>)

}
export default Card
