import express from "express";
import { google } from "googleapis";

const router = express.Router();

// 🔥 Helper to fetch leads from Sheet
async function fetchLeads() {
  const auth = new google.auth.JWT({
    email: process.env.GSHEET_CLIENT_EMAIL,
    key: process.env.GSHEET_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });

  await auth.authorize();

  const sheets = google.sheets({ version: "v4", auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GSHEET_ID,
    range: "A:H"
  });

  return response.data.values || [];
}

// 🔥 Get Leads Per Client
router.get("/admin/leads/:clientId", async (req, res) => {
  try {
    const rows = await fetchLeads();

    // row[3] = ClientId (based on new structure)
    const filtered = rows.filter(row => row[3] === req.params.clientId);

    res.json(filtered);

  } catch (err) {
    console.error("Fetch leads error:", err.message);
    res.status(500).json({ error: "Failed to fetch leads" });
  }
});

// 🔥 Basic Analytics
router.get("/admin/stats/:clientId", async (req, res) => {
  try {
    const rows = await fetchLeads();

    const clientLeads = rows.filter(row => row[3] === req.params.clientId);

    const today = new Date().toISOString().split("T")[0];

    const todayLeads = clientLeads.filter(row =>
      row[1]?.startsWith(today) // Timestamp column
    ).length;

    const pricingLeads = clientLeads.filter(row =>
      row[5] === "Pricing" // Intent column
    ).length;

    res.json({
      totalLeads: clientLeads.length,
      todayLeads,
      pricingLeads
    });

  } catch (err) {
    console.error("Stats error:", err.message);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

export default router;