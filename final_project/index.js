const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const axios_implement = require('./router/axios_implement.js').axiosImplement;

const app = express();
const JWT_SECRET = "fingerprint_customer";

app.use(express.json());

app.use("/customer",session({secret:JWT_SECRET,resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
    if (req.session.authorization) { 
    token = req.session.authorization['accessToken']; 
    jwt.verify(token, JWT_SECRET, (err, username) => { 
      if (!err) {
        req.username = username.data;
        next();
      } else {
        return res.status(403).json({ message: "User not authenticated" });
      }
    });
  } else {
    return res.status(403).json({ message: "User not logged in" });
  }
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);
app.use("/axios",axios_implement);

app.listen(PORT,()=>console.log("Server is running"));