const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("port", process.env.PORT | 5300);

app.listen(app.get("port"), () => {
  console.log(`Server running on port ${app.get("port")}`);
});
