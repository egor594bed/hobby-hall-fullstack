import express from "express";
import config from "config";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ extended: true } as any));
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/catalog", require("./routes/catalog.routes"));
app.use("/api/order", require("./routes/order.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use(
  "/server/assets/goodsImgs",
  express.static(path.join(__dirname, "../assets/goodsImgs"))
);
app.use(
  "/server/assets/catalogImgs",
  express.static(path.join(__dirname, "../assets/catalogImgs"))
);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "../../client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../../client", "build", "index.html")
    );
  });
}

const PORT = config.get("port") || 5000;
const uri = config.get<string>("mongoUri");

async function start() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    } as mongoose.ConnectOptions);
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
  } catch (e: any) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();
