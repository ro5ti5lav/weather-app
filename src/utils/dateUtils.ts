// utils/dateUtils.ts

/**
 * Форматирует дату в строку "ДД.ММ.ГГГГ"
 * @param date - Дата в формате строки
 * @returns Форматированная дата
 */
export const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString('ru-RU', options);
};
