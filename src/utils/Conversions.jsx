/* eslint-disable react-refresh/only-export-components */
export function ConverterCapitalize(input) {
  if (!input) return "";
  return input
    .toLowerCase()
    .split(/[\s\u00A0]+/)
    .filter((word) => word.length > 0)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function ConverterMinuscule(input) {
  return input.toLowerCase();
}

export function FormatNumber(
  input,
  currency = "ARS",
  iso = "AR",
  fractionDigits = 2
) {
  const esiso = "es-" + iso;

  const numberConverted = input.toLocaleString(esiso, {
    style: "currency",
    currency: `${currency}`,
    minimumFractionDigits: fractionDigits,
  });

  return numberConverted;
}

export const urlToBase64 = async (imageUrl) => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
