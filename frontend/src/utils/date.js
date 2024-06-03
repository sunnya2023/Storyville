import {
  formatDistanceToNow,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  const minutesDiff = differenceInMinutes(now, date);
  const hoursDiff = differenceInHours(now, date);
  const daysDiff = differenceInDays(now, date);

  if (minutesDiff < 1) {
    return "now";
  } else if (minutesDiff < 60) {
    return `${minutesDiff} minute${minutesDiff > 1 ? "s" : ""} ago`;
  } else if (hoursDiff < 24) {
    return `${hoursDiff} hour${hoursDiff > 1 ? "s" : ""} ago`;
  } else {
    return `${daysDiff} day${daysDiff > 1 ? "s" : ""} ago`;
  }
};

export default formatDate;
