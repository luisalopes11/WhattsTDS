export function formatTime(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatPhone(phone) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  return phone;
}

export function getConversationPreview(messages, myPhone, contactPhone) {
  const thread = messages.filter(
    (message) =>
      (message.from_phone === myPhone && message.to_phone === contactPhone) ||
      (message.from_phone === contactPhone && message.to_phone === myPhone),
  );

  if (thread.length === 0) return null;

  const last = thread[thread.length - 1];
  return {
    text: last.text,
    time: last.created_at,
    fromMe: last.from_phone === myPhone,
  };
}
