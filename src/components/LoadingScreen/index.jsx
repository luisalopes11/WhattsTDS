import styles from "./loadingScreen.module.css";
import { MobileShell } from "../layout/MobileShell";

function LoadingScreen() {
  return (
    <MobileShell>
      <div className={styles.loading}>
        <span className={styles.spinner} />
        <p>Carregando...</p>
      </div>
    </MobileShell>
  );
}

export { LoadingScreen };
