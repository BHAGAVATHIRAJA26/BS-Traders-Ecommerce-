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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Root
app.get("/", (req, res) => {
  res.json({ message: "Backend running on Vercel 🚀" });
});

// ================= LOGIN =================
app.post("/", async (req, res) => {
  await connectDB();
  const { name, password } = req.body;

  const user = await Users.findOne({ useremail: name, password });
  res.json(user ? { message: true, id: user._id } : { message: false });
});

// ================= GOOGLE LOGIN =================
app.post("/google-login", async (req, res) => {
  await connectDB();
  const user = await Users.findOne({ useremail: req.body.email });
  res.json(user ? { message: true, id: user._id } : { message: false });
});

// ================= REGISTER =================
app.post("/newreg", async (req, res) => {
  await connectDB();
  const exists = await Users.findOne({ useremail: req.body.email });

  if (exists) return res.json({ message: false });

  await Users.create(req.body);
  res.json({ message: true });
});

// ================= PROFILE =================
app.post("/perinf", async (req, res) => {
  await connectDB();
  res.json(await Users.findById(req.body));
});

// ================= PRODUCTS =================
app.get("/product", async (req, res) => {
  await connectDB();
  res.json(await Products.find());
});

app.get("/product/:id", async (req, res) => {
  await connectDB();
  res.json(await Products.findById(req.params.id));
});

// ================= SELL =================
app.post("/Sell", upload.single("img"), async (req, res) => {
  await connectDB();

  const uploadImage = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "products" },
      (err, result) => (result ? resolve(result) : reject(err))
    ).end(req.file.buffer);
  });

  await Products.create({
    ...req.body,
    url: uploadImage.secure_url,
    public_id: uploadImage.public_id,
  });

  res.json({ message: true });
});

// ================= CART =================
app.post("/itdata", async (req, res) => {
  await connectDB();
  await tdata.create(req.body);
  res.json({ message: true });
});

app.post("/Card", async (req, res) => {
  await connectDB();
  res.json(await tdata.find({ uid: req.body.id }));
});

// ================= LOCATION =================
app.post("/get-address", async (req, res) => {
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
});

// ================= PAYMENT =================
app.post("/create-order", async (req, res) => {
  const order = await razorpay.orders.create({
    amount: req.body.amount * 100,
    currency: "INR",
  });
  res.json(order);
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
