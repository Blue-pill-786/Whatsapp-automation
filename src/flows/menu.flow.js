import { sendMessage } from "../services/whatsapp.service.js";
import { getUserState, setUserState } from "../services/state.service.js";
import { saveLead } from "../services/lead.service.js";

export async function handleMenuFlow({ client, clientId, from, text }) {
  const state = getUserState(clientId, from);

  // 1️⃣ First interaction → send welcome
  if (!state) {
    setUserState(clientId, from, { step: "MENU" });

    await sendMessage({
      to: from,
      phoneNumberId: clientId,
      token: client.token,
      text: client.welcomeMessage,
    });

    return;
  }

  // 2️⃣ MENU handling
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
        return;

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
        return;

      case "3":
        await sendMessage({
          to: from,
          phoneNumberId: clientId,
          token: client.token,
          text:
            "💰 *Pricing & Consultation*\n\n" +
            "Please share a short description of what you’re looking for.",
        });

        // Save initial lead intent
        await saveLead({
          clientName: client.name,
          phone: from,
          step: "Pricing",
          message: "Requested pricing",
        });

        setUserState(clientId, from, { step: "LEAD" });
        return;

      case "4":
        await sendMessage({
          to: from,
          phoneNumberId: clientId,
          token: client.token,
          text:
            "👤 *Human Support*\n\n" +
            "Please share your requirement briefly. Ubair will contact you shortly.",
        });

        // Save initial lead intent
        await saveLead({
          clientName: client.name,
          phone: from,
          step: "Human",
          message: "Requested human contact",
        });

        setUserState(clientId, from, { step: "LEAD" });
        return;

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
        return;
    }
  }

  // 3️⃣ LEAD step → capture free text
  if (state.step === "LEAD" && text) {
    await saveLead({
      clientName: client.name,
      phone: from,
      step: "Message",
      message: text,
    });

    await sendMessage({
      to: from,
      phoneNumberId: clientId,
      token: client.token,
      text:
        "✅ Thanks! Your message has been received.\n\n" +
        "We’ll get back to you shortly.",
    });

    setUserState(clientId, from, { step: "DONE" });
    return;
  }
}
