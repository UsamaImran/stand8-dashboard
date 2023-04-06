/**
 * Return ellipsis of a given string
 * @param {string} text
 * @param {number} size
 */
/**
 * Return ellipsis of a given string
 * @param {string} date
 */
import moment from 'moment';

const ellipsis = (text, size) => {
  return `${text
    .split(' ')
    .slice(0, size)
    .join(' ')}...`;
};

const getUnixTimestamp = date => {
  return Math.round(new Date(date).getTime() / 1000);
};

const getStartEndDate = (period, timezone = '00:00') => {
  const timezoneGMT = timezone.replace('GMT', '');
  let endDate;
  let startDate;
  switch (period) {
    case 'year':
      endDate = moment()
        .zone(timezoneGMT)
        .add(1, 'days')
        .startOf('day')
        .format('YYYY-MM-DD');
      startDate = moment()
        .zone(timezoneGMT)
        .startOf('year')
        .format('YYYY-MM-DD');
      break;
    case 'month':
      endDate = moment()
        .zone(timezoneGMT)
        .add(1, 'days')
        .startOf('day')
        .format('YYYY-MM-DD');
      startDate = moment()
        .zone(timezoneGMT)
        .startOf('month')
        .format('YYYY-MM-DD');
      break;
    case 'week':
      endDate = moment()
        .zone(timezoneGMT)
        .endOf('week')
        .format('YYYY-MM-DD');
      startDate = moment()
        .zone(timezoneGMT)
        .startOf('week')
        .format('YYYY-MM-DD');
      break;
    case 'today':
      endDate = moment()
        .zone(timezoneGMT)
        .add(1, 'days')
        .startOf('day')
        .format('YYYY-MM-DD');
      startDate = moment()
        .zone(timezoneGMT)
        .startOf('day')
        .format('YYYY-MM-DD');
      break;
    case 'yesterday':
      endDate = moment()
        .zone(timezoneGMT)
        .startOf('day')
        .format('YYYY-MM-DD');
      startDate = moment()
        .zone(timezoneGMT)
        .subtract(1, 'd')
        .startOf('day')
        .format('YYYY-MM-DD');
      break;
    default:
      endDate = moment()
        .zone(timezoneGMT)
        .startOf('day')
        .format('YYYY-MM-DD');
      startDate = moment()
        .zone(timezoneGMT)
        .subtract(1, 'd')
        .startOf('day')
        .format('YYYY-MM-DD');
  }
  return {
    endDate,
    startDate,
  };
};

const colors = ['#ff4d4f', '#faad14', '#52c41a'];

const switchColor = number => {
  const colorNumber = Math.floor(parseInt(number, 10) / 30);
  switch (colorNumber) {
    case 0:
      return colors[0];
    case 1:
      return colors[1];
    default:
      return colors[2];
  }
};

const getLocalTimeZone = () => {
  return moment.tz.guess();
};

const formatCurrenyValue = item => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item);
};

export { ellipsis, getUnixTimestamp, getStartEndDate, switchColor, getLocalTimeZone, formatCurrenyValue };
