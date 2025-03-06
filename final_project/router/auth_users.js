const express = require('express');
const jwt = require('jsonwebtoken');
const books = require('./booksdb.js');
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
    return !users.find(u => u.username === username)
}

const authenticatedUser = (username,password)=>{ //returns boolean
    let checked = users.find(u => u.username === username);
    return checked && checked.password === password
}

const JWT_SECRET = "fingerprint_customer";
//only registered users can login
regd_users.post("/login", (req,res) => {
    const {username,password} = req.body;
    if(authenticatedUser(username,password)){
        let accessToken = jwt.sign({
            data: username
        }, JWT_SECRET, { expiresIn: 60 * 60 });
        // Store access token in session
        req.session.authorization = {
            accessToken
        }
        return res.status(200).send({message:"Login success"});
    }
    return res.status(400).send({message:"Login fail"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  let username = req.username;
  console.log(username);
  let review = req.body.review;
  let isbn = req.params.isbn;
  let book = books[isbn];
  console.log(book);
  if(!book) return res.status(404).json({message: "Unknown book"});
  book.reviews[username] = review;
  return res.status(200).json({message: "Review posted"});
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    let username = req.username;
    console.log(username);
    let review = req.body.review;
    let isbn = req.params.isbn;
    let book = books[isbn];
    if(!book) return res.status(404).json({message: "Unknown book"});
    delete book.reviews[username]
    return res.status(200).json({message: "Review deleted"});
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
