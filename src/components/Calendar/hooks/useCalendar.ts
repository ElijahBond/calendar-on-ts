import { useMemo, useState } from "react";
import { createMonth, createDate, getMonthesNames } from '../../../utils/helpers/date'

interface IUseCalendarParams {
    locale?: string,
    selectedDate: Date,
}

export const useCalendar = ({ locale = 'default', selectedDate: date }: IUseCalendarParams) => {
    const [mode, setMode] = useState<"days" | 'month' | 'year'>('days');
    const [selectedDate, setSelectedDate] = useState(createDate({ date }));
    const [selectedMonth, setSelectedMonth] = useState(
        createMonth({ date: new Date(selectedDate.year, selectedDate.monthIndex), locale})
    );

    const [selectedYear, setSelectedYear] = useState(selectedDate.year);
    const monthesNames = useMemo(() => getMonthesNames(locale), [])


    console.log('monthesNames', monthesNames)
    return {}
};
