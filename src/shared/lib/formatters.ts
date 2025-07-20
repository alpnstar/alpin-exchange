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

/**
 * Преобразует миллисекунды в строку формата "hh:mm:ss".
 * @param ms - Количество миллисекунд.
 * @returns отформатированную строку времени.
 */
export const formatMillisecondsToHHMMSS = (ms: number): string => {
  // 1. Сначала получаем общее количество секунд.
  // Math.floor используется, чтобы отбросить дробную часть.
  const totalSeconds = Math.floor(ms / 1000);

  // 2. Вычисляем количество полных часов.
  // В одном часе 3600 секунд (60 минут * 60 секунд).
  const hours = Math.floor(totalSeconds / 3600);

  // 3. Вычисляем количество полных минут.
  // Сначала убираем часы с помощью оператора остатка (%) и делим на 60.
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  // 4. Вычисляем оставшиеся секунды.
  // Просто берем остаток от деления на 60.
  const seconds = totalSeconds % 60;

  // 5. Форматируем каждую часть, добавляя ведущий ноль, если число меньше 10.
  const paddedHours = String(hours).padStart(2, "0");
  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(seconds).padStart(2, "0");

  // 6. Собираем все вместе.
  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
};

/**
 * Преобразует timestamp (миллисекунды с 1970 года) в строку "hh:mm:ss"
 * для локального времени пользователя.
 * @param timestamp - Количество миллисекунд, прошедших с 01.01.1970 UTC.
 * @returns отформатированную строку времени.
 */
export const formatTimestampToHHMMSS = (timestamp: number): string => {
  // 1. Создаем объект Date из твоего timestamp.
  // Он автоматически учтет часовой пояс пользователя.
  const date = new Date(timestamp);

  // 2. Получаем часы, минуты и секунды из этого объекта.
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // 3. Форматируем каждую часть, добавляя ведущий ноль.
  const paddedHours = String(hours).padStart(2, "0");
  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(seconds).padStart(2, "0");

  // 4. Собираем строку.
  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
};
