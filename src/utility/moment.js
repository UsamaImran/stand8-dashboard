import moment from 'moment';

const weekStartDate = number =>
  moment()
    .startOf('week')
    .add(number, 'weeks')
    .format('MM/DD/YYYY');
const weekEndDate = number =>
  moment()
    .endOf('week')
    .add(number, 'weeks')
    .format('MM/DD/YYYY');

const weekStartDateTimestamp = number =>
  moment()
    .startOf('week')
    .add(number, 'weeks')
    .utc()
    .unix();

const weekEndDateTimestamp = number =>
  moment()
    .endOf('week')
    .add(number, 'weeks')
    .utc()
    .unix();

export { weekStartDate, weekEndDate, weekStartDateTimestamp, weekEndDateTimestamp };
