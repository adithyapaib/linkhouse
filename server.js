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
let username = await req.body.username;
console.log(body);
body = await detectURLs(body)
body = await body.replace(/\n/g, '<br>');
let value =  await `<p class="saved" >${body} </p>`
  try {
    const document = await Document.create({ value: value , username: username });
    res.redirect(`/${document.username}`);
  } catch {
    res.render("new", { value });
  }
});

app.get("/:id", async (req, res) => {
  let id = req.params.id;
  let document = await Document.findOne({username: id})
  if(document){
    res.render("code-display", { code: document.value });
  }
  else{
    res.redirect("/");
  }
  

});


app.get("/user/:id", async (req, res) => {
  const username = await req.params.id
  let test = await Document.find({ username });
  console.log(test)
  if(test.length > 0){
    res.json(true)
  }
  else{
    res.json(false)
  } 
});

app.get('/new/:id', async(req, res) => {
  let username = await req.params.id
  let test = await Document.find({ username });
  if(test.length > 0)
    return res.render("404")
  res.render("new", { username })
})

                    

app.listen(3000);

/* 
<!-- class="<%= locals.language ? `language-${locals.language}` : "" %> "> --> */