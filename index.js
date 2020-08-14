const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

// middlewares
//use cors
app.use(cors());
//use body-parser
app.use(bodyParser.json());

const uri = process.env.DB_PATH;
let client = new MongoClient(uri, { useNewUrlParser: true });

//routes

//post data to mongo
app.post("/addTask", (req, res) => {
  client = new MongoClient(uri, { useNewUrlParser: true });
  const task = req.body;
  client.connect((err) => {
    const collection = client.db("redOnion").collection("foodItems");
    // perform actions on the collection object
    collection.insertOne(
      task, //callback
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result.ops[0]);
        }
      }
    );
    client.close();
  });
});
//get data from mongo
app.get("/foods", (req, res) => {
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((err) => {
    const collection = client.db("redOnion").collection("foodItems");
    // perform actions on the collection object
    collection.find().toArray(
      //callback
      (err, documents) => {
        if (err) {
          console.log(err);
        } else {
          res.send(documents);
        }
      }
    );
    client.close();
  });
});
//port calling
app.listen(3010, () => {
  console.log("listening to port --3010--");
});
