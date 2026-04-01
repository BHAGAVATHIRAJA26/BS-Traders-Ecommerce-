const express = require('express');
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require('cors');
const axios = require("axios");
const mongoose = require('mongoose');
const y = require('./mongodb.js');
const { Users, Products, tdata } = require('./mongodb.js');
const multer = require('multer');
const path = require('path');
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;

dotenv.config();

const app = express();
const port = process.env.PORT || 3500;

// CORS configuration - Extremely permissive for all frontend domains as requested
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Allow any domain for maximum compatibility during testing
        return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

// Handle preflight requests for all routes
app.options('*', cors());

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: "UP", timestamp: new Date() });
});

// Root check
app.get('/', (req, res) => {
    res.send("Backend is running smoothly. API is active.");
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

const upload = multer({ storage: multer.memoryStorage() });

// Razorpay configuration
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_Rav7PqqDQLc4Wd",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "eJ9At1SCU94OqHwPQQQ6cLCa",
});

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dzu51wvvf",
  api_key: process.env.CLOUDINARY_API_KEY || "731871515934731",
  api_secret: process.env.CLOUDINARY_API_SECRET || "gtnlnf0RrNQkf2jfNg0FpCeqeCw",
});

// Establish MongoDB connection once at startup for efficiency
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/testdb');
        console.log("MongoDB Connected Successfully");
    } catch (err) {
        console.error("MongoDB Connection Error:", err.message);
    }
};
connectDB();

// Routes
app.post('/', async (req,res)=>{
    const {name,password}=req.body;
    try {
        const d = await Users.findOne({useremail:name, password:password});
        if(d){
            res.json({ message: true, id: d._id});
        } else {
            res.json({ message: false, id: 0});
        }
    } catch(err) {
        res.status(500).json({ message: false, error: err.message });
    }
});

app.post("/google-login", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Users.findOne({ useremail: email });
    if (!user) {
      return res.status(401).json({ message: false, error: "Email not registered" });
    }
    res.json({ message: true, id: user._id });
  } catch (err) {
    res.status(500).json({ message: false, error: err.message });
  }
});

app.post("/get-address", async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Latitude and Longitude required" });
    }
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: { format: "json", lat: latitude, lon: longitude },
        headers: { "User-Agent": "MyApp/1.0" }
      }
    );
    const address = response.data.address;
    res.json({
      country: address.country || "",
      state: address.state || "",
      district: address.county || address.state_district || "",
      city: address.city || address.town || address.village || "",
      area: address.suburb || address.neighbourhood || ""
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch address", error: error.message });
  }
});

app.post('/newreg', async (req, res) => {
  const { name, email, t1, gender, phone, aphone, address } = req.body;
  try {
    if (!name || !email) {
      return res.json({ message: false, error: "Name and email required" });
    }
    const existingUser = await Users.findOne({ useremail: email });
    if (existingUser || name.length <= 0 || email.length <= 0) {
      return res.json({ message: false }); 
    } else {
      const d = await Users.create({
        username: name,
        useremail: email,
        password: t1,
        gender,
        phone,
        aphone,
        address
      });
      return res.json({ message: true });
    }
  } catch (err) {
    console.error("NewReg Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.get('/product', async (req,res)=>{
    try {
        const d = await Products.find();
        res.json(d);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/perinf', async (req,res)=>{
    const id = req.body;
    try {
        const d = await Users.findById(id);
        res.json(d);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/product', async (req,res)=>{
    const search = req.body;
    try {
        const d = await Products.find({desc: { $regex: search, $options: 'i' }});
        res.json(d);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/Card", async (req, res) => {
  try {
    const { id } = req.body;
    const d = await tdata.find({ uid: id });
    res.json(d);
  } catch (err) {
    res.status(500).json({ message: false, error: err.message });
  }
});

app.post("/passch", async (req,res) =>{
    const { name, newpassword } = req.body;
    try {
        const user = await Users.findOne({ useremail: name });
        if (!user) {
          return res.status(404).json({ message: false });
        }
        user.password = newpassword;
        await user.save();
        res.json({ message: true });
    } catch (err) {
        res.status(500).json({ message: false, error: err.message });
    }
});

app.post("/Cardre", async (req,res) =>{
    try {
        const { id } = req.body;
        await tdata.deleteOne({ _id: id });
        res.json({ message: true });
    } catch (err) {
        res.status(500).json({ message: false, error: err.message });
    }
});

app.get('/product/:id', async (req,res)=>{
    const id = req.params.id;
    try {
        const d = await Products.findById(id);
        res.json(d);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/Sell", upload.single("img"), async (req, res) => {
  try {
    const { desc, cos, dis, nop, mob } = req.body;
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: "uploads" }, (error, result) => {
          if (result) resolve(result);
          else reject(error);
        });
        stream.end(fileBuffer);
      });
    };
    const result = await streamUpload(req.file.buffer);
    const product = new Products({
      name: result.original_filename,
      url: result.secure_url,
      public_id: result.public_id,
      desc,
      cos,
      dis,
      nop,
      mob,
    });
    await product.save();
    res.json({ message: true });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.post("/itdata", async (req,res)=>{
    try { 
        const {id, url, desc, cos, dis} = req.body;
        await tdata.create({uid:id, url, desc, cos, dis});
        return res.json({ message: true });
    } catch (err) {
        return res.status(500).json({ message: false, error: err.message });
    }
});

app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "eJ9At1SCU94OqHwPQQQ6cLCa")
    .update(body)
    .digest("hex");
  if (expectedSignature === razorpay_signature) {
    res.json({ success: true, message: "Payment Verified, Order will be received soon"});
  } else {
    res.status(400).json({ success: false, message: "Invalid Signature" });
  }
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
});
