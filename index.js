const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/productRoutes");
const categoryRoute = require("./routes/categoryRoutes");
const authRoute = require("./routes/authRoutes");
const swaggerUi = require("swagger-ui-express");
const authMidleware = require("./midleware/authMidleware");
const swaggerDocument = require("./swagger.json"); // Путь к вашему Swagger JSON файлу
const cors = require("cors");
const path = require("path");
const url = "";

mongoose
  .connect(
    "mongodb+srv://samsievazizhon43:samsievazizhon43@azizkhon0.n51o9.mongodb.net/"
  )
  .then(() => console.log("Connected to DB"))
  .catch((error) => {
    console.error("Error connecting to DB", error);
    process.exit(1);
  });

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/product", productRoute);
app.use("/category", categoryRoute);
// app.use("/auth", authRoute);
app.use("/image", express.static(path.join(__dirname, "images")));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
