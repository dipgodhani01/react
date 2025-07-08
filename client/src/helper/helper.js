export function maskEmail(email) {
  if(!email) return null;
  const [local, domain] = email.split("@");
  if (local.length <= 2) {
    return "*".repeat(local.length) + "@" + domain;
  }

  const firstChar = local[0];
  const lastChar = local[local.length - 1];
  const stars = "*".repeat(local.length - 2);
  return `${firstChar}${stars}${lastChar}@${domain}`;
}

export function maskMobile(number) {
    if(!number) return null;

  const visibleDigits = 3;
  const maskedSection = "*".repeat(number.length - visibleDigits);
  const visiblePart = number.slice(-visibleDigits);
  return maskedSection + visiblePart;
}
