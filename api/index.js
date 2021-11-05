//Dependencies
import express from "express";
import { model, Schema, Model, Document, connect } from 'mongoose';

const documentSchema = new Schema({
  value:
  {
    type: String,
    required: true
  },
  username:
  {
    type: String
  },
});
const G = model('documents', documentSchema)

require("dotenv").config();

//Middle-wares
(async function () {
  connect(process.env.DB);
})();


let app = express();
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



app.get("/new", async (req, res) => {
  let short = shortid(6, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz_-");
  await res.render("new", { username: short });
});
app.get("/new/:id", async (req, res) => {
  ``
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
  let value = await `<p class="saved">${body} </p>`
  try {
    let d = await G.create({ username: username, value: value });
    return res.redirect(`/${d.username}`);
  } catch (err) {
    res.render("404")

  }
});


app.get("/user/:id", async (req, res) => {
  const username = await req.params.id;
  let test = await G.find({ username });
  if (test.length > 0) {
    res.json(true);
  } else {
    res.json(false);
  }
});

app.get("/:id", async (req, res, next) => {
  let id = await req.params.id;
  let document = await G.findOne({ username: id });
  if (document) {
    let code = await document.value;
    return await res.render("code", { code, username: id });
  } else
    return res.render("404");
});
app.get("/*", async (req, res) => res.render("404"));


app.listen(3000);

module.exports = app;