require("dotenv").config();
require("./db.js").connectToDB() ;

const express = require("express");
const userRouter = require("./user.js");
const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());


app.use("/user",userRouter);

app.post("/", (req, res) => {
  console.log(
    `PORT: ${port} , NAME: ${req.body?.name || ""} , TIME: ${Date.now()}`
  );
  res.status(200).json({ message: `hello, ${req.body?.name || "name dal na chutiye , kal subah panvel niklan hai"}` });
});

app.listen(port, () => console.log(`App is live at : ${port}`));
