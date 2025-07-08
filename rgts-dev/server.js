require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { port, uri } = require("./config");
const { logger } = require("./utils");

const app = express();

mongoose
  .connect(uri, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => logger.info("connected to MongoDB"))
  .catch((err) => logger.error(err));

app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_BASE_URL, process.env.ADMIN_BASE_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

const Client = require("./routes/client/index.js");
const Admin = require("./routes/admin/index.js");
app.use("/api/v1", Client);
app.use("/api/v1", Admin);

app.listen(port, () => logger.info(`Server up at port ${port}`));
