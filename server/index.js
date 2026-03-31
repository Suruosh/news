import "dotenv/config";
import express from "express";
import cors from "cors";
import articleRoutes from "./routes/articles.js";
import aiRoutes from "./routes/ai.js";

var app = express();
var PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/articles", articleRoutes);
app.use("/api/ai", aiRoutes);

app.get("/api/health", function (req, res) {
  res.json({ status: "ok" });
});

app.listen(PORT, function () {
  console.log("Server running on http://localhost:" + PORT);
});
