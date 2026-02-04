import { sendMessage } from "../services/whatsapp.service.js";
import { getUserState, setUserState } from "../services/state.service.js";

export async function handleMenuFlow({ client, clientId, from, text }) {
  const state = getUserState(clientId, from);

  // First interaction
  if (!state) {
    setUserState(clientId, from, { step: "MENU" });

    await sendMessage({
      to: from,
      text: client.welcomeMessage,
      phoneNumberId: clientId,
      token: client.token,
    });

    return;
  }

  if (state.step === "MENU") {
    switch (text) {
      case "1":
        await sendMessage({
          to: from,
          phoneNumberId: clientId,
          token: client.token,
          text:
            "🤖 *AI Chatbot / Automation Demo*\n\n" +
            "I build AI chatbots for websites & WhatsApp that answer queries, capture leads, and work 24/7.\n\n" +
            "Reply *3* for pricing or *4* to talk directly.",
        });
        break;

      case "2":
        await sendMessage({
          to: from,
          phoneNumberId: clientId,
          token: client.token,
          text:
            "🌐 *Website Design & Development*\n\n" +
            "I design modern, fast websites that convert visitors into leads.\n\n" +
            "Reply *3* for pricing or *4* to talk directly.",
        });
        break;

      case "3":
        await sendMessage({
          to: from,
          phoneNumberId: clientId,
          token: client.token,
          text:
            "💰 *Pricing & Consultation*\n\n" +
            "Please share a short description of what you’re looking for. I’ll get back to you personally.",
        });
        setUserState(clientId, from, { step: "HUMAN" });
        break;

      case "4":
        await sendMessage({
          to: from,
          phoneNumberId: clientId,
          token: client.token,
          text:
            "👤 *Human Support*\n\n" +
            "Thanks for reaching out. Ubair will contact you shortly.\n\n" +
            "Please share your requirement briefly.",
        });
        setUserState(clientId, from, { step: "HUMAN" });
        break;

      default:
        await sendMessage({
          to: from,
          phoneNumberId: clientId,
          token: client.token,
          text:
            "Please reply with:\n" +
            "1️⃣ AI chatbot demo\n" +
            "2️⃣ Website services\n" +
            "3️⃣ Pricing\n" +
            "4️⃣ Talk to Ubair",
        });
    }
  }
}
