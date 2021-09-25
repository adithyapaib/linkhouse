//Dependencies
import * as express from "express";
import { model, Schema, Model, Document, connect } from 'mongoose';
interface d extends Document {
  value: string;
  username: string;
}
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
const G: Model<d> = model('documents', documentSchema)

require("dotenv").config();

//Middle-wares
(async function () {
  connect(process.env.DB);
})();


let app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

var shortid = (length: number, chars: string) => {
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

app.get("/", (req: Request, res: any) => {
  res.render("index");
});



app.get("/new", async (req: Request, res: any) => {
  let short: string = shortid(6, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz_-");
  await res.render("new", { username: short });
});
app.get("/new/:id", async (req: any, res: any) => {
  ``
  let username = await req.params.id;
  res.render("new", { username });
});

let detectURLs = async (string: string) =>
  await string.replace(
    /(\b(https?|ftp|file):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/gim,
    '<a href="$1">$1</a><br>'
  );

app.post("/save", async (req: any, res: any) => {
  let body = await req.body.value, username = await req.body.username;
  body = await detectURLs(body)
  body = await body.replace(/\n/g, '<br>')
  let value = await `<p class="saved">${body} </p>`
  await console.log("Value is " + value + "Username is " + username)
  try {
    let d = await G.create({ username: username, value: value });
    return res.redirect(`/${d.username}`);
  } catch (err) {
    res.render("404")

  }
});


app.get("/user/:id", async (req: any, res: any) => {
  const username = await req.params.id;
  let test = await G.find({ username });
  console.log(test);
  if (test.length > 0) {
    res.json(true);
  } else {
    res.json(false);
  }
});

app.get("/:id", async (req: any, res: any, next: express.NextFunction) => {
  let id = await req.params.id;
  let document = await G.findOne({ username: id });
  if (document) {
    let code = await document.value;
    return await res.render("code", { code, username: id });
  } else
    return res.render("404");
});
app.get("/*", async (req, res: any) => res.render("404"));


app.listen(3000);

/* 
<!-- class="<%= locals.language ? `language-${locals.language}` : "" %> "> --> */
