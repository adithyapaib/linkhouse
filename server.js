const express = require("express");
const mongoose = require("mongoose");
const Document = require("./models/Documents");
const uri = "mongodb+srv://adithya:kDY3KKDJd89FhhSt@cluster0.amvxk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

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
let detectURLs = (string) =>{
    let hello =  string.replace(/(\b(https?|ftp|file):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/img, '<a href="$1">$1</a>');
    return hello;
  }
app.post("/save", async (req, res) => {
  let value = await req.body.value;
  value = await detectURLs(value);
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
