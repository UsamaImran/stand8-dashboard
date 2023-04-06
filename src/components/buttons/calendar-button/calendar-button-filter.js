import React, { useMemo } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Popover } from '../../popup/popup';
import { DateRangePickerOne } from '../../datePicker/datePicker';

const CalendarButtonFilter = ({ dateRange, onChangeDate, style, children }) => {
  const dateText = useMemo(() => {
    const start = dateRange.startDate.toString().split(' ');
    const end = dateRange.endDate.toString().split(' ');
    return `${start[1]} ${start[2]} ${start[3]} - ${end[1]} ${end[2]} ${end[3]}`;
  }, [dateRange]);

  const content = <DateRangePickerOne dateText={dateText} defaultValue={dateRange} onChange={onChangeDate} />;

  return (
    <Popover placement="bottomRight" title="Please select the date range by Calendar" content={content} action="hover">
      <Link to="#" size="small" type="white" style={{ ...style }}>
        {children}
      </Link>
    </Popover>
  );
};

CalendarButtonFilter.propTypes = {
  dateRange: propTypes.object,
  style: propTypes.object,
  children: propTypes.node,
  onChangeDate: propTypes.func,
};

export { CalendarButtonFilter };
