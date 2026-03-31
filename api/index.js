require('dotenv').config();
const express = require('express');
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require('cors');
const axios = require("axios");
const mongoose = require('mongoose');
const multer = require('multer');
const { Users, Products, tdata } = require('./mongodb.js');
const cloudinary = require("cloudinary").v2;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

// MongoDB connection
let isConnected = false;
const connectDB = async () => {
    if (isConnected) return;
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
};

// Razorpay configuration
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// Routes - adjusted to be relative (works for Vercel /api/ handler)
const router = express.Router();

router.post('/', async (req, res) => {
    const { name, password } = req.body;
    try {
        const d = await Users.findOne({ useremail: name, password: password });
        if (d !== null) {
            res.json({ message: true, id: d._id });
        } else {
            res.json({ message: false, id: 0 });
        }
    } catch (err) {
        res.status(500).json({ message: false });
    }
});

router.post("/google-login", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await Users.findOne({ useremail: email });
        if (!user) {
            return res.status(401).json({ message: false, error: "Email not registered" });
        }
        res.json({ message: true, id: user._id });
    } catch (err) {
        res.status(500).json({ message: false });
    }
});

router.post("/get-address", async (req, res) => {
    try {
        const { latitude, longitude } = req.body;
        if (!latitude || !longitude) {
            return res.status(400).json({ message: "Latitude and Longitude required" });
        }
        const response = await axios.get("https://nominatim.openstreetmap.org/reverse", {
            params: { format: "json", lat: latitude, lon: longitude },
            headers: { "User-Agent": "MyApp/1.0" }
        });
        const address = response.data.address;
        res.json({
            country: address.country || "",
            state: address.state || "",
            district: address.county || address.state_district || "",
            city: address.city || address.town || address.village || "",
            area: address.suburb || address.neighbourhood || ""
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch address" });
    }
});

router.post('/newreg', async (req, res) => {
    const { name, email, t1, gender, phone, aphone, address } = req.body;
    try {
        const existingUser = await Users.findOne({ useremail: email });
        if (existingUser || !name || !email) {
            return res.json({ message: false });
        } else {
            await Users.create({ username: name, useremail: email, password: t1, gender, phone, aphone, address });
            return res.json({ message: true });
        }
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/product', async (req, res) => {
    try {
        const d = await Products.find();
        res.json(d);
    } catch (err) {
        res.status(500).json([]);
    }
});

router.post('/perinf', async (req, res) => {
    const id = req.body;
    try {
        const d = await Users.findById(id);
        res.json(d);
    } catch (err) {
        res.status(500).json(null);
    }
});

router.post('/product', async (req, res) => {
    const two = req.body;
    try {
        const d = await Products.find({ desc: { $regex: two, $options: 'i' } });
        res.json(d);
    } catch (err) {
        res.status(500).json([]);
    }
});

router.post("/Card", async (req, res) => {
    try {
        const { id } = req.body;
        const d = await tdata.find({ uid: id });
        res.json(d);
    } catch (err) {
        res.status(500).json({ message: false });
    }
});

router.post("/passch", async (req, res) => {
    const { name, newpassword } = req.body;
    try {
        const user = await Users.findOne({ useremail: name });
        if (!user) return res.status(404).json({ message: false });
        user.password = newpassword;
        await user.save();
        res.json({ message: true });
    } catch (err) {
        res.status(500).json({ message: false });
    }
});

router.post("/Cardre", async (req, res) => {
    try {
        const { id } = req.body;
        await tdata.deleteOne({ _id: id });
        res.json({ message: true });
    } catch (err) {
        res.status(500).json({ message: false });
    }
});

router.get('/product/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const d = await Products.findById(id);
        res.json(d);
    } catch (err) {
        res.status(500).json(null);
    }
});

router.post("/Sell", upload.single("img"), async (req, res) => {
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
            desc, cos, dis, nop, mob,
        });
        await product.save();
        res.json({ message: true });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

router.post("/itdata", async (req, res) => {
    try {
        const { id, url, desc, cos, dis } = req.body;
        await tdata.create({ uid: id, url, desc, cos, dis });
        return res.json({ message: true });
    } catch (err) {
        return res.status(500).json({ message: false });
    }
});

router.post("/create-order", async (req, res) => {
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

router.post("/verify-payment", (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");
    if (expectedSignature === razorpay_signature) {
        res.json({ success: true, message: "Payment Verified, Order will received soon" });
    } else {
        res.status(400).json({ success: false, message: "Invalid Signature" });
    }
});

// Use the router for both /api and root as a safety measure
app.use('/api', router);
app.use('/', router);

// Export the app for Vercel
module.exports = app;

if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3500;
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
}
