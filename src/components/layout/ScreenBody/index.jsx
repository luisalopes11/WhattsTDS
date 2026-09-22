import styles from "./screenBody.module.css";

function ScreenBody({ children, variant = "default" }) {
  const className = variant === "chat" ? styles.bodyChat : styles.body;

  return <main className={className}>{children}</main>;
}

export { ScreenBody };
