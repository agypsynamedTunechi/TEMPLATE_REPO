import { format, differenceInDays, isPast, isToday } from "date-fns";

export function DateFormat(dateInput) {
  const dueDate = new Date(dateInput);

  return format(dueDate, "MMM d, yyyy");
}

export function DateReminder(dateInput) {
     const dueDate = new Date(dateInput);
  const today = new Date();
  const daysLeft = differenceInDays(format(dueDate, "MMM d, yyyy"), format(today, "MMM d, yyyy"));

  let timeRemaining;
  if (isToday(dueDate)) {
    return timeRemaining = "Due today";
  } else if (daysLeft > 0) {
    return timeRemaining = `${daysLeft} day${daysLeft > 1 ? "s" : ""} left`;
  } else {
    return timeRemaining = "Overdue";
  }

  // if(timeRemaining === "Due today"){
  //   re
  // }
}
