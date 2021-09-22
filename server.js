const express = require("express");
const mongoose = require("mongoose");
const Document = require("./models/Documents");


require('dotenv').config()
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));



app.get("/", (req, res) => {
  res.render("index",);
});
app.get("/new", (req, res) => {
  res.render("new");
});


let detectURLs = async (string) => await string.replace(/(\b(https?|ftp|file):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/img, '<a href="$1">$1</a><br>');



app.post("/save", async (req, res) => {
let body = await req.body.value;
body = await detectURLs(body);
let value =  await `<p class="saved" >${body} </p>`
  try {
    const document = await Document.create({ value });
    res.redirect(`/${document.id}`);
  } catch {
    res.render("new", { value });
  }
});




app.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const document = await Document.findById(id);
    res.render("code-display", { code: document.value });
  } catch (e) {
    res.render("/");
  }
});

app.listen(3000);

/* 
<!-- class="<%= locals.language ? `language-${locals.language}` : "" %> "> --> */