import "./App.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";

// ✅ Safe API fallback
const API = import.meta.env.VITE_API_URL || "/api";

function Conn() {
  const [mii, setMii] = useState(null);
  const [a, setA] = useState([]);
  const [se, setSe] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  /* ================= SEARCH ================= */
  const fds = (e) => setSe(e.target.value);

  const sea = async () => {
    try {
      const res = await axios.post(`${API}/product`, { search: se });
      setA(res.data);
    } catch (err) {
      console.error("Search error", err);
    }
  };

  /* ================= PRODUCT DETAIL ================= */
  const inp = (did) => {
    navigate(`/detail/${did}/${id}`);
  };

  /* ================= ADD TO CART ================= */
  const c1 = async (url, desc, cos, dis) => {
    try {
      await axios.post(`${API}/itdata`, {
        id,
        url,
        desc,
        cos,
        dis,
      });
      alert("Added to cart");
    } catch (err) {
      console.error("Add to cart error", err);
    }
  };

  /* ================= LOAD PRODUCTS ================= */
  useEffect(() => {
    axios
      .get(`${API}/product`)
      .then((res) => setA(res.data))
      .catch((err) => console.error("Product load error", err));
  }, []);

  /* ================= USER INFO ================= */
  useEffect(() => {
    axios
      .post(`${API}/perinf`, { id })
      .then((res) => setMii(res.data))
      .catch((err) => console.error("User info error", err));
  }, [id]);

  return (
    <>
      {/* ================= HEADER ================= */}
      <div id="a3">
        <div id="a2">
          <b id="i">BS Traders</b>

          <div id="a4">
            <input
              type="text"
              size="60"
              placeholder="Search for Products, Brands and More"
              onChange={fds}
            />
            <i
              className="btn btn-sm btn-light bi bi-search"
              onClick={sea}
            ></i>
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

        {/* ================= PRODUCTS ================= */}
        <div id="b1">
          {a.map((item) => (
            <div key={item._id} id="b2">
              <div id="b9" onClick={() => inp(item._id)}>
                <img
                  src={item.url}
                  alt="product"
                  height="280"
                  width="370"
                />
              </div>

              <h6>{item.desc}</h6>
              <h6>Rating: ⭐⭐⭐⭐☆</h6>

              <b>
                ₹{item.cos - (item.cos * item.dis) / 100}
                <s style={{ marginLeft: "10px" }}>₹{item.cos}</s>
                <span style={{ color: "red", marginLeft: "10px" }}>
                  {item.dis}% OFF
                </span>
              </b>

              <div
                id="b7"
                className="btn btn-lg btn-dark"
                onClick={() =>
                  c1(item.url, item.desc, item.cos, item.dis)
                }
              >
                🛒 Add to Cart
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Conn;
