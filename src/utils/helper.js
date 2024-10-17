// all the helper functions are here and can be used anywhere in the project

import { useEffect, useState } from "react";
import moment from 'moment';

export function convertDataArray(inputArray, type) {
    const daysOfWeek = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
    ];

    const result = {
        type: type,
        startDate: '',
        endDate: '',
        days: {},
    };

    // Initialize days object with default values
    daysOfWeek.forEach((day) => {
        result.days[day] = {
            isActive: false,
            startHours: 0,
            endHours: 0,
            startMinutes: 0,
            endMinutes: 0,
            startPeriod: 'AM',
            endPeriod: 'AM',
        };
    });



    inputArray.forEach((data) => {
        console.log('data helper === > ', data);
        const day = data.schedule_day.toLowerCase();
        if (daysOfWeek.includes(day)) {
            result.days[day] = {
                isActive: data.is_working,
                // startHours: convertTo12Hour(data.start_time).hours,
                // startMinutes: convertTo12Hour(data.start_time).minutes,
                // startPeriod: convertTo12Hour(data.start_time).period,
                // endHours: convertTo12Hour(data.end_time).hours,
                // endMinutes: convertTo12Hour(data.end_time).minutes,
                // endPeriod: convertTo12Hour(data.end_time).period,
                startHours: moment(data.start_time).format("hh"),
                startMinutes: moment(data.start_time).format("mm"),
                startPeriod: moment(data.start_time).format("A"),
                endHours: moment(data.end_time).format("hh"),
                endMinutes: moment(data.end_time).format("mm"),
                endPeriod: moment(data.end_time).format("A"),
            };
        }
    });

    return result;
}

export const convertTo24Hour = (hours, minutes, period) => {
    let result = '';
    if (period === 'PM') {
        result = `${parseInt(hours, 10) + 12}:${String(minutes).padStart(2, '0')}:00`;
    } else {
        result = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
    }
    return result;
}

export const convertTo12Hour = (time) => {
    const [hours, minutes] = time.split(':');
    let parsedHours = parseInt(hours, 10);
    const parsedMinutes = parseInt(minutes, 10);
    let period = 'AM';

    if (parsedHours >= 12) {
        period = 'PM';
        if (parsedHours > 12) {
            parsedHours -= 12;
        }
    } else if (parsedHours === 0) {
        parsedHours = 12;
    }

    return {
        hours: parsedHours,
        minutes: parsedMinutes,
        period: period,
    };
};

export const capitalizeFirstLetter = (str) => {
    if (str == 'need_check_in') {
        return 'Needs Check-in';
    }

    if (str == 'check_in') {
        return 'Checked-in';
    }
    if (str == 'rejected' || str == 'reject' ) {
        return 'Declined';
    }
    if (str == 'cancelled') {
        return 'Cancelled';
    }
    if (str == 'interviewing_scheduled_suggested') {
        return 'Interview Schedule Suggested';
    }
    if (str == 'interviewing_scheduled') {
        return 'Interview Scheduled';
    }
    if (str == 'interview_pass') {
        return 'Interview Passed';
    }
    if (str == 'pass') {
        return 'Passed';
    }
    if (str == 'fail') {
        return 'Failed';
    }
    if (str == 'suggested') {
        return 'Time Suggested';
    }

    const words = str.split('_');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    const result = capitalizedWords.join(' ');
    return result;
};

export const calculateDateDifference = (date) => {
    const currentDate = new Date();
    const startDate = new Date(date);
    const difference = startDate.getTime() - currentDate.getTime();
    const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    return daysDifference;
};

export const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
};

export function convertToTimeAgo(timestamp) {
    const now = new Date();
    const date = new Date(timestamp);
    const secondsAgo = Math.floor((now - date) / 1000);

    if (secondsAgo < 60) {
        return 'Just now';
    } else if (secondsAgo < 3600) {
        const minutesAgo = Math.floor(secondsAgo / 60);
        return `${minutesAgo} m${minutesAgo > 1 ? 's' : ''} ago`;
    } else if (secondsAgo < 86400) {
        const hoursAgo = Math.floor(secondsAgo / 3600);
        return `${hoursAgo} h${hoursAgo > 1 ? 's' : ''} ago`;
    } else if (now.getDate() === date.getDate()) {
        return 'today';
    } else if (now.getDate() - date.getDate() === 1) {
        return 'yesterday';
    } else if (now.getMonth() === date.getMonth()) {
        const daysAgo = now.getDate() - date.getDate();
        return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
    } else if (now.getMonth() - date.getMonth() === 1) {
        return '1 month ago';
    } else {
        const monthsAgo = now.getMonth() - date.getMonth();
        return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
    }
}

export function WindowSize() {
    const [gridWidth, setGridWidth] = useState();
    useEffect(() => {
        const handleResize = () => {
            setGridWidth(window.innerWidth < 800 ? true : false);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
        // eslint-disable-next-line
    }, [window.innerWidth]);

    return gridWidth;
}


export function setUserTimeZoneGlobally(userTimeZone) {
    moment.tz.setDefault(userTimeZone);
}