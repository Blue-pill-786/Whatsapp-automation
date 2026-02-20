import express from "express";
import webhookRoutes from "./routes/webhook.routes.js";

import adminRoutes from "./routes/admin.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("WhatsApp Automation Server is running 🚀");
});
app.use(express.static("public"));
app.use(adminRoutes);

app.use("/", webhookRoutes);

export default app;
