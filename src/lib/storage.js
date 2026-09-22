export const PHONE_STORAGE_KEY = "senac-phone";

export function getStoredPhone() {
  return localStorage.getItem(PHONE_STORAGE_KEY);
}

export function savePhone(phone) {
  localStorage.setItem(PHONE_STORAGE_KEY, phone);
}

export function clearPhone() {
  localStorage.removeItem(PHONE_STORAGE_KEY);
}
