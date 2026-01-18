import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

function Detail() {

  const { did, id } = useParams();
  const [mii, setMii] = useState(null);
  const [a, setA] = useState(null);
  const navigate = useNavigate();

  const s1 = () => {
    navigate(`/${id}/Sell`);
  };

  const c1 = async (url, desc, cos, dis) => {
    try {
      await axios.post(`${API}/itdata`, {
        id, url, desc, cos, dis
      });
    } catch (err) {
      console.error(err);
    }
  };

  // USER PROFILE
  useEffect(() => {
    axios.post(
      `${API}/perinf`,
      id,
      { headers: { "Content-Type": "text/plain" } }
    )
      .then(res => setMii(res.data))
      .catch(err => console.error(err));
  }, [id]);

  // PRODUCT DETAIL
  useEffect(() => {
    axios.get(`${API}/product/${did}`)
      .then(res => setA(res.data))
      .catch(err => console.error(err));
  }, [did]);

  return (
    <>
      {/* HEADER */}
      <div id="a2">
        <b id="i">BS Traders</b>

        <div id="a4">
          <input
            type="text"
            size="60"
            placeholder="Search for Products, Brands and More"
          />
          <i className="bi bi-search"></i>
        </div>

        <div>
          <div
            id="a7"
            className="btn btn-lg btn-light"
            data-bs-toggle="offcanvas"
            data-bs-target="#profile"
          >
            <i className="bi bi-person-circle"></i> Profile
          </div>

          <Link to={`/${id}/Sell`}>
            <div id="a7" className="btn btn-lg btn-light">
              <i className="bi bi-shop"></i> Sell
            </div>
          </Link>

          <Link to={`/${id}/Card`}>
            <div id="a8" className="btn btn-lg btn-light">
              <i className="bi bi-cart"></i> Cart
            </div>
          </Link>
        </div>
      </div>

      {/* PROFILE OFFCANVAS */}
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="profile">
        <div className="offcanvas-header">
          <h5><i className="bi bi-person-circle"></i> Profile</h5>
          <button className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>

        {mii && (
          <div className="offcanvas-body">
            <h4>{mii.username}</h4>
            <p><b>Email:</b> {mii.useremail}</p>
            <p><b>Gender:</b> {mii.gender}</p>
            <p><b>Phone:</b> {mii.phone}</p>
            <p><b>Alt Phone:</b> {mii.aphone}</p>
            <p><b>Address:</b> {mii.address}</p>
          </div>
        )}
      </div>

      {/* PRODUCT DETAIL */}
      {a && (
        <div id="u1" style={{
          display: "flex",
          gap: "50px",
          padding: "40px",
          maxWidth: "1200px",
          margin: "auto"
        }}>

          <div style={{ flex: 1 }}>
            <img
              src={a.url}
              alt="product"
              style={{ width: "100%", maxHeight: "420px", objectFit: "contain" }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <h2>{a.desc}</h2>
            <h5>⭐⭐⭐⭐☆</h5>

            <h3 style={{ color: "green" }}>
              ₹{a.cos - (a.cos * a.dis / 100)}
              <s style={{ marginLeft: "10px", color: "#777" }}>₹{a.cos}</s>
              <span style={{ color: "red", marginLeft: "10px" }}>
                {a.dis}% OFF
              </span>
            </h3>

            <button
              className="btn btn-dark btn-lg"
              onClick={() => c1(a.url, a.desc, a.cos, a.dis)}
            >
              🛒 Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Detail;
