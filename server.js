//Dependencies
const express = require("express");
const mongoose = require("mongoose");
const Document = require("./models/Documents");
require("dotenv").config();

//Middle-wares
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

var shortid = (length, chars) => {
  var str = "";
  if (length == null || typeof length != "number") {
    length = 6;
  }
  if (chars == null) {
    chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  }
  chars.split("");
  for (var i = 0; i < length; i++)
    str += chars[Math.floor(Math.random() * chars.length)];
  return str;
};

// Routes

app.get("/", (req, res) => {
  res.render("index");
});



app.get("/new",async (req, res) => {
  let short = shortid(6);
  await res.render("new" , {username: short});
});
app.get("/new/:id", async (req, res) => {``
  let username = await req.params.id;
  res.render("new", { username });
});

let detectURLs = async (string) =>
  await string.replace(
    /(\b(https?|ftp|file):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/gim,
    '<a href="$1">$1</a><br>'
  );

app.post("/save", async (req, res) => {
let body = await req.body.value, username = await req.body.username;
body = await detectURLs(body)
body = await body.replace(/\n/g, '<br>')
let value =  await `<p class="saved">${body} </p>`
await console.log("Value is "+value+ "Username is " + username)
 try {
    let d = await Document.create({ username: username, value: value });
    return  res.redirect(`/${d.username}`);
  } catch(err) {
    res.render("404")
    
  }
});


app.get("/user/:id", async (req, res) => {
  const username = await req.params.id;
  let test = await Document.find({ username });
  console.log(test);
  if (test.length > 0) {
    res.json(true);
  } else {
    res.json(false);
  }
});

app.get("/:id", async (req, res, next) => {
  let id = await req.params.id;
  let document = await Document.findOne({ username: id });
  if (document) {
    let code = await document.value;
    await res.render("code-display", { code });
  } else 
    next();
});
app.get("/*", async (req, res) => res.render("404"));


app.listen(3000);

/* 
<!-- class="<%= locals.language ? `language-${locals.language}` : "" %> "> --> */
