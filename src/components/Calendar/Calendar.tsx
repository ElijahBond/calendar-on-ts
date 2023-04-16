import React from "react";
import { useCalendar } from "./hooks/useCalendar";

import './Calendar.scss';

interface ICalendarProps {
    locale?: string,
    selectedDate: Date,
    selectDate: (date: Date) => void,
    firstWeekDay?: number
}

export const Calendar: React.FC<ICalendarProps> = ({ 
    locale = 'default', 
    firstWeekDay = 2,
    selectDate,
    selectedDate 
}) => {

    const { state, functions } = useCalendar({ firstWeekDay, locale, selectedDate })

    return (
        <div className='calendar'>
            <div className="calendar__header">
                <div aria-hidden className="calendar__header__arrow__left" />
                {state.mode === 'days' && (
                    <div aria-hidden onClick={() => functions.setMode('month')}>
                        {state.monthesNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
                    </div>
                )}

                {state.mode === 'month' && (
                    <div aria-hidden onClick={() => functions.setMode('year')}>
                        {state.selectedYear}
                    </div>
                )}

                {state.mode === 'year' && (
                    <div>
                        {state.selectedYearInterval[0]} - {' '} 
                        {state.selectedYearInterval[state.selectedYearInterval.length - 1] }
                    </div>
                )}
                <div aria-hidden className="calendar__header__arrow__right" />
            </div>
        </div>
    )
};