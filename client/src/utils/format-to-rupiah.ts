export function formatRupiah(value: number, withPrefix = true): string {
  if (isNaN(value)) return withPrefix ? "Rp0" : "0";

  return (
    (withPrefix ? "Rp" : "") +
    new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  );
}
