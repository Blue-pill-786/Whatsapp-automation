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
      new Date().toISOString(),
      data.clientName,
      data.phone,
      data.step,
      data.message
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GSHEET_ID,
      range: "A:E",
      valueInputOption: "RAW",
      requestBody: { values }
    });

  } catch (err) {
    console.error("❌ Google Sheets error:", err.message);
  }
}