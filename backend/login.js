
const express=require('express')
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require('cors');
const axios = require("axios");


//mongoose packages
const mongoose=require('mongoose')
const y=require('./mongodb.js')
const { Users, Products,tdata } = require('./mongodb.js');

const multer = require('multer');
const app=express()
const path=require('path')
const port = process.env.PORT || 3500;
app.use(cors({
    origin: ["https://aaa-lyzp.vercel.app", "http://localhost:5173", "http://localhost:3000"],
    credentials: true
}));
app.use(express.text());

//
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
dotenv.config();


app.use(express.json());
const upload = multer({ storage: multer.memoryStorage() });
app.use(express.urlencoded({ extended: true }));




// razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_Rav7PqqDQLc4Wd",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "eJ9At1SCU94OqHwPQQQ6cLCa",
});


//
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dzu51wvvf",
  api_key: process.env.CLOUDINARY_API_KEY || "731871515934731",
  api_secret: process.env.CLOUDINARY_API_SECRET || "gtnlnf0RrNQkf2jfNg0FpCeqeCw",
});

app.post('/',(req,res)=>{
    const {name,password}=req.body;
    console.log(name,password)
    main().catch(err=>console.log(err));
        async function main(){
            await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/testdb');
            d=await y.Users.findOne({useremail:name,password:password}) 
         
    if(d!==null){

            res.json({ message: true,id: d._id});
        }
    else{
            console.log("it is not found")
            res.json({ message: false,id: 0});
    }}
})





app.post("/google-login", async (req, res) => {
  const { email } = req.body;

  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/testdb');

    const user = await Users.findOne({ useremail: email });

    if (!user) {
      return res.status(401).json({
        message: false,
        error: "Email not registered"
      });
    }

    res.json({
      message: true,
      id: user._id
    });

  } catch (err) {
    res.status(500).json({ message: false });
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
        params: {
          format: "json",
          lat: latitude,
          lon: longitude
        },
        headers: {
          "User-Agent": "MyApp/1.0" // REQUIRED by OSM
        }
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
    console.error(error);
    res.status(500).json({ message: "Failed to fetch address" });
  }
});


app.post('/newreg', async (req, res) => {
  const { name, email, t1, gender, phone, aphone, address } = req.body;
  console.log(name, email, t1, gender, phone, aphone, address);

  async function main() {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/testdb');

    const existingUser = await y.Users.findOne({ useremail: email });

    if (existingUser || name.length <= 0 || email.length <= 0) {
      return res.json({ message: false }); 
    } else {
      const d = await y.Users.create({
        username: name,
        useremail: email,
        password: t1,
        gender,
        phone,
        aphone,
        address
      });
      console.log(d);
      return res.json({ message: true });
    }
  }

  main().catch(err => {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  });
});


app.get('/product',(req,res)=>{
  
    main().catch(err=>console.log(err));
        async function main(){
            await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/testdb');
            const d=await y.Products.find()
        
    res.json(d)}
});

app.post('/perinf',(req,res)=>{
    id= req.body;
      main().catch(err=>console.log(err));
        async function main(){
            await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/testdb');
            const d=await y.Users.findById({_id:id})
    console.log(d)
    res.json(d);}
});

app.post('/product',(req,res)=>{
     two=req.body;
    console.log(two)
    main().catch(err=>console.log(err));
        async function main(){
            await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/testdb');
            const d=await y.Products.find({desc: { $regex: two, $options: 'i' }})
            console.log(two);
        
    res.json(d)}

});

app.post("/Card", async (req, res) => {
  try {
    const { id } = req.body; // ✅ correct

    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/testdb');

    // get all cart items for this user
    const d = await y.tdata.find({ uid: id });

   

    res.json(d);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: false });
  }
});


app.post("/passch",async (req,res) =>{
    const { name,newpassword } = req.body; // ✅ correct
try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/testdb');

    const user = await Users.findOne({ useremail: name });

    if (!user) {
      return res.status(404).json({ message: false });
    }

    user.password = newpassword;
    await user.save();

    res.json({ message: true });

  } catch (err) {
    res.status(500).json({ message: false });
  }
});






app.post("/Cardre",async (req,res) =>{
    try {
    const { id } = req.body; // ✅ correct

    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/testdb');

    // get all cart items for this user
    await y.tdata.deleteOne({ _id: id });


    console.log("Cart remove data:", d);

    res.json(d);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: false });
  }
});




app.get('/product/:id',(req,res)=>{
    const id =req.params.id;
     main().catch(err=>console.log(err));
        async function main(){
            await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/testdb');
            const d=await y.Products.findById({_id:id})

    res.json(d);}
  
});




app.post("/Sell", upload.single("img"), async (req, res) => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/testdb');
  try {
    const { desc, cos, dis, nop, mob } = req.body;

    // Upload to Cloudinary
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

    // Save to MongoDB
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
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.post("/itdata",async (req,res)=>{
    

    try { 
    const{id,url,desc,cos,dis}=req.body;
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/testdb');
    const f=await y.tdata.create({uid:id,url,desc,cos,dis})
  return res.json({ message: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: false });
  }

});

app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body; // rupees
    console.log("REQ BODY:", req.body); 
    const order = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Verify Payment
app.post("/verify-payment", (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "eJ9At1SCU94OqHwPQQQ6cLCa")
    .update(body)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    res.json({ success: true, message: "Payment Verified,Order will received soon"});
  } else {
    res.status(400).json({ success: false, message: "Invalid Signature" });
  }
});



app.listen(port, () => console.log(`Server running on http://localhost:${port}`));


