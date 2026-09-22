import styles from "./avatar.module.css";

function Avatar({ name, size = 48 }) {
  const initials = encodeURIComponent(name || "?");

  return (
    <img
      className={styles.avatar}
      src={`https://ui-avatars.com/api/?name=${initials}&background=25D366&color=fff&size=${size * 2}`}
      alt={name}
      width={size}
      height={size}
    />
  );
}

export { Avatar };
