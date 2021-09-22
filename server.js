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
  const code = `Hello`;
  res.render("code-display", { code, language: "plaintext" });
});
app.get("/new", (req, res) => {
  res.render("new");
});


let detectURLs = async (string) => await string.replace(/(\b(https?|ftp|file):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/img, '</code> <a href="$1">$1</a> <code> </code>');



app.post("/save", async (req, res) => {
let body = await req.body.value;
body = await detectURLs(body);
let value =  await `<code>${body} </code>`
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