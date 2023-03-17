import { useContext } from 'react';
import CalendarContainer from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { AppContext } from '../../utils/contextStore';


const Calendar = function ({ setDate, setShowModal }) {
    const { date } = useContext(AppContext);

    const handleClick = () => {
        setShowModal(true);
    }

    // const formatLongDate = (locale,date) => {
    //     formatDate(date,'yyyy-mm-dd')
    // }

    return (
        <CalendarContainer onChange={setDate} defaultActiveStartDate={new Date()} value={date} onClickDay={handleClick} />
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