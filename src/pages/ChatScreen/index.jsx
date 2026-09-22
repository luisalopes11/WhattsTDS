import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MobileShell } from "../../components/layout/MobileShell";
import { ScreenHeader } from "../../components/layout/ScreenHeader";
import { ScreenBody } from "../../components/layout/ScreenBody";
import { ScreenFooter } from "../../components/layout/ScreenFooter";
import { MessageBubble } from "../../components/MessageBubble";
import { MessageInput } from "../../components/MessageInput";
import { useChat } from "../../context/ChatContext";
import { formatPhone } from "../../lib/format";
import styles from "./chatScreen.module.css";

function ChatScreen() {
  const navigate = useNavigate();
  const { phone } = useParams();
  const { user, chat } = useChat();
  const [contact, setContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    async function loadChat() {
      try {
        const [contacts, history] = await Promise.all([
          chat.listContacts(),
          chat.getHistory({ with: phone }),
        ]);

        const found = contacts.find((item) => item.phone === phone);
        setContact(found || { phone, display_name: formatPhone(phone) });
        setMessages(history);
      } finally {
        setLoading(false);
      }
    }

    loadChat();
  }, [chat, phone]);

  useEffect(() => {
    const unsubscribe = chat.onMessage((message) => {
      const isThisThread =
        (message.from_phone === phone && message.to_phone === user.phone) ||
        (message.from_phone === user.phone && message.to_phone === phone);

      if (isThisThread) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return unsubscribe;
  }, [chat, phone, user.phone]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(text) {
    setSending(true);
    try {
      const sent = await chat.sendMessage({ to: phone, text });
      setMessages((prev) => [...prev, sent]);
    } finally {
      setSending(false);
    }
  }

  return (
    <MobileShell>
      <ScreenHeader
        title={contact?.display_name || "Chat"}
        subtitle={contact ? formatPhone(contact.phone) : ""}
        onBack={() => navigate("/contacts")}
      />
      <ScreenBody variant="chat">
        {loading ? (
          <p className={styles.status}>Carregando mensagens...</p>
        ) : messages.length === 0 ? (
          <p className={styles.status}>Envie a primeira mensagem!</p>
        ) : (
          messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isMine={message.from_phone === user.phone}
            />
          ))
        )}
        <div ref={bottomRef} />
      </ScreenBody>
      <ScreenFooter>
        <MessageInput onSend={handleSend} disabled={sending} />
      </ScreenFooter>
    </MobileShell>
  );
}

export default ChatScreen;
