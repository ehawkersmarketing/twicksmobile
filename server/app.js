const passport = require("passport");
const cors = require("cors");
const express = require("express");
require("./mongodb/mongodb");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
const authRoute = require("./routes/authRoute/authRoute");
const cookieSession = require("cookie-session");
const userRoute = require("./routes/userRoute/userRoute");
const cartRoute = require("./routes/cartRoute/cartRoute");
const productRoute = require("./routes/productRoute/productRoute");
const blogRoute = require("./routes/blogRoute/blogRoute");
const payRoute = require("./routes/payRoute/payRoute");
const serviceRoute = require('./routes/serviceRoute/serviceRoute')
const shipRoute = require("./routes/shipRoute/shipRoute");
const reviewRoute = require('./routes/review/reviewRoute');
const orderRoute = require("./routes/orderRoute/orderRoute");
const googleAuthRoute = require("./routes/googleAuthRoute/googleAuthRoute");
const path = require("path");
const graphRoute = require('./routes/graphRoute/graphRoute')
// require('./middleware/passport')(passport);

app.use(express.json());
app.use(cors())
// app.use(
//   cors({
//     origin: "http://localhost:8080",
//     methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
//     credentials: true,
//   })
// );

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// const _dirname = path.dirname("")
// const buildPath = path.join(_dirname, "../client/build");

// app.use(express.static(buildPath))

// app.get("/*", function (req, res) {

//   res.sendFile(
//     path.join(__dirname, "../client/build/index.html"),
//     function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     }
//   );

// })

app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
// app.use(passport.initialize());
// app.use(passport.session());

app.use("/auth", authRoute);
// app.use('/googleAuth', googleAuthRoute);
app.use("/api", productRoute);
app.use("/api", userRoute);
app.use("/api", blogRoute);
app.use("/api", cartRoute);
app.use("/api/pay", payRoute);
app.use("/api", orderRoute);
app.use("/api/ship", shipRoute);
app.use("/api", serviceRoute);
app.use("/api", reviewRoute);
app.use("/api" , graphRoute)

app.use(express.static("public"));
app.get("/:file", (req, res) => {
  res.sendFile(__dirname + `/public/images/${req.params.file}`);
});

app.get("/blog/:file", (req, res) => {
  res.sendFile(__dirname + `/public/blog/images/${req.params.file}`);
});

app.get("/service/:file", (req, res) => {
  res.sendFile(__dirname + `/public/${req.params.file}`);
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on PORT => ${PORT}`);
});
