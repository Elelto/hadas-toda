export const WHATSAPP_PHONE = '972506796209';

export const WHATSAPP_MESSAGES = {
  default: 'שלום הדס, הגעתי אליך מהאתר ואשמח לשוחח / לקבוע פגישה.',
  contact: 'שלום הדס, הגעתי אליך מהאתר ואשמח לשוחח / לקבוע פגישה.',
  onlineTherapy: 'שלום הדס, הגעתי מהאתר ואשמח לשמוע על אפשרויות לטיפול מקוון.',
  bneiBrak: 'שלום הדס, הגעתי מהאתר ואשמח לתאם פגישה בקליניקה בבני ברק.',
};

/** Converts local/typed numbers (050-679-6209, +972...) to wa.me format (972506796209). */
export function normalizeWhatsAppPhone(phone) {
  if (!phone) return WHATSAPP_PHONE;

  const digits = String(phone).replace(/\D/g, '');
  if (!digits) return WHATSAPP_PHONE;
  if (digits.startsWith('972')) return digits;
  if (digits.startsWith('0')) return `972${digits.slice(1)}`;

  return digits;
}

export function resolveWhatsAppPhone(contactInfo) {
  if (!contactInfo) return WHATSAPP_PHONE;
  return normalizeWhatsAppPhone(contactInfo.whatsapp || contactInfo.phone);
}

export function buildWhatsAppUrl(phone, message = WHATSAPP_MESSAGES.default) {
  const normalizedPhone = normalizeWhatsAppPhone(phone);
  const params = message ? `&text=${encodeURIComponent(message)}` : '';
  return `https://api.whatsapp.com/send?phone=${normalizedPhone}${params}`;
}
