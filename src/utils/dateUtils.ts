
import { formatDistanceToNow, isPast, isToday, differenceInDays } from 'date-fns';

export interface DateStatus {
  text: string;
  className: string;
  isPastDue: boolean;
  isDueToday: boolean;
  daysUntilDue?: number;
}

/**
 * Get a formatted status for a date relative to today
 * @param date The date to check status for
 * @returns An object with status text and styling information
 */
export const getDateStatus = (date: Date | string): DateStatus => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isPast(dateObj) && !isToday(dateObj)) {
    return { 
      text: "Past Due", 
      className: "text-red-400",
      isPastDue: true,
      isDueToday: false
    };
  } else if (isToday(dateObj)) {
    return { 
      text: "Due Today", 
      className: "text-yellow-400",
      isPastDue: false,
      isDueToday: true
    };
  } else {
    const daysUntilDue = differenceInDays(dateObj, new Date());
    return { 
      text: `Due in ${formatDistanceToNow(dateObj)}`, 
      className: "text-gray-400",
      isPastDue: false,
      isDueToday: false,
      daysUntilDue
    };
  }
};

/**
 * Format a date for display with status information
 * @param date The date to format
 * @returns An object with formatted date and status information
 */
export const formatDateWithStatus = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return {
    date: dateObj,
    formattedDate: `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`,
    status: getDateStatus(dateObj)
  };
};

/**
 * Create a date that's a certain number of days from today
 * @param daysFromNow Number of days from today (negative for past dates)
 * @returns Date object set to the specified days from now
 */
export const createRelativeDate = (daysFromNow: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date;
};

/**
 * Get current year as a string 
 */
export const getCurrentYear = (): string => {
  return new Date().getFullYear().toString();
};
