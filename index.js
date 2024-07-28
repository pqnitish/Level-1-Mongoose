const express = require("express");
const connection = require("./config/db");
const {userRouter,productRouter} = require("./routes/user.route");
const server = express();
const PORT = 3001;
server.use(express.json());
server.use("/user",userRouter);
server.use("/products",productRouter)
server.get("/", (req, res) => {
  res.send("server is running fine");
});
server.listen(PORT, async () => {
  try {
    await connection;
    console.log(`server is running on port: ${PORT} and connected to database`);
  } catch (error) {
    console.log(`error in connecting server ${error}`);
  }
});
