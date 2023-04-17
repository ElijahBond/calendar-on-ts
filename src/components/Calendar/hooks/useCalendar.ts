import { useMemo, useState } from "react";
import { createMonth, createDate, getMonthesNames, getMonthNumberOfDays } from '../../../utils/helpers/date'
import { getWeekDaysNames } from "../../../utils/helpers/date/getWeekDayNames";

interface IUseCalendarParams {
    locale?: string,
    selectedDate: Date,
    firstWeekDay: number
}

const getYearsInterval = (year: number) => {
    const startYear = Math.floor(year/10) * 10;
    return [...Array(10)].map((_, i) => startYear + i)
}

export const useCalendar = ({ 
    firstWeekDay = 2, 
    locale = 'default', 
    selectedDate: date 
}: IUseCalendarParams) => {
    const [mode, setMode] = useState<"days" | 'month' | 'year'>('days');
    const [selectedDate, setSelectedDate] = useState(createDate({ date }));
    const [selectedMonth, setSelectedMonth] = useState(
        createMonth({ date: new Date(selectedDate.year, selectedDate.monthIndex), locale})
    );

    const [selectedYear, setSelectedYear] = useState(selectedDate.year);
    const [selectedYearInterval, setSelectedYearInterval] = useState(getYearsInterval(selectedDate.year));

    const monthesNames = useMemo(() => getMonthesNames(locale), []);
    const weekDaysNames = useMemo(() => getWeekDaysNames(firstWeekDay, locale), []);

    const days = useMemo(() => selectedMonth.createMonthDays(), [selectedMonth, selectedYear]);

    const calendarDays = useMemo(() => {
        const monthNumberOfDays = getMonthNumberOfDays(selectedMonth.monthIndex, selectedYear);
        
        const prevMonthDays = createMonth({
            date: new Date(selectedYear, selectedMonth.monthIndex - 1),
            locale
        }).createMonthDays()

        const nextMonthDays = createMonth({
            date: new Date(selectedYear, selectedMonth.monthIndex + 1),
            locale
        }).createMonthDays()

        const firstDay = days[0];
        const lastDay = days[monthNumberOfDays - 1];

        const shiftIndex = firstWeekDay - 1;

        const numberOfPrevDays = firstDay.dayNumberInWeek - 1 - shiftIndex < 0 
            ? 7 - (firstWeekDay - firstDay.dayNumberInWeek) 
            : firstDay.dayNumberInWeek - 1 - shiftIndex;

        const numberOfNextDays = 7 - lastDay.dayNumberInWeek + shiftIndex > 6 
            ? 7 - lastDay.dayNumberInWeek - (7 - shiftIndex)
            : 7 - lastDay.dayNumberInWeek + shiftIndex;

        const totalCalendarDays = days.length + numberOfPrevDays + numberOfNextDays;

        const result = [];
        for (let i = 0; i < numberOfPrevDays; i++) {
            const inverted = numberOfPrevDays - i;
            result[i] = prevMonthDays[prevMonthDays.length - inverted];
        }

        for (let i = numberOfPrevDays; i < totalCalendarDays - numberOfNextDays; i++) {
            result[i] = days[i - numberOfPrevDays];
        }

        for (let i = totalCalendarDays - numberOfNextDays; i < totalCalendarDays; i++) {
            result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays];
        }

        return result
    }, [
        selectedMonth.year, 
        selectedMonth.monthIndex,
        selectedYear
    ]);



    const onClickArrow = (directon: 'right' | 'left') => {
        if (mode === 'year' && directon === 'left') {
            return setSelectedYearInterval(getYearsInterval(selectedYearInterval[0] - 10))
        } else if (mode === 'year' && directon === 'right') {
            return setSelectedYearInterval(getYearsInterval(selectedYearInterval[0] + 10))
        }



        if (mode === 'month' && directon === 'left') {
            const year = selectedYear - 1;

            if (!selectedYearInterval.includes(year)) setSelectedYearInterval(getYearsInterval(year))
                return setSelectedYear(year)
        }

        if (mode === 'month' && directon === 'right') {
            const year = selectedYear + 1;

            if (!selectedYearInterval.includes(year)) setSelectedYearInterval(getYearsInterval(year))
                return setSelectedYear(year)
        }


        
        if (mode === 'days') {
            const monthIndex = directon === 'left' 
                ? selectedMonth.monthIndex - 1
                : selectedMonth.monthIndex + 1

            if(monthIndex === -1) {
                const year = selectedYear - 1;
                setSelectedYear(year);
                if (!selectedYearInterval.includes(year)) setSelectedYearInterval(getYearsInterval(year))
                return setSelectedMonth(createMonth({ date: new Date(year, 11), locale}))
            }

            if(monthIndex === 12) {
                const year = selectedYear + 1;
                setSelectedYear(year);
                if (!selectedYearInterval.includes(year)) setSelectedYearInterval(getYearsInterval(year))
                return setSelectedMonth(createMonth({ date: new Date(year, 0), locale}))
            }
            return setSelectedMonth(createMonth({ date: new Date(selectedYear, monthIndex), locale}))
        }
    }

    const setSelectedMonthByIndex = (monthIndex: number) => {
        setSelectedMonth(createMonth({ date: new Date(selectedYear, monthIndex), locale}))
    }

    return {
        state: {
            mode,
            calendarDays,
            weekDaysNames,
            monthesNames,
            selectedDate,
            selectedMonth,
            selectedYear,
            selectedYearInterval
        },
        functions: {
            setMode,
            setSelectedDate,
            onClickArrow,
            setSelectedMonthByIndex,
            setSelectedYear
        }
    }
};
