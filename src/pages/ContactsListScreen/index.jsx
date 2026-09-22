import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileShell } from "../../components/layout/MobileShell";
import { ScreenHeader } from "../../components/layout/ScreenHeader";
import { ScreenBody } from "../../components/layout/ScreenBody";
import { SearchBar } from "../../components/SearchBar";
import { ConversationItem } from "../../components/ConversationItem";
import { useChat } from "../../context/ChatContext";
import { getConversationPreview } from "../../lib/format";
import styles from "./contactsListScreen.module.css";

function ContactsListScreen() {
  const navigate = useNavigate();
  const { user, chat } = useChat();
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [contactList, history] = await Promise.all([
          chat.listContacts(),
          chat.getHistory(),
        ]);
        setContacts(contactList.filter((contact) => contact.phone !== user.phone));
        setMessages(history);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [chat, user.phone]);

  useEffect(() => {
    const unsubscribe = chat.onMessage((message) => {
      setMessages((prev) => [...prev, message]);
    });

    return unsubscribe;
  }, [chat]);

  const filteredContacts = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return contacts;

    return contacts.filter((contact) =>
      contact.display_name.toLowerCase().includes(term),
    );
  }, [contacts, search]);

  return (
    <MobileShell>
      <ScreenHeader title="Conversas" subtitle={user.display_name} />
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Buscar contato..."
      />
      <ScreenBody>
        {loading ? (
          <p className={styles.status}>Carregando conversas...</p>
        ) : filteredContacts.length === 0 ? (
          <p className={styles.status}>
            {search ? "Nenhum contato encontrado." : "Nenhum colega cadastrado ainda."}
          </p>
        ) : (
          <ul className={styles.list}>
            {filteredContacts.map((contact) => (
              <li key={contact.phone}>
                <ConversationItem
                  contact={contact}
                  preview={getConversationPreview(messages, user.phone, contact.phone)}
                  onClick={() => navigate(`/chat/${contact.phone}`)}
                />
              </li>
            ))}
          </ul>
        )}
      </ScreenBody>
    </MobileShell>
  );
}

export default ContactsListScreen;
