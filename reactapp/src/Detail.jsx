import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import myImage from './myimage.jpg';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Detail(){
    
        const {did,id}=useParams();
        
         const[mii,setmii]=useState();
        const [a,setA]=useState(null);
        const navigate=useNavigate();
        function s1(){
          navigate(`/${id}/Sell`)
            
        }

        function c1(url,desc,cos,dis){
      
      axios.post("/api/itdata",{id,url,desc,cos,dis})
      .then((response)=>{
        console.log(response.data.message)
      });

    
      
    }

        
          
 useEffect(()=>{
      axios.post("/api/perinf",id,{
           
  headers: { "Content-Type": "text/plain" }})
      .then((response)=>{
        setmii(response.data);

      })
      .catch(error=>console.error(error));
    },[id]);




    
            useEffect(()=>{
      axios.get(`/api/product/${did}`)
        .then((response)=>{
        setA(response.data);
      
        })
        .catch(error=>console.error(error));
    },[did]);
    

    return(<>
    
    <div id='a2'>
                        <b id='i'>BS Traders</b>
                        <div id='a4'> 
                        <input type='text' size='60'  placeholder='   Search  for Products , Brands and More'></input>
                        <i className="bi bi-search"> </i>
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




























{a &&

       ( <div id="u1" style={{
  display: "flex",
  gap: "50px",
  padding: "40px",
  maxWidth: "1200px",
  margin: "auto",
  background: "#fff",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
}}>

  {/* Product Image */}
  <div style={{
    flex: "1",
    display: "flex",
    marginTop:"200px",
    justifyContent: "center",
    alignItems: "center",
    background: "#f8f9fa",
    borderRadius: "14px",
    padding: "20px"
  }}>
    <img
      src={a.url}
      alt="product"
      style={{
        maxWidth: "100%",
        maxHeight: "420px",
        objectFit: "contain",
        borderRadius: "10px"
      }}
    />
  </div>

  {/* Product Details */}
  <div style={{ flex: "1.2" }}>
    <h2 style={{
      fontWeight: "700",
      marginBottom: "15px",
      marginTop:"200px",
      color: "#212529"
    }}>
      {a.desc}
    </h2>

    <div style={{ color: "#f4b400", fontSize: "18px", marginBottom: "10px" }}>
      ⭐⭐⭐⭐☆
    </div>

    <div style={{ marginBottom: "20px" }}>
      <span style={{
        fontSize: "28px",
        fontWeight: "700",
        color: "#198754"
      }}>
        ₹{a.cos - (a.cos * a.dis / 100)}
      </span>

      <span style={{
        marginLeft: "12px",
        textDecoration: "line-through",
        color: "#6c757d"
      }}>
        ₹{a.cos}
      </span>

      <span style={{
        marginLeft: "12px",
        color: "#dc3545",
        fontWeight: "600"
      }}>
        {a.dis}% OFF
      </span>
    </div>

    <button
      onClick={() => c1(a.url,a.desc,a.cos,a.dis)}
      style={{
        padding: "14px 30px",
        fontSize: "16px",
        fontWeight: "600",
        borderRadius: "10px",
        border: "none",
        background: "linear-gradient(135deg, #212529, #343a40)",
        color: "#fff",
        cursor: "pointer",
        transition: "0.3s"
      }}
      onMouseOver={e => e.target.style.opacity = "0.9"}
      onMouseOut={e => e.target.style.opacity = "1"}
    >
      🛒 Add to Cart
    </button>
  </div>

</div>
)
}
              
                
    </>)
}
export default Detail
