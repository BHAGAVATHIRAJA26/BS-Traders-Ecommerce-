import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function Abc() {
  const navigate = useNavigate();

  const [z1, setz1] = useState(false);
  const [t1, sett1] = useState("");
  const [b1, setb1] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [ne, setne] = useState(false);
  const [ll, setll] = useState("");
  const [fll, setfll] = useState("");
  const [gender, setgender] = useState("");
  const [phone, setphone] = useState("");
  const [aphone, setaphone] = useState("");

  /* ================= AUTO LOCATION ================= */
  useEffect(() => {
    if (!API) {
      console.error("VITE_API_URL is missing");
      return;
    }

    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(`${API}/get-address`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            }),
          });

          if (!res.ok) throw new Error("Failed to fetch address");

          const data = await res.json();
          setll(
            `${data.area}, ${data.city}, ${data.district}, ${data.state}, ${data.country}`
          );
        } catch (err) {
          console.error("Location error:", err);
        }
      },
      () => alert("Please allow location access")
    );
  }, []);

  const locadd = () => setfll(ll);

  const pass = (e) => {
    sett1(e.target.value);
    setz1(e.target.value !== b1 && b1 !== "");
  };

  const ck = (e) => {
    setb1(e.target.value);
    setz1(e.target.value !== t1);
  };

  /* ================= REGISTER ================= */
  const al = async (e) => {
    e.preventDefault();

    if (!API) {
      alert("API URL not configured");
      return;
    }

    if (z1) {
      alert("Password mismatch");
      return;
    }

    try {
      const res = await axios.post(`${API}/newreg`, {
        name,
        email,
        password: t1,
        gender,
        phone,
        aphone,
        address: fll,
      });

      if (res.data?.message) {
        alert("Registration successful");
        navigate("/");
      } else {
        alert("Email already registered");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <>
      <form id="f1" onSubmit={al}>
        <div id="c2">
          <center>
            <h2>Create New Account</h2>
          </center>

          {!ne && (
            <>
              <label className="form-label">User Name</label>
              <input
                className="form-control"
                required
                onChange={(e) => setname(e.target.value)}
              />

              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                required
                onChange={(e) => setemail(e.target.value)}
              />

              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={t1}
                required
                onChange={pass}
              />

              <label className="form-label">Re-type Password</label>
              <input
                type="password"
                className="form-control"
                value={b1}
                required
                onChange={ck}
              />

              {z1 && (
                <p style={{ color: "red" }}>Password mismatch</p>
              )}

              <center>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => setne(true)}
                >
                  Next
                </button>
              </center>
            </>
          )}

          {ne && (
            <>
              <label>Gender</label>
              <br />
              <input
                type="radio"
                name="g"
                value="Male"
                onChange={(e) => setgender(e.target.value)}
              />{" "}
              Male
              <input
                type="radio"
                name="g"
                value="Female"
                onChange={(e) => setgender(e.target.value)}
                style={{ marginLeft: "10px" }}
              />{" "}
              Female

              <label className="form-label">Phone</label>
              <input
                className="form-control"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
              />

              <label className="form-label">Another Phone</label>
              <input
                className="form-control"
                value={aphone}
                onChange={(e) => setaphone(e.target.value)}
              />

              <button
                type="button"
                className="btn btn-secondary mt-2"
                onClick={locadd}
              >
                Use Current Location
              </button>

              <label className="form-label mt-2">Address</label>
              <textarea
                className="form-control"
                value={fll}
                onChange={(e) => setfll(e.target.value)}
              />

              <center>
                <button type="submit" className="btn btn-dark mt-3">
                  Submit
                </button>
              </center>
            </>
          )}
        </div>
      </form>
    </>
  );
}

export default Abc;

