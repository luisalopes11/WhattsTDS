import styles from "./searchBar.module.css";

function SearchBar({ value, onChange, placeholder = "Buscar..." }) {
  return (
    <div className={styles.wrapper}>
      <input
        type="search"
        className={styles.input}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Buscar conversas"
      />
    </div>
  );
}

export { SearchBar };
