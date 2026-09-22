import styles from "./screenHeader.module.css";

function ScreenHeader({ title, subtitle, onBack, action }) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {onBack && (
          <button
            type="button"
            className={styles.backButton}
            onClick={onBack}
            aria-label="Voltar"
          >
            ←
          </button>
        )}
        <div className={styles.titles}>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </header>
  );
}

export { ScreenHeader };
