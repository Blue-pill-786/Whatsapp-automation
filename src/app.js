import express from "express";
import webhookRoutes from "./routes/webhook.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("WhatsApp Automation Server is running 🚀");
});
app.use(express.static("public"));

app.use("/", webhookRoutes);

export default app;
