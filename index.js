const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

const cookieObj = {
  httpOnly: true,
  secure: process.env.NODE_ENV == "production",
  sameSite: process.env.NODE_ENV == "production" ? "none" : "strict",
};

app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN, {
    expiresIn: "1h",
  });
  res.cookie("access_token", token, cookieObj).send({ success: true });
});

app.post("/out", async (req, res) => {
  res
    .clearCookie("access_token", { ...cookieObj, maxAge: 0 })
    .send({ logOut: true });
});

// donar data
app.post("/donar-data", async (req, res) => {
  // console.log(req.body);
  res.send("thank you");
});

app.get("/get-donar-data", async (req, res) => {
  // load data from mongodb
});

app.delete("/delete-donar-data", async (req, res) => {
  // delete data from mongodb
});

app.patch('/update-donar-data', async(req, res) => {
  // update donar data
})

app.get("/", (req, res) => {
  res.send("Donate blood now.");
});

app.listen(port, () => {
  console.log(`server is running: ${port}`);
});
