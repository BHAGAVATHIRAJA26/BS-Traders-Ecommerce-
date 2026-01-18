import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// ✅ Safe defaults
const API_URL = import.meta.env.VITE_API_URL || "/api";
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY;

function Card() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [a, setA] = useState([]);
  const [mii, setmii] = useState(null);
  const [q, setq] = useState(0);
  const [t, sett] = useState(0);

  /* ================= CART ================= */
  useEffect(() => {
    axios
      .post(`${API_URL}/Card`, { id })
      .then((res) => setA(res.data))
      .catch(() => alert("Failed to load cart"));
  }, [id]);

  /* ================= USER INFO ================= */
  useEffect(() => {
    axios
      .post(`${API_URL}/perinf`, { id })
      .then((res) => setmii(res.data))
      .catch(() => console.log("User info error"));
  }, [id]);

  /* ================= TOTAL CALC ================= */
  function ho(_, dis, cos) {
    sett((prev) => prev + (cos - (cos * dis) / 100));
    setq((prev) => prev + 1);
  }

  function hoo(_, dis, cos) {
    sett((prev) => Math.max(0, prev - (cos - (cos * dis) / 100)));
    setq((prev) => Math.max(0, prev - 1));
  }

  /* ================= REMOVE ITEM ================= */
  function remov(pid) {
    axios.post(`${API_URL}/Cardre`, { id: pid }).then(() => {
      setA((prev) => prev.filter((p) => p._id !== pid));
    });
  }

  /* ================= RAZORPAY ================= */
  const payNow = async () => {
    if (t <= 0) {
      alert("Cart is empty");
      return;
    }

    try {
      const { data: order } = await axios.post(
        `${API_URL}/create-order`,
        { amount: t }
      );

      const options = {
        key: RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "BS Traders",
        description: "Purchase Payment",
        order_id: order.id,

        handler: async function (response) {
          const verify = await axios.post(
            `${API_URL}/verify-payment`,
            response
          );
          alert(verify.data.message);
        },

        theme: { color: "#3399cc" },
      };

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded");
        return;
      }

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      alert("Payment failed");
    }
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <div id="a2">
        <b id="i">BS Traders</b>

        <div id="a4">
          <input type="text" size="60" placeholder="Search for Products" />
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

          <Link to={`/${id}/Product`}>
            <div id="a8" className="btn btn-lg btn-light">
              <i className="bi bi-house-door-fill"></i> Home
            </div>
          </Link>
        </div>
      </div>

      {/* ================= PAYMENT ================= */}
      <div
        id="content"
        style={{ position: "fixed", right: "40px", top: "150px" }}
      >
        <h3>Total Amount: ₹{t}</h3>
        <h3>No of Items: {q}</h3>

        <center>
          <div className="btn btn-dark btn-lg" onClick={payNow}>
            Buy Now
          </div>
        </center>
      </div>

      {/* ================= CART ITEMS ================= */}
      <div id="u1" style={{ width: "80%" }}>
        {a.map((p) => (
          <div key={p._id}>
            <img src={p.url} height="280" width="370" alt="product" />

            <b>{p.desc}</b>
            <p>
              ₹{p.cos - (p.cos * p.dis) / 100}{" "}
              <s>₹{p.cos}</s> ({p.dis}% OFF)
            </p>

            <button onClick={(e) => ho(e, p.dis, p.cos)}>Add</button>
            <button onClick={(e) => hoo(e, p.dis, p.cos)}>Remove</button>

            <button
              className="btn btn-danger"
              onClick={() => remov(p._id)}
            >
              Remove from Cart
            </button>

            <hr />
          </div>
        ))}
      </div>
    </>
  );
}

export default Card;

