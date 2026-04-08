export const formatKwh = (value: number) => `${value.toLocaleString('en-US')} kWh`;

export const formatEuro = (value: number, fractionDigits = 2) =>
  `€ ${value.toLocaleString('en-US', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })}`;
