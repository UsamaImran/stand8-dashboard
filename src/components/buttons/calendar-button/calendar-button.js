import React, { useMemo } from 'react';
import propTypes from 'prop-types';
import FeatherIcon from 'feather-icons-react';
import { Popover } from '../../popup/popup';
import { DateRangePickerOne } from '../../datePicker/datePicker';
import { Button } from '../buttons';

const CalendarButtonPageHeader = ({ dateRange, onChangeDate }) => {
  const dateText = useMemo(() => {
    const start = dateRange.startDate.toString().split(' ');
    const end = dateRange.endDate.toString().split(' ');
    return `${start[1]} ${start[2]} ${start[3]} - ${end[1]} ${end[2]} ${end[3]}`;
  }, [dateRange]);

  const content = <DateRangePickerOne dateText={dateText} defaultValue={dateRange} onChange={onChangeDate} />;

  return (
    <Popover placement="bottomRight" title="Please select the date range by Calendar" content={content} action="">
      <Button size="small" type="white">
        <FeatherIcon icon="calendar" size={14} />
        {dateText}
      </Button>
    </Popover>
  );
};

CalendarButtonPageHeader.propTypes = {
  dateRange: propTypes.object,
  onChangeDate: propTypes.func,
};

export { CalendarButtonPageHeader };
