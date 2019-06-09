import moment from "moment";

export const msToTimeString = ms => {
  const duration = moment.duration(ms);
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  return (
    (hours < 10 ? "0" + hours : hours) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds)
  );
};
