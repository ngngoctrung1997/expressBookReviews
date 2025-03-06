const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  let {username, password} = req.body;
  if(isValid(username)){
    users.push({username,password});
    return res.status(200).json({message: "Register success"});
  }
  return res.status(400).json({message: "Username already exists"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  if(isbn){
    let book = books[isbn];
    if(book){
        return res.status(200).json(book);
    }
    return res.status(404).json({message: "Unknown ISBN"});
  }
  return res.status(400).json({message: "No input"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let author = req.params.author;
  let bookList = Object.keys(books).map((key) => books[key]);
  let result = bookList.filter(b => b.author === author);
  return res.status(200).json(result);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let title = req.params.title;
  let bookList = Object.keys(books).map((key) => books[key]);
  let result = bookList.filter(b => b.title === title);
  return res.status(200).json(result);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  let book = books[isbn]
  if(book){
    let review = book.review;
    return res.status(200).json({review});
  }
  return res.status(404).json({message: "Unknown book"});
});

module.exports.general = public_users;
