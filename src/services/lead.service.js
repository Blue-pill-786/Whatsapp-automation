import { google } from "googleapis";

export async function saveLead(data) {
  try {
    const auth = new google.auth.JWT({
      email: process.env.GSHEET_CLIENT_EMAIL,
      key: process.env.GSHEET_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"]
    });

    await auth.authorize();

    const sheets = google.sheets({ version: "v4", auth });

    const values = [[
  data.leadId,
  data.timestamp,
  data.clientName,
  data.clientId,
  data.phone,
  data.intent,
  data.userMessage,
  data.status
]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GSHEET_ID,
      range: "A:H",
      valueInputOption: "RAW",
      requestBody: { values }
    });

  } catch (err) {
    console.error("❌ Google Sheets error:", err.message);
  }
}