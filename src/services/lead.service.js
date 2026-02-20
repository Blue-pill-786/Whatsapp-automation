import { google } from "googleapis";

export async function saveLead({ clientName, phone, step, message }) {
  console.log("EMAIL:", process.env.GSHEET_CLIENT_EMAIL);
  console.log("KEY:", process.env.GSHEET_PRIVATE_KEY);
  console.log("KEY LENGTH:", process.env.GSHEET_PRIVATE_KEY?.length);
  console.log("SHEET:", process.env.GSHEET_ID);
  const auth = new google.auth.JWT(
    process.env.GSHEET_CLIENT_EMAIL,
    null,
    process.env.GSHEET_PRIVATE_KEY.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/spreadsheets"]
  );

  await auth.authorize();

  const sheets = google.sheets({ version: "v4", auth });

  const values = [[
    new Date().toISOString(),
    clientName,
    phone,
    step,
    message
  ]];

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GSHEET_ID,
    range: "A:E",
    valueInputOption: "RAW",
    requestBody: { values }
  });
}