export function formatPhoneNumber(phone: string) {
  if (!phone || phone.trim() === "") return "";

  const cleaned = regexPhoneNumber(phone);

  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  return phone;
}

export function regexPhoneNumber(phone: string) {
  if (!phone || phone.trim() === "") return "";

  return phone.replace(/\D/g, "");
}

export function formatPhoneNumberInput(phone: string) {
  const cleaned = phone.replace(/\D/g, "").slice(0, 11);
  const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);

  if (match) {
    const [, ddd, firstPart, secondPart] = match;
    if (secondPart) {
      return `(${ddd}) ${firstPart}-${secondPart}`;
    } else if (firstPart) {
      return `(${ddd}) ${firstPart}`;
    } else if (ddd) {
      return `(${ddd}`;
    }
  }

  return phone;
}
