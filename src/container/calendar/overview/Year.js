import React, { useState, useLayoutEffect } from 'react';
import propTypes from 'prop-types';
import { Calendar, Select } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import GetCalenderTypeList from './GetCalenderTypeList';
import { BlockViewCalendarWrapper } from '../Style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { eventVisible } from '../../../redux/calendar/actionCreator';

const YearCalendar = ({ setCurrentCalender, calenderTypeArray, currentCalender }) => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    currentYear: new Date().getFullYear(),
    maxYear: 2025,
    minYear: 2018,
    defaultValue: moment().format('YYYY-MM-DD'),
  });
  const { currentYear, maxYear, minYear, defaultValue } = state;

  useLayoutEffect(() => {
    const calenderDom = document.querySelectorAll('.ant-picker-calendar-date-content');
    calenderDom.forEach(element => {
      element.addEventListener('click', () => {
        dispatch(eventVisible(true));
      });
    });
  }, [defaultValue, dispatch]);

  const onIncrement = () => {
    return (
      currentYear < maxYear &&
      setState({
        ...state,
        currentYear: currentYear + 1,
      })
    );
  };

  const onDecrement = () => {
    return (
      currentYear > minYear &&
      setState({
        ...state,
        currentYear: currentYear - 1,
      })
    );
  };

  const option = [];
  for (let i = minYear; i <= maxYear; i += 1) {
    option.push(
      <Select.Option key={i} value={i}>
        {i}
      </Select.Option>,
    );
  }

  return (
    <Cards headless>
      {/* <Modal
        className="addEvent-modal"
        footer={null}
        type="primary"
        title="Create Event"
        visible={isVisible}
        onCancel={handleCancel}
      >
        <AddNewEvent onHandleAddEvent={addNew} defaultValue={defaultValue} />
      </Modal> */}
      <div className="calendar-header">
        <div className="calendar-header__left">
          {/* <Button className="btn-today" type="white" outlined>
            <NavLink to="./day">Today</NavLink>
          </Button> */}
          <div className="calender-head__navigation">
            <Button onClick={onDecrement} className="btn-navigate" type="white" outlined>
              <FeatherIcon icon="chevron-left" />
            </Button>
            <Select
              className="year-select"
              onChange={value => setState({ ...state, currentYear: value })}
              defaultValue={currentYear}
              value={currentYear}
              style={{ width: '100px' }}
            >
              {option}
            </Select>
            <Button className="btn-navigate" onClick={onIncrement} type="white" outlined>
              <FeatherIcon icon="chevron-right" />
            </Button>
          </div>
        </div>
        <div className="calendar-header__right">
          <GetCalenderTypeList
            list={calenderTypeArray}
            setCurrentCalender={setCurrentCalender}
            currentCalender={currentCalender}
          />
          <NavLink className="schedule-list" to="./schedule">
            <FeatherIcon icon="list" />
            Schedule
          </NavLink>
        </div>
      </div>
      <BlockViewCalendarWrapper className="table-responsive">
        <Calendar
          headerRender={() => {
            return <></>;
          }}
          mode="year"
          // monthCellRender={monthCellRender}
        />
      </BlockViewCalendarWrapper>
    </Cards>
  );
};

YearCalendar.propTypes = {
  setCurrentCalender: propTypes.func,
  calenderTypeArray: propTypes.array,
  currentCalender: propTypes.string,
};

export default YearCalendar;
