import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

function Detail() {
  const { did, id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [product, setProduct] = useState(null);

  /* ================= ADD TO CART ================= */
  const addToCart = async () => {
    try {
      await axios.post(`${API}/itdata`, {
        id,
        url: product.url,
        desc: product.desc,
        cos: product.cos,
        dis: product.dis
      });
      alert("Added to cart");
    } catch (err) {
      console.error(err);
      alert("Failed to add cart");
    }
  };

  /* ================= USER PROFILE ================= */
  useEffect(() => {
    if (!id) return;

    axios.post(`${API}/perinf`, { id })
      .then(res => setUser(res.data))
      .catch(err => console.error("User error:", err));
  }, [id]);

  /* ================= PRODUCT DETAIL ================= */
  useEffect(() => {
    if (!did) return;

    axios.get(`${API}/product/${did}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error("Product error:", err));
  }, [did]);

  return (
    <>
      {/* HEADER */}
      <div id="a2">
        <b id="i">BS Traders</b>

        <div id="a4">
          <input type="text" size="60" placeholder="Search Products" />
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
      <div className="offcanvas offcanvas-end" id="profile">
        <div className="offcanvas-header">
          <h5>Profile</h5>
          <button className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>

        {user && (
          <div className="offcanvas-body">
            <p><b>Name:</b> {user.username}</p>
            <p><b>Email:</b> {user.useremail}</p>
            <p><b>Phone:</b> {user.phone}</p>
            <p><b>Address:</b> {user.address}</p>
          </div>
        )}
      </div>

      {/* PRODUCT DETAIL */}
      {product && (
        <div id="u1" style={{
          display: "flex",
          gap: "40px",
          padding: "40px",
          maxWidth: "1200px",
          margin: "auto"
        }}>
          <img
            src={product.url}
            alt="product"
            style={{ width: "400px", objectFit: "contain" }}
          />

          <div>
            <h2>{product.desc}</h2>
            <h4>⭐⭐⭐⭐☆</h4>

            <h3 style={{ color: "green" }}>
              ₹{product.cos - (product.cos * product.dis) / 100}
              <s style={{ marginLeft: 10 }}>₹{product.cos}</s>
              <span style={{ color: "red", marginLeft: 10 }}>
                {product.dis}% OFF
              </span>
            </h3>

            <button className="btn btn-dark btn-lg" onClick={addToCart}>
              🛒 Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Detail;

