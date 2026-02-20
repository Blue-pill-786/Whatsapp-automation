import { clients } from "../config/clients.js";
import { handleMenuFlow } from "../flows/menu.flow.js";
import { env } from "../config/env.js";
import { sendMessage } from "../services/whatsapp.service.js";

export async function verifyWebhook(req, res) {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];
  console.log("Mode:", mode);
console.log("Token from Meta:", token);
console.log("Expected Token:", env.VERIFY_TOKEN);

  if (mode === "subscribe" && token === env.VERIFY_TOKEN) {
    console.log("✅ Webhook verified");
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
}

export async function receiveMessage(req, res) {
  try {
    console.log("🔥 WEBHOOK HIT");
    const entry = req.body.entry?.[0];
    const changes = entry?.changes?.[0];
    const message = changes?.value?.messages?.[0];

    if (!message) return res.sendStatus(200);

    const from = message.from;
    const text = message.text?.body?.trim();
    const clientId = changes.value.metadata.phone_number_id;

    const client = clients[clientId];
    if (!client) {
      console.log("❌ Unknown client:", clientId);
      return res.sendStatus(200);
    }

    await handleMenuFlow({
      client,
      clientId,
      from,
      text,
      sendMessage
    });

    


    return res.sendStatus(200);
  } catch (err) {
    console.error("🔥 Webhook error");
    return res.sendStatus(500);
  }
}
