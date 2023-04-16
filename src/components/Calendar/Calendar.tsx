import React from "react";
import { useCalendar } from "./hooks/useCalendar";

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

    const { state } = useCalendar({ firstWeekDay, locale, selectedDate })
    console.log(state)

    return (
        <h1>Calen</h1>
    )
};