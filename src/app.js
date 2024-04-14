/* LOAD ENVIRONMENT VARIABLES USING dotenv */
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth-route");
const error = require("./middlewares/error");
const notFound = require("./middlewares/not-found");

const app = express();

app.use(express.json());
app.use(cors()); // Allow Cross-Origin requests
app.use(helmet()); // Secure web applications by setting crucial HTTP headers.
app.use(morgan("dev")); // logging HTTP req and res
app.use("/public", express.static("public"));

app.use("/auth", authRoute);

app.use(notFound);
app.use(error);

const PORT = process.env.PORT || 8001;
mongoose
  .connect(
    process.env.MONGO_URI
    // {
    //  useNewUrlParser: true,
    //  useUnifiedTopology: true,
    // }
  )
  .then(async () => {
    console.log("Connected to MongoDB");

    /* DROP EXISTING COLLECTIONS */
    // await mongoose.connection.db.dropDatabase();
    // console.log("Database dropped");

    /* ADD DATA */
    // User.insertMany(users);
    // Post.insertMany(posts);
    // console.log("Add Data to database ");

    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
