import React, { useState, useLayoutEffect, useRef } from 'react';
import propTypes from 'prop-types';
import { Calendar, Spin } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import CalenDar from 'react-calendar';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import ProjectUpdate from './ProjectUpdate';
import GetCalenderTypeList from './GetCalenderTypeList';
import { BlockViewCalendarWrapper } from '../Style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Dropdown } from '../../../components/dropdown/dropdown';
import { calendarDeleteData, eventVisible } from '../../../redux/calendar/actionCreator';
import { SliceString } from '../../../utility/helpers';

import './style.css';
import { CALENDER_TYPE_KEY } from '../../../constants';

const MonthCalendar = ({
  setCurrentCalender,
  calenderTypeArray,
  currentCalender,
  onDateChange,
  setCurrentMonth,
  currentMonth,
}) => {
  const dispatch = useDispatch();
  const { events, isLoading } = useSelector(state => {
    return {
      events: state.Calender.events,
      isLoading: state.Calender.loading,
    };
  });

  const momentCurrentMonthNumber = moment()
    .add(currentMonth, 'M')
    .month();
  const dateModified = new Date().setMonth(momentCurrentMonthNumber);

  const [state, setState] = useState({
    date: new Date(dateModified),
    container: null,
    currentLabel: moment()
      .add(currentMonth, 'M')
      .format('MMMM YYYY'),
    width: 0,
    defaultValue: moment()
      .add(currentMonth, 'M')
      .format('YYYY-MM-DD'),
  });

  const { date, container, currentLabel, width, defaultValue } = state;

  const getInput = useRef();

  useLayoutEffect(() => {
    const button = document.querySelector(
      '.calendar-header__left .react-calendar__navigation .react-calendar__navigation__label',
    );
    const containers = document.querySelector('.calendar-header__left .react-calendar__viewContainer');
    const calenderDom = document.querySelectorAll('.ant-picker-calendar-date-content');
    calenderDom.forEach(element => {
      element.addEventListener('click', e => {
        if (e.target.classList[0] === 'ant-picker-calendar-date-content') {
          const getDate = moment(e.currentTarget.closest('td').getAttribute('title')).format('YYYY-MM-DD');
          setState({
            container: containers,
            date,
            currentLabel,
            width: getInput.current !== null && getInput?.current?.clientWidth,
            defaultValue: getDate,
          });

          dispatch(eventVisible(true));
        }
      });
    });
    button.addEventListener('click', () => {
      return containers.classList.add('show');
    });

    setState({
      container: containers,
      defaultValue,
      date,
      currentLabel,
      width: getInput.current !== null && getInput?.current?.clientWidth,
    });
  }, [date, currentLabel, defaultValue, dispatch, events]);

  const onChange = dt => {
    setState(prevState => {
      const x = { ...prevState };
      return {
        ...x,
        date: dt,
        defautlValue: moment(dt)
          .add(currentMonth, 'M')
          .format('YYYY-MM-DD'),
      };
    });
  };

  const onEventDelete = id => {
    const data = events.filter(item => item.id !== id);
    dispatch(calendarDeleteData(data));
  };

  const getListData = value => {
    let listData;
    const data = [];
    if (events) {
      events.forEach(event => {
        if (moment(event.date[0]).format('MMMM YYYY') === currentLabel) {
          const {
            label,
            title,
            description1,
            description2,
            description3,
            id,
            description,
            time,
            date: eventDate,
            type,
          } = event;
          const barText = SliceString(title);
          const a = moment(moment(eventDate[1]).format('DD MMMM YYYY'));
          const b = moment(moment(eventDate[0]).format('DD MMMM YYYY'));
          const totalDays = a.diff(b, 'days');
          switch (value.format('MM-DD')) {
            case moment(eventDate[0]).format('MM-DD'):
              data.push({
                label,
                barText,
                title,
                description1,
                description2,
                description3,
                id,
                totalDays,
                description,
                time,
                date: eventDate,
                type,
              });
              listData = data;
              break;
            default:
              break;
          }
        }
      });
    }
    listData = data;

    return listData || [];
  };

  const dateCellRender = value => {
    const listAllData = getListData(value);
    const listData = listAllData.slice(0, 3);
    const checkMoreItems = () => {
      const diff = listAllData.length - listData.length;
      return listAllData.length > 3 ? (
        <li
          style={{ color: 'blue', paddingLeft: '3px' }}
          onClick={() => setCurrentCalender(CALENDER_TYPE_KEY.SCHEDULE)}
          role="presentation"
          onKeyPress={() => setCurrentCalender(CALENDER_TYPE_KEY.SCHEDULE)}
        >
          View {diff} more item{diff > 1 ? 's' : ''}
        </li>
      ) : null;
    };

    return (
      <ul className="events">
        {listData &&
          listData.map((item, index) => (
            <>
              <Dropdown
                className="event-dropdown"
                key={index}
                style={{ padding: 0 }}
                placement="bottomLeft"
                content={<ProjectUpdate onEventDelete={onEventDelete} {...item} />}
                action={['click']}
              >
                <li ref={getInput}>
                  <Link
                    style={{ width: width ? width * (item?.totalDays + 1) : 0, fontSize: '0.6rem' }}
                    className={item?.label}
                    to="#"
                  >
                    {item?.barText}
                  </Link>
                </li>
              </Dropdown>
            </>
          ))}
        {checkMoreItems()}
      </ul>
    );
  };

  // const handleCancel = () => {
  //   dispatch(eventVisible(false));
  // };

  // const addNew = event => {
  //   const arrayData = [];
  //   events &&
  //     events.map(data => {
  //       return arrayData.push(data.id);
  //     });
  //   const max = Math.max(...arrayData);
  //   dispatch(addNewEvents([...events, { ...event, id: max + 1 }]));
  //   dispatch(eventVisible(false));
  // };

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
          <CalenDar
            onClickMonth={() => {
              container.classList.remove('show');
            }}
            onActiveStartDateChange={({ activeStartDate }) => {
              if (!container.classList.contains('show')) {
                onDateChange(activeStartDate);
                setState(prevState => {
                  const x = { ...prevState };
                  return {
                    ...x,
                    currentLabel: moment(activeStartDate).format('MMMM YYYY'),
                    defaultValue: moment(activeStartDate).format('YYYY-MM-DD'),
                  };
                });
              }
            }}
            next2Label={null}
            prev2Label={null}
            nextLabel={
              !isLoading ? (
                <div
                  onClick={() => setCurrentMonth(prevState => prevState + 1)}
                  onKeyPress={() => setCurrentMonth(prevState => prevState + 1)}
                  role="button"
                  tabIndex="0"
                >
                  <FeatherIcon icon="chevron-right" />
                </div>
              ) : null
            }
            prevLabel={
              !isLoading ? (
                <div
                  onClick={() => setCurrentMonth(prevState => prevState - 1)}
                  onKeyPress={() => setCurrentMonth(prevState => prevState - 1)}
                  role="button"
                  tabIndex="0"
                >
                  <FeatherIcon icon="chevron-left" />
                </div>
              ) : null
            }
            onChange={onChange}
            value={state.date}
          />
        </div>
        <div className="calendar-header__right">
          <GetCalenderTypeList
            list={calenderTypeArray}
            setCurrentCalender={setCurrentCalender}
            currentCalender={currentCalender}
          />
          {/* <NavLink className="schedule-list" to="#">
            <FeatherIcon icon="list" />
            Schedule
          </NavLink> */}
        </div>
      </div>
      {isLoading || events == null ? (
        <div
          className="sd-spin"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '25%' }}
        >
          <Spin />
        </div>
      ) : (
        <BlockViewCalendarWrapper className="table-responsive">
          <Calendar
            mode="month"
            headerRender={() => {
              return <div />;
            }}
            dateCellRender={dateCellRender}
            disabledDate={currentDate => {
              if (moment(currentDate).format('MMMM YYYY') === currentLabel) {
                return false;
              }
              return true;
            }}
            value={moment(defaultValue)}
            defaultValue={moment(defaultValue)}
          />
        </BlockViewCalendarWrapper>
      )}
    </Cards>
  );
};

MonthCalendar.propTypes = {
  setCurrentCalender: propTypes.func,
  calenderTypeArray: propTypes.array,
  currentCalender: propTypes.oneOfType([propTypes.string, propTypes.number]),
  onDateChange: propTypes.func,
  currentMonth: propTypes.number,
  setCurrentMonth: propTypes.func,
};

export default MonthCalendar;
