import styles from "./button.module.css";

function Button({
  children,
  type = "button",
  variant = "primary",
  disabled = false,
  onClick,
}) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export { Button };
