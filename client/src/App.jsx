import Conn from "./Conn.jsx";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";

// ✅ Vercel + Vite API base URL
const API_URL = import.meta.env.VITE_API_URL || "/api";

function App() {
  const navigate = useNavigate();

  const [p1, setp1] = useState(false);
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [ne, setne] = useState(false);

  const [t1, sett1] = useState("");
  const [b1, setb1] = useState("");
  const [z1, setz1] = useState(false);

  const fi = (e) => setname(e.target.value);
  const se = (e) => setpassword(e.target.value);

  /* ================= LOGIN ================= */
  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(`${API_URL}/login`, { name, password })
      .then((response) => {
        if (response.data.message) {
          alert("Successfully Login");
          navigate(`/${response.data.id}/product`);
        } else {
          alert("Invalid email or password");
        }
      })
      .catch(() => alert("Server error"));
  }

  /* ================= FORGOT PASSWORD ================= */
  function fpp() {
    setne(true);
  }

  function ibh() {
    if (z1) {
      alert("Password mismatch");
      return;
    }

    axios
      .post(`${API_URL}/passch`, {
        name,
        newpassword: t1,
      })
      .then((response) => {
        if (response.data.message) {
          alert("Password changed successfully");
          setne(false);
        } else {
          alert("Invalid email");
        }
      })
      .catch(() => alert("Server error"));
  }

  function pass(e) {
    sett1(e.target.value);
  }

  function ck(e) {
    const v = e.target.value;
    setb1(v);
    setz1(v !== t1);
  }

  function Reg2() {
    navigate("/newreg");
  }

  /* ================= GOOGLE LOGIN ================= */
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        const email = userInfo.data.email;

        const res = await axios.post(`${API_URL}/google-login`, {
          email,
        });

        if (res.data.message) {
          alert("Login Success");
          navigate(`/${res.data.id}/product`);
        }
      } catch {
        alert("Email not registered. Please register first.");
      }
    },
    onError: () => alert("Google login failed"),
  });

  return (
    <>
      {/* ================= LOGIN ================= */}
      {!p1 && !ne && (
        <form id="f1" onSubmit={handleSubmit}>
          <div id="c1">
            <center>
              <h2>Login</h2>
            </center>

            <label className="form-label" style={{ marginLeft: "15px" }}>
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              onChange={fi}
              style={{ marginLeft: "15px", width: "370px" }}
              required
            />

            <label className="form-label" style={{ marginLeft: "15px" }}>
              Password
            </label>
            <input
              type="password"
              className="form-control"
              onChange={se}
              style={{ marginLeft: "15px", width: "370px" }}
              required
            />

            <center>
              <button
                type="submit"
                className="btn btn-primary btn-outline-dark"
              >
                Submit
              </button>
            </center>

            <p style={{ marginLeft: "15px" }}>
              Don't have an account?{" "}
              <span
                onClick={Reg2}
                style={{ cursor: "pointer", color: "blue" }}
              >
                Register here
              </span>
            </p>

            <span
              style={{ marginLeft: "15px", color: "red", cursor: "pointer" }}
              onClick={fpp}
            >
              Forgot password
            </span>

            <div
              className="btn btn-primary btn-outline-dark w-100"
              onClick={() => login()}
            >
              <i className="bi bi-google"></i> Login with Google
            </div>
          </div>
        </form>
      )}

      {/* ================= AFTER LOGIN ================= */}
      {p1 && <Conn />}

      {/* ================= CHANGE PASSWORD ================= */}
      {ne && (
        <div id="f1">
          <div id="c1">
            <center>
              <h2>Change Password</h2>
            </center>

            <input
              type="email"
              className="form-control"
              onChange={fi}
              placeholder="Email"
              style={{ marginLeft: "15px", width: "370px" }}
            />

            <input
              type="password"
              className="form-control"
              placeholder="New Password"
              value={t1}
              onChange={pass}
              style={{ marginLeft: "15px", width: "370px" }}
            />

            <input
              type="password"
              className="form-control"
              placeholder="Re-type Password"
              value={b1}
              onChange={ck}
              style={{ marginLeft: "15px", width: "370px" }}
            />

            {z1 && (
              <p style={{ color: "red", marginLeft: "15px" }}>
                Password mismatch
              </p>
            )}

            <center>
              <button
                className="btn btn-primary btn-outline-dark"
                onClick={ibh}
              >
                Submit
              </button>
            </center>
          </div>
        </div>
      )}
    </>
  );
}

export default App;

