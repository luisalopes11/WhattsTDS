import { Avatar } from "../Avatar";
import { formatTime } from "../../lib/format";
import styles from "./conversationItem.module.css";

function ConversationItem({ contact, preview, onClick }) {
  const previewText = preview
    ? preview.fromMe
      ? `Você: ${preview.text}`
      : preview.text
    : "Nenhuma mensagem ainda";

  return (
    <button type="button" className={styles.item} onClick={onClick}>
      <Avatar name={contact.display_name} size={48} />
      <div className={styles.content}>
        <div className={styles.row}>
          <strong className={styles.name}>{contact.display_name}</strong>
          {preview && (
            <time className={styles.time} dateTime={preview.time}>
              {formatTime(preview.time)}
            </time>
          )}
        </div>
        <p className={styles.preview}>{previewText}</p>
      </div>
    </button>
  );
}

export { ConversationItem };
