import React from "react";
import { useCalendar } from "./hooks/useCalendar";

interface ICalendarProps {
    locale?: string,
    selectedDate: Date,
    selectDate: (date: Date) => void
}

export const Calendar: React.FC<ICalendarProps> = ({ 
    locale = 'default', 
    selectDate,
    selectedDate 
}) => {

    const {} = useCalendar({ selectedDate })

    return (
        <h1>Calen</h1>
    )
};