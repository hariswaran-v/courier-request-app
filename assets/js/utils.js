const now = dayjs();

function formatMyDate(date, format = "DD - MMM - YYYY, hh:mma") {
  return dayjs(date).format(format);
}
