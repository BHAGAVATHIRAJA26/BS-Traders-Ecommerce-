import express from "express";
import cors from "cors";
import crypto from "crypto";
import axios from "axios";

import { connectDB } from "../config/db.js";
import cloudinary from "../config/cloudinary.js";
import razorpay from "../config/razorpay.js";
import upload from "../middleware/upload.js";

import { Users, Products, tdata } from "../models/mongodb.js";

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

/* ================= ROOT ================= */
app.get("/", (req, res) => {
  res.json({ message: "Backend running on Vercel 🚀" });
});

/* ================= LOGIN ================= */
app.post("/login", async (req, res) => {
  try {
    await connectDB();

    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: false });
    }

    const user = await Users.findOne({
      useremail: name,
      password,
    });

    res.json(user ? { message: true, id: user._id } : { message: false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= GOOGLE LOGIN ================= */
app.post("/google-login", async (req, res) => {
  try {
    await connectDB();

    const user = await Users.findOne({
      useremail: req.body.email,
    });

    res.json(user ? { message: true, id: user._id } : { message: false });
  } catch (err) {
    res.status(500).json({ message: false });
  }
});

/* ================= REGISTER ================= */
app.post("/newreg", async (req, res) => {
  try {
    await connectDB();

    const exists = await Users.findOne({
      useremail: req.body.email,
    });

    if (exists) return res.json({ message: false });

    await Users.create(req.body);
    res.json({ message: true });
  } catch (err) {
    res.status(500).json({ message: false });
  }
});

/* ================= PROFILE ================= */
app.post("/perinf", async (req, res) => {
  try {
    await connectDB();
    const user = await Users.findById(req.body.id);
    res.json(user);
  } catch (err) {
    res.status(500).json(null);
  }
});

/* ================= PRODUCTS ================= */
app.get("/product", async (req, res) => {
  try {
    await connectDB();
    res.json(await Products.find());
  } catch (err) {
    res.status(500).json([]);
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    await connectDB();
    res.json(await Products.findById(req.params.id));
  } catch (err) {
    res.status(500).json(null);
  }
});

/* ================= SELL PRODUCT ================= */
/* ⚠️ Frontend sends Base64 image */
app.post("/Sell", async (req, res) => {
  try {
    await connectDB();

    const { img, desc, cos, dis, nop, mob } = req.body;

    const uploadRes = await cloudinary.uploader.upload(img, {
      folder: "products",
    });

    await Products.create({
      desc,
      cos,
      dis,
      nop,
      mob,
      url: uploadRes.secure_url,
      public_id: uploadRes.public_id,
    });

    res.json({ message: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: false });
  }
});

/* ================= CART ================= */
app.post("/itdata", async (req, res) => {
  try {
    await connectDB();
    await tdata.create(req.body);
    res.json({ message: true });
  } catch (err) {
    res.status(500).json({ message: false });
  }
});

app.post("/Card", async (req, res) => {
  try {
    await connectDB();
    res.json(await tdata.find({ uid: req.body.id }));
  } catch (err) {
    res.status(500).json([]);
  }
});

/* ================= LOCATION ================= */
app.post("/get-address", async (req, res) => {
  try {
    const r = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          format: "json",
          lat: req.body.latitude,
          lon: req.body.longitude,
        },
        headers: { "User-Agent": "Vercel-App" },
      }
    );

    res.json(r.data.address);
  } catch (err) {
    res.status(500).json(null);
  }
});

/* ================= PAYMENT ================= */
app.post("/create-order", async (req, res) => {
  try {
    const order = await razorpay.orders.create({
      amount: req.body.amount * 100,
      currency: "INR",
    });

    res.json(order);
  } catch (err) {
    res.status(500).json(null);
  }
});

app.post("/verify-payment", (req, res) => {
  const body =
    req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  res.json({ success: expected === req.body.razorpay_signature });
});

export default app;
