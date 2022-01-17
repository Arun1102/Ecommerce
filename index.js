const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const UserTest = require("./routes/User");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");


dotenv.config();
app.use(express.json())
app.use("/api/user", UserTest);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);


mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("Database connected succesfully")})
.catch((err)=>{
    console.log(err)
});

app.get("/api/user",()=>{
    console.log("api sucessfull")
})

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend server is running Successfullys")
});

//mongodb+srv://arunEcommerce:m8raricUSNXMtrU1@cluster0.bcxwn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//password: m8raricUSNXMtrU1