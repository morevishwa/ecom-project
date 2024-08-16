const express = require("express");
const dbConnection = require("./dbConfig/connection");
const userRouter = require("./router/usersRouter");
const productRouter = require("./router/productRouters");
const cartRouter = require("./router/cartRouter");
const orderRouter = require("./router/orderRouter");
const path = require("path");
const  cors = require('cors')
require("dotenv").config();
const Port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())
// app.get("/", async (req, res) => {
//   res.json({"masssage":"test msg"})
// });
app.use(
  "/resources",
  express.static(path.join(__dirname, "./public/prodImage"))
);
app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/orders", orderRouter);

app.listen(Port, async () => {
  try {
    await dbConnection;

    console.log(`listening on http://localhost:${Port}/`);
  } catch (error) {
    console.log("app.listen  error:", error);

    console.log(`error while listening on ${Port}`);
  }
});
