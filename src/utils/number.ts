export const digitsOnly = (value: string) => value.replace(/[^0-9]/g, "");

export const isEmpty = (value: string | null | undefined) =>
  !value || value.trim().length === 0;

export const toNumber = (value: string) => {
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed.includes(" ")) {
      const parts = trimmed.split(" ");
      if (parts.length === 2 && parts[1].includes("/")) {
        const whole = Number.parseFloat(parts[0]);
        const frac = parts[1].split("/");
        if (frac.length === 2) {
          const num = Number.parseFloat(frac[0]);
          const den = Number.parseFloat(frac[1]);
          if (!isNaN(whole) && !isNaN(num) && !isNaN(den) && den !== 0) {
            return whole + (num / den);
          }
        }
      }
    } else if (trimmed.includes("/")) {
      const frac = trimmed.split("/");
      if (frac.length === 2) {
        const num = Number.parseFloat(frac[0]);
        const den = Number.parseFloat(frac[1]);
        if (!isNaN(num) && !isNaN(den) && den !== 0) {
          return num / den;
        }
      }
    }
  }
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const toFeetValue = (feet: string, inch: string, nullu: string) => {
  const feetValue = toNumber(feet);
  const inchValue = toNumber(inch);
  const nulluValue = toNumber(nullu);
  return feetValue + inchValue / 12 + nulluValue / 96;
};

export const formatDecimal = (value: number, fractionDigits = 2) =>
  Number.isFinite(value) ? value.toFixed(fractionDigits) : "0.00";

export const formatCompact = (value: number) => {
  if (!Number.isFinite(value)) {
    return "0";
  }

  const rounded = Math.round(value * 1000) / 1000;
  return Number.isInteger(rounded)
    ? String(rounded)
    : rounded.toFixed(3).replace(/0+$/, "").replace(/\.$/, "");
};
