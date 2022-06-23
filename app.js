var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemSchema);

app.get("/", function (req, res) {
  Item.find({}, function (err, f) {
    res.render("index", { newListItem: f });
  });
});

app.post("/", function (req, res) {
  i = req.body.add;
  const item = new Item({
    name: i,
  });
  item.save();
  res.redirect("/");
});

app.post("/delete", function (req, res) {
  Item.findByIdAndRemove(req.body.checkbox, function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.listen(3000, function () {
  console.log("start");
});