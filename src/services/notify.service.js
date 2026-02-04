export function notifyAdmin({ clientName, phone, message }) {
  console.log("📣 NEW LEAD ALERT");
  console.log("Client:", clientName);
  console.log("From:", phone);
  console.log("Message:", message);
}
