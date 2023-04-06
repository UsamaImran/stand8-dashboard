import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DateRangePicker } from 'react-date-range';
import { DatePicker } from 'antd';
import { ItemWraper, ButtonGroup } from './style';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const initState = {
  datePickerInternational: null,
  dateRangePicker: {
    selectionDate: {},
  },
};

const DateRangePickerOne = ({ onChange, defaultValue, dateText }) => {
  const [state, setState] = useState(initState);

  const handleRangeChange = which => {
    setState({
      ...state,
      dateRangePicker: {
        ...state.dateRangePicker,
        ...which,
      },
    });

    if (typeof onChange === 'function') {
      onChange(which.selectionDate);
    }
  };

  const { dateRangePicker } = state;

  useEffect(() => {
    if (defaultValue) {
      setState({ ...initState, dateRangePicker: { ...initState.dateRangePicker, selectionDate: defaultValue } });
    }
  }, [defaultValue]);

  return (
    <ItemWraper>
      <DateRangePicker
        onChange={handleRangeChange}
        showSelectionPreview
        moveRangeOnFirstSelection={false}
        className="PreviewArea"
        months={2}
        ranges={[dateRangePicker.selectionDate]}
        direction="horizontal"
      />

      <ButtonGroup>
        {dateText && <p>{dateText}</p>}
        {/* <Button size="small" type="primary">
          Apply
        </Button>
        <Button size="small" type="white" outlined>
          Cancel
        </Button> */}
      </ButtonGroup>
    </ItemWraper>
  );
};

DateRangePickerOne.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.object,
  dateText: PropTypes.string,
};

const CustomDateRange = () => {
  const [state, setstate] = useState({
    startValue: null,
    endValue: null,
    endOpen: false,
  });

  const disabledStartDate = startValue => {
    const { endValue } = state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  const disabledEndDate = endValue => {
    const { startValue } = state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  const onChange = (field, value) => {
    setstate({
      ...state,
      [field]: value,
    });
  };

  const onStartChange = value => {
    onChange('startValue', value);
  };

  const onEndChange = value => {
    onChange('endValue', value);
  };

  const handleStartOpenChange = open => {
    if (!open) {
      setstate({
        ...state,
        endOpen: true,
      });
    }
  };

  const handleEndOpenChange = open => {
    setstate({
      ...state,
      endOpen: open,
    });
  };

  const { startValue, endValue, endOpen } = state;

  return (
    <div>
      <DatePicker
        disabledDate={disabledStartDate}
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        value={startValue}
        placeholder="Start"
        onChange={onStartChange}
        onOpenChange={handleStartOpenChange}
        style={{ margin: '5px' }}
      />

      <DatePicker
        disabledDate={disabledEndDate}
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        value={endValue}
        placeholder="End"
        onChange={onEndChange}
        open={endOpen}
        onOpenChange={handleEndOpenChange}
        style={{ margin: '5px' }}
      />
    </div>
  );
};

export { DateRangePickerOne, CustomDateRange };
