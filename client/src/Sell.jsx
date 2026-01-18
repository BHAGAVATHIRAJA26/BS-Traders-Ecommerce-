import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const API_BASE = import.meta.env.VITE_API_URL;

function Sell() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mii, setmii] = useState(null);
  const [img, setimg] = useState("");
  const [desc, setdesc] = useState("");
  const [cos, setcos] = useState("");
  const [dis, setdis] = useState("");
  const [nop, setnop] = useState("");
  const [mob, setmob] = useState("");

  /* ================= IMAGE ================= */
  const a1 = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setimg(reader.result);
    reader.readAsDataURL(file);
  };

  /* ================= SUBMIT ================= */
  const uu = async (e) => {
    e.preventDefault();

    if (!API_BASE) {
      alert("API URL not configured");
      return;
    }

    if (!img || !desc || !cos || !dis || !nop || !mob) {
      alert("Fill all product details");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/Sell`, {
        sellerId: id,
        url: img,
        desc,
        cos: Number(cos),
        dis: Number(dis),
        nop: Number(nop),
        mob,
      });

      if (res.data?.message === true) {
        alert("Your product is ready to sell");
        navigate(`/${id}/Product`);
      } else {
        alert("Product not saved");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  /* ================= PROFILE ================= */
  useEffect(() => {
    if (!API_BASE) return;

    axios
      .post(
        `${API_BASE}/perinf`,
        id,
        { headers: { "Content-Type": "text/plain" } }
      )
      .then((res) => setmii(res.data))
      .catch(console.error);
  }, [id]);

  return (
    <>
      <div id="aw">
        {/* HEADER */}
        <div id="a2">
          <b id="i">BS Traders</b>

          <div id="a4">
            <input type="text" size="60" placeholder="Search products" />
            <i className="bi bi-search" />
          </div>

          <div>
            <Link to={`/${id}/Card`} className="btn btn-light btn-lg">
              <i className="bi bi-cart" /> Cart
            </Link>

            <Link to={`/${id}/Product`} className="btn btn-light btn-lg">
              <i className="bi bi-house-door-fill" /> Home
            </Link>
          </div>
        </div>

        {/* SELL FORM */}
        <div id="u1">
          <center>
            <h1>SELL YOUR PRODUCT</h1>
          </center>

          <form onSubmit={uu}>
            <table id="ui1">
              <tbody>
                <tr>
                  <td>Product Image</td>
                  <td>
                    <input type="file" accept="image/*" onChange={a1} />
                  </td>

                  <td>Description</td>
                  <td>
                    <textarea
                      maxLength={160}
                      onChange={(e) => setdesc(e.target.value)}
                    />
                  </td>
                </tr>

                <tr>
                  <td>Cost</td>
                  <td>
                    <input type="number" onChange={(e) => setcos(e.target.value)} />
                  </td>

                  <td>Discount</td>
                  <td>
                    <input type="number" onChange={(e) => setdis(e.target.value)} />
                  </td>
                </tr>

                <tr>
                  <td>Quantity</td>
                  <td>
                    <input type="number" onChange={(e) => setnop(e.target.value)} />
                  </td>

                  <td>Mobile</td>
                  <td>
                    <input type="number" onChange={(e) => setmob(e.target.value)} />
                  </td>
                </tr>
              </tbody>
            </table>

            <center style={{ paddingTop: "50px" }}>
              <button className="btn btn-primary">Submit</button>
            </center>
          </form>
        </div>
      </div>
    </>
  );
}

export default Sell;
