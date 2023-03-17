import { createContext } from 'react';

export const AppContext = createContext();

export const calendarDateFormatToInputDate = (calendarDate) => {
    const date = calendarDate.getDate() < 10 ? `0${calendarDate.getDate()}` : calendarDate.getDate();
    const month = calendarDate.getMonth() + 1 < 10 ? `0${calendarDate.getMonth() + 1}` : calendarDate.getMonth() + 1;
    const year = calendarDate.getFullYear();
    return `${year}-${month}-${date}`;
}

export const If = function ({ test, children }) {
    if (test === false) {
        return null;
    }
    return children;
}

export const updatedTaskList = (date, todoList, setTodoList) => {
    const currentSelectedDate = calendarDateFormatToInputDate(date);
    const dateParts = currentSelectedDate.split('-');
    dateParts[2] = '01';
    const firstDateOfCurrentMonth = dateParts.join('-');
    dateParts[2] = '31';
    const lastPossibleDateOfCurrentMonth = dateParts.join('-');
    return todoList?.filter(todo => (todo.dateAdded >= firstDateOfCurrentMonth && todo.dateAdded <= lastPossibleDateOfCurrentMonth)).sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
}