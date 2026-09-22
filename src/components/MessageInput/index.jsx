import { useState } from "react";
import styles from "./messageInput.module.css";

function MessageInput({ onSend, disabled = false }) {
  const [text, setText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || disabled) return;

    onSend(trimmed);
    setText("");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.input}
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Mensagem"
        disabled={disabled}
        aria-label="Digite sua mensagem"
      />
      <button
        type="submit"
        className={styles.sendButton}
        disabled={disabled || !text.trim()}
        aria-label="Enviar mensagem"
      >
        ➤
      </button>
    </form>
  );
}

export { MessageInput };
