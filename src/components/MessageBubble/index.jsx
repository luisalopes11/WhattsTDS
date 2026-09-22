import { formatTime } from "../../lib/format";
import styles from "./messageBubble.module.css";

function MessageBubble({ message, isMine }) {
  return (
    <div className={`${styles.wrapper} ${isMine ? styles.mine : styles.theirs}`}>
      <div className={`${styles.bubble} ${isMine ? styles.bubbleMine : styles.bubbleTheirs}`}>
        <p className={styles.text}>{message.text}</p>
        <time className={styles.time} dateTime={message.created_at}>
          {formatTime(message.created_at)}
        </time>
      </div>
    </div>
  );
}

export { MessageBubble };
