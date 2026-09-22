import styles from "./mobileShell.module.css";

function MobileShell({ children }) {
  return <div className={styles.shell}>{children}</div>;
}

export { MobileShell };
