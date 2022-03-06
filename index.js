const express = require("express");
const app = express();
const port = 8000;
const inputRouter = require("./routes/input");

app.use(express.json());
const cors = require('cors');
app.use(
  express.urlencoded({
    extended: true,
  })
);
const whitelist = ["http://localhost:3000"]

const corsOptions = {

  origin: function (origin, callback) {

    if (!origin || whitelist.indexOf(origin) !== -1) {

      callback(null, true)

    } else {

      callback(new Error("Not allowed by CORS"))

    }

  },

  credentials: true,

}

app.use(cors(corsOptions))

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/input", inputRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});