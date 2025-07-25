export const formatNumberWithCommas = (
  value: number | null | undefined,
  options?: { decimals?: number },
): string => {
  if (value === null || value === undefined) {
    return "";
  }

  const formatterOptions: Intl.NumberFormatOptions = {};

  if (options?.decimals !== undefined) {
    formatterOptions.minimumFractionDigits = options.decimals;
    formatterOptions.maximumFractionDigits = options.decimals;
  } else {
    formatterOptions.maximumFractionDigits = 20;
  }

  return new Intl.NumberFormat("en-US", formatterOptions).format(value);
};

export const formatTimestampToHHMMSS = (timestamp: number): string => {
  const date = new Date(timestamp);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const paddedHours = String(hours).padStart(2, "0");
  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(seconds).padStart(2, "0");

  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
};
