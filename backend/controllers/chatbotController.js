import ChatMessage from "../models/ChatMessage.js";

const botReply = (text, isVoice, fileName) => {
    if (fileName)
        return "Thank you for sharing your resume! I'm sending it to our HR team via WhatsApp.";

    // If voice message with text, respond to the text
    if (text && text.trim()) {
        const msg = text.toLowerCase();

        if (msg.includes("service"))
            return "We offer consulting, development, and support services. What would you like to know more about?";
        if (msg.includes("price") || msg.includes("cost") || msg.includes("pricing"))
            return "Our pricing is flexible and depends on your needs. Would you like to schedule a consultation?";
        if (msg.includes("start") || msg.includes("begin"))
            return "Tell me your goal and I'll guide you step by step!";
        if (msg.includes("support") || msg.includes("contact") || msg.includes("help"))
            return "Email: lnt@letnexttechnologies.com | Phone: 9940847940. We're here 24/7!";

        return `I understood: "${text}". How can I help you with that?`;
    }

    if (isVoice)
        return "I received your voice message. Could you please try again or type your question?";

    return "That's a great question! Let me connect you with our team.";
};

export const sendMessage = async (req, res) => {
    try {
        const { text = "", sessionId, isVoice, fileName } = req.body;

        if (!sessionId)
            return res.status(400).json({ message: "sessionId required" });

        const voicePath = req.file ? req.file.path : null;
        const displayText = text || (fileName ? `📎 ${fileName}` : (isVoice ? "🎤 Voice message" : ""));
        const userMsg = await ChatMessage.create({
            from: "user",
            text: displayText,
            sessionId,
            isVoice: isVoice === "true" || isVoice === true,
            fileName: fileName || null,
            voicePath
        });

        const botMsg = await ChatMessage.create({
            from: "bot",
            text: botReply(text, isVoice, fileName),
            sessionId
        });

        res.json({ messages: [userMsg, botMsg] });
    } catch (err) {
        console.error("Error in sendMessage:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
export const getHistory = async (req, res) => {
    try {
        const chats = await ChatMessage.find({
            sessionId: req.params.sessionId
        }).sort({ createdAt: 1 });
        res.json(chats);
    } catch (err) {
        console.error("Error in getHistory:", err);
        res.status(500).json({ message: "Failed to load history" });
    }
};