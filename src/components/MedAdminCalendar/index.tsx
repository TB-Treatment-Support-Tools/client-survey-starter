import React, { useState } from 'react';
import { DateTime } from 'luxon';
import Calendar from 'react-calendar';
import Day from './Day';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import classes from './styles.module.scss';
import DateMap from '../../types/date-map';

interface CalendarProps{
    valueMap: DateMap
}

const CustomCalendar = ({valueMap} : CalendarProps) => {

    const [month,setMonth] = useState(DateTime.local().startOf('month'))

    const handleChange = (date : Date) => {
        // patientStore.uiState.selectedCalendarDate = DateTime.fromJSDate(date).toISODate();
    }

    //If desired to disble going past treatment bounds
    // const showLeft = month > DateTime.fromISO(patientStore.treatmentStart).startOf('month');
    // const showRight = month < DateTime.local().startOf('month')
    const showLeft = true;
    const showRight = true;

    return (
        <Calendar
            // tileDisabled={({ date }) => {
            //     return checkDisabled(date)
            // }}
            calendarType="US"
            minDetail="month"
            view="month"
            value={new Date()}
            locale={'en-us'}
            className={classes.calendar}
            navigationLabel={(
                { date }) => `${DateTime.fromJSDate(date).get("monthLong")} ${DateTime.fromJSDate(date).get("year")}`
            }
            tileContent={({ date, view }) => {
                let dt = DateTime.fromJSDate(date);
                return (view === "month" ? <Day medicationWasTaken={valueMap.get(dt.toISODate())} date={dt}  /> : null)
}}
            next2Label={null}
            prev2Label={null}
            nextLabel={showRight ? <ChevronRight />: null}
            prevLabel={showLeft ? <ChevronLeft /> : null}
            onChange={handleChange}
            onActiveStartDateChange={(event : any)=> {
                setMonth(DateTime.fromJSDate(event.activeStartDate));
            }}
            
        />
    )
};

export default CustomCalendar;