export async function saveLead({ clientName, phone, step, message }) {
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