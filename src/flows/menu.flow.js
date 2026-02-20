import { sendMessage } from "../services/whatsapp.service.js";
import { getUserState, setUserState } from "../services/state.service.js";
import { saveLead } from "../services/lead.service.js";
import { notifyAdmin } from "../services/notify.service.js";

export async function handleMenuFlow({ client, clientId, from, text }) {
  const state = getUserState(clientId, from);

  // Normalize text (safety)
  const messageText = text?.trim();

  // 1️⃣ First interaction → send welcome
  if (!state) {
    console.log("👋 New user:", from);

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
    switch (messageText) {
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
        const leadId = `${clientId}-${from}-${Date.now()}`;

        await saveLead({
  leadId,
  timestamp: new Date().toISOString(),
  clientName: client.name,
  clientId,
  phone: from,
  intent: "Pricing",
  userMessage: messageText,
  status: "New"
});

        notifyAdmin({
          clientName: client.name,
          phone: from,
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

        await saveLead({
          clientName: client.name,
          phone: from,
          step: "Human",
          message: "Requested human contact",
        });

        notifyAdmin({
          clientName: client.name,
          phone: from,
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
  if (state.step === "LEAD" && messageText) {
    console.log("📝 Lead message from", from, ":", messageText);

    await saveLead({
      clientName: client.name,
      phone: from,
      step: "Message",
      message: messageText,
    });

    notifyAdmin({
      clientName: client.name,
      phone: from,
      message: messageText,
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

  // 4️⃣ DONE state → polite fallback
  if (state.step === "DONE") {
    await sendMessage({
      to: from,
      phoneNumberId: clientId,
      token: client.token,
      text:
        "🙏 Thanks for reaching out.\n\n" +
        "We’ve received your request and will respond shortly.",
    });
    return;
  }
}
