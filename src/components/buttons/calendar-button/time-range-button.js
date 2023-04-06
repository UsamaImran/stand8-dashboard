import React, { useState } from 'react';
import propTypes from 'prop-types';
import { TimePicker } from 'antd';
import Styled from 'styled-components';
import { ClockCircleOutlined } from '@ant-design/icons';

const TimeRangeButtonPageHeader = ({ onChangeTime }) => {
  const [state, setState] = useState({
    timeRangePicker: {
      selectionTime: {},
    },
  });

  const onChange = (time, timeString) => {
    setState({
      ...state,
      timeRangePicker: {
        ...state.timeRangePicker,
        ...{
          startTime: timeString[0],
          endTime: timeString[1],
        },
      },
    });

    if (typeof onChangeTime === 'function') {
      onChangeTime({
        startTime: timeString[0],
        endTime: timeString[1],
      });
    }
  };

  return (
    <TimeRangeButton>
      <ClockCircleOutlined style={{ color: '#5f63f2' }} />
      <TimePicker.RangePicker format="HH:mm" autoFocus className="timePickerContainer" onChange={onChange} />
    </TimeRangeButton>
  );
};

TimeRangeButtonPageHeader.propTypes = {
  onChangeTime: propTypes.func,
};

export { TimeRangeButtonPageHeader };

const TimeRangeButton = Styled.div`
margin-left: 8px;
padding-left: 4px;
background: white;
  .timePickerContainer {
    padding: 5px;
    box-shadow: none;
    border: 0px;
    .ant-picker-input > input::placeholder {
    color: #5a5f7d !important;
    }
    span.ant-picker-suffix {
    display: none;
    width: 0px;
    }
  }
`;
