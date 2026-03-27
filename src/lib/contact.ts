export function normalizePhoneNumber(phone: string) {
  return phone.replace(/\D+/g, "");
}

export function createWhatsAppUrl(phone: string, message: string) {
  const normalizedPhone = normalizePhoneNumber(phone);

  if (!normalizedPhone) {
    return "#";
  }

  const phoneWithCountryCode =
    normalizedPhone.length === 10 ? `52${normalizedPhone}` : normalizedPhone;

  return `https://wa.me/${phoneWithCountryCode}?text=${encodeURIComponent(message)}`;
}
