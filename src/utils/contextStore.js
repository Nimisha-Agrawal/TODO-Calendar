import { createContext } from 'react';

export const AppContext = createContext();

export const calendarDateFormatToInputDate = (calendarDate) => {
    const date = calendarDate.getDate() < 10 ? `0${calendarDate.getDate()}` : calendarDate.getDate();
    const month = calendarDate.getMonth() + 1 < 10 ? `0${calendarDate.getMonth() + 1}` : calendarDate.getMonth() + 1 < 10;
    const year = calendarDate.getFullYear();
    return `${year}-${month}-${date}`;
}

