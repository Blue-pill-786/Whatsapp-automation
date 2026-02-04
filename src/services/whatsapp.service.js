import axios from "axios";

export async function sendMessage({ to, text, phoneNumberId, token }) {
  const url = `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`;

  await axios.post(
    url,
    {
      messaging_product: "whatsapp",
      to,
      text: { body: text },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
}
