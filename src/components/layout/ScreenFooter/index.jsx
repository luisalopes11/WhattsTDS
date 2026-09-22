import styles from "./screenFooter.module.css";

function ScreenFooter({ children }) {
  return <footer className={styles.footer}>{children}</footer>;
}

export { ScreenFooter };
