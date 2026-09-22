import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileShell } from "../../components/layout/MobileShell";
import { ScreenBody } from "../../components/layout/ScreenBody";
import { ScreenHeader } from "../../components/layout/ScreenHeader";
import { TextField } from "../../components/TextField";
import { Button } from "../../components/Button";
import { useChat } from "../../context/ChatContext";
import styles from "./registerScreen.module.css";

function RegisterScreen() {
  const navigate = useNavigate();
  const { register } = useChat();
  const [phone, setPhone] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [appName, setAppName] = useState("Senac Chat");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await register({ phone, displayName, appName });
      navigate("/contacts");
    } catch (err) {
      setError(err.message || "Não foi possível registrar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <MobileShell>
      <ScreenHeader title="Senac Chat" subtitle="Cadastre seu número" />
      <ScreenBody>
        <div className={styles.content}>
          <p className={styles.description}>
            Informe seu telefone e nome para conversar com a turma.
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <TextField
              id="phone"
              label="Telefone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="11999990000"
              required
            />
            <TextField
              id="displayName"
              label="Seu nome"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder="Ana Silva"
              required
            />
            <TextField
              id="appName"
              label="Nome do app"
              value={appName}
              onChange={(event) => setAppName(event.target.value)}
              placeholder="MeuChat"
            />

            {error && <p className={styles.error}>{error}</p>}

            <Button type="submit" disabled={submitting}>
              {submitting ? "Registrando..." : "Entrar"}
            </Button>
          </form>
        </div>
      </ScreenBody>
    </MobileShell>
  );
}

export default RegisterScreen;
