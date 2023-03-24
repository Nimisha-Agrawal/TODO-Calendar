import { useState, useContext } from 'react';
import CalendarContainer from 'react-calendar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
//import 'react-calendar/dist/Calendar.css';

import useWindowSize from '../../customHooks/useWindowSize';
import * as constants from '../../constants';
import { AppContext } from '../../utils/contextStore';

import './Calendar.css';

const Calendar = function ({ setDate, setShowModal }) {
    const { date, todoList, currentDate } = useContext(AppContext);
    const [showCalendar, setShowCalendar] = useState(false);
    const size = useWindowSize();

    const handleCalendarToggleClick = () => {
        setShowCalendar(!showCalendar)
    }

    const handleOnChange = (value) => {
        if (value <= currentDate) {
            setDate(currentDate);
        } else {
            setDate(value);
        }
        setShowModal(true);
    }

    const handleOnActiveStartDateChange = ({ activeStartDate }) => {
        if (activeStartDate >= currentDate) {
            setDate(activeStartDate);
        }
    }

    const highlightTile = ({ date }) => {
        const isTaskAddedForTile = todoList.some(task => new Date(task.dateAdded).toDateString() === date.toDateString());
        if (isTaskAddedForTile) {
            return 'highlight';
        }
    }

    const CalendarComponent = () => {
        return (
            <Card>
                <Card.Body>
                    <CalendarContainer onChange={handleOnChange} value={date} onActiveStartDateChange={handleOnActiveStartDateChange} tileClassName={highlightTile} minDate={currentDate}/></Card.Body>
            </Card>
        )
    }

    if (size.width >= constants.mediumBreakpoint) {
        return (
            <CalendarComponent />
        )
    }

    return (
        <>
            <Stack gap={3}>
                {showCalendar && <CalendarComponent />}
                <div className="d-grid gap-2">
                    <Button variant="secondary" size="lg" onClick={handleCalendarToggleClick}>{showCalendar ? 'Hide Calendar' : 'Show Calendar'} </Button>
                </div>
            </Stack>
        </>
    )
}

export default Calendar;