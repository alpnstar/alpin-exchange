import { useRef, useEffect } from "react";

export function usePrevious<T>(value: T): T | undefined {
  // Используем useRef для хранения предыдущего значения
  // ref.current не вызывает перерендер при изменении
  const ref = useRef<T | undefined>(undefined);

  // Сохраняем текущее значение в ref после рендера
  useEffect(() => {
    ref.current = value;
  });

  // Возвращаем предыдущее значение (до текущего рендера)
  return ref.current;
}

// // Альтернативная версия с начальным значением
// export function usePreviousWithInitial<T>(value: T, initialValue: T): T {
//   const ref = useRef<T>(initialValue);
//
//   useEffect(() => {
//     ref.current = value;
//   });
//
//   return ref.current;
// }
//
// // Версия с компаратором для сложных объектов
// export function usePreviousWithComparator<T>(
//   value: T,
//   compareFn?: (prev: T | undefined, current: T) => boolean
// ): T | undefined {
//   const ref = useRef<T | undefined>();
//
//   useEffect(() => {
//     // Если компаратор не передан или значения различаются - обновляем
//     if (!compareFn || !compareFn(ref.current, value)) {
//       ref.current = value;
//     }
//   });
//
//   return ref.current;
// }
