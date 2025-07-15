export const formatNumberWithCommas = (
  value: number | null | undefined,
  options?: { decimals?: number }
): string => {
  if (value === null || value === undefined) {
    return '';
  }

  const formatterOptions: Intl.NumberFormatOptions = {};

  if (options?.decimals !== undefined) {
    formatterOptions.minimumFractionDigits = options.decimals;
    formatterOptions.maximumFractionDigits = options.decimals;
  } else {
    formatterOptions.maximumFractionDigits = 20;
  }

  return new Intl.NumberFormat('en-US', formatterOptions).format(value);
};
