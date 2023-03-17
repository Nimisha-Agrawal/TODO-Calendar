import { useState,useContext } from 'react';
import CalendarContainer from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

import { AppContext } from '../../utils/contextStore';
import useWindowSize from '../../customHooks/useWindowSize';
import * as constants from '../../constants';


const Calendar = function ({ setDate, setShowModal }) {
    const { date } = useContext(AppContext);
    const [showCalendar, setShowCalendar] = useState(false);
    const size = useWindowSize();

    const handleDateClick = () => {
        setShowModal(true);
    }

    const handleCalendarToggleClick = () => {
        setShowCalendar(!showCalendar)
    }
   
    const CalendarComponent = () => {
        return (
        <Card>
            <Card.Body>
                <CalendarContainer onChange={setDate} defaultActiveStartDate={new Date()} value={date} onClickDay={handleDateClick} /></Card.Body>
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
        // <div className="app">
        //     <div className="calendar-container">
        //         <CalendarContainer onChange={setDate} defaultActiveStartDate={new Date()} value={date} onClickDay={handleClick} />
        //     </div>
        //     {/* <div className="text-center">
        //         Selected date: {date.toDateString()}
        //         </div> */}
        // </div>
    )
}

export default Calendar;