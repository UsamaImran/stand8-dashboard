import React, { useLayoutEffect, useRef } from 'react';
import propTypes from 'prop-types';
import FeatherIcon from 'feather-icons-react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Col, Row, Spin } from 'antd';
import GetCalenderTypeList from './GetCalenderTypeList';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
// import { eventVisible, addNewEvents } from '../../../redux/calendar/actionCreator';
import './style.css';

const ScheduleCalendar = ({
  setCurrentCalender,
  calenderTypeArray,
  currentCalender,
  onDateChange,
  isLoading,
  currentMonth,
  setCurrentMonth,
}) => {
  // const dispatch = useDispatch();
  const { events } = useSelector(state => {
    return {
      events: state.Calender.events,
    };
  });

  const dataList = useRef();

  useLayoutEffect(() => {
    if (dataList.current && dataList.current.querySelector('tr') === null) {
      document.querySelector('.emptyData').style.display = 'flex';
    } else {
      document.querySelector('.emptyData').style.display = 'none';
    }
  });

  // const { currentMonth } = state;

  const onIncrement = () => {
    setCurrentMonth(prevState => prevState + 1);
    onDateChange(new Date(moment().add(currentMonth + 1, 'month')));
  };

  const onDecrement = () => {
    setCurrentMonth(prevState => prevState - 1);
    onDateChange(new Date(moment().add(currentMonth - 1, 'month')));
  };

  // const handleCancel = () => {
  //   dispatch(eventVisible(false));
  // };

  // const addNew = event => {
  //   const arrayData = [];
  //   events.map(data => {
  //     return arrayData.push(data.id);
  //   });
  //   const max = Math.max(...arrayData);
  //   dispatch(addNewEvents([...events, { ...event, id: max + 1 }]));
  //   dispatch(eventVisible(false));
  // };

  const uniqueDate = [];

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
            <span className="date-label">
              {`${moment()
                .add(currentMonth, 'month')
                .format('MMM YYYY')} - ${moment()
                .add(currentMonth + 1, 'month')
                .format('MMM YYYY')}`}
            </span>
            <Button onClick={onIncrement} className="btn-navigate" type="white" outlined>
              <FeatherIcon icon="chevron-right" />
            </Button>
          </div>
        </div>{' '}
        <div className="calendar-header__right">
          <GetCalenderTypeList
            list={calenderTypeArray}
            setCurrentCalender={setCurrentCalender}
            currentCalender={currentCalender}
          />
          {/* <NavLink className="schedule-list" to="./schedule">
            <FeatherIcon icon="list" />
            Schedule
          </NavLink> */}
        </div>
      </div>
      <div className="emptyData">There is No Event Available</div>
      {isLoading || events == null ? (
        <div
          className="sd-spin"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '25%' }}
        >
          <Spin />
        </div>
      ) : (
        <table className="table-event schedule-event" width="100%">
          <tbody ref={dataList}>
            {events.map(event => {
              uniqueDate.push(event.date[0]);
              return false;
            })}
            {[...new Set(uniqueDate)].map((date, index) => {
              return (
                moment(date).format('MM') >=
                  moment()
                    .add(currentMonth, 'month')
                    .format('MM') &&
                moment(date).format('MM') <=
                  moment()
                    .add(currentMonth + 1, 'month')
                    .format('MM') && (
                  <tr key={index + 1}>
                    <td className="schedule-time">
                      <span className="schedule-date">{moment(date).format('DD MMM')}</span>
                      <span className="schedule-date-name">{moment(date).format('ddd')}</span>
                    </td>
                    <td className="schedule-time-data">
                      {' '}
                      {events
                        .filter(item => item.date[0] === date)
                        .map((item, ind) => (
                          <Row key={ind + 1}>
                            <Col xxl={6} xl={8} md={6} sm={10} xs={24}>
                              <span className={`bullet ${item.label}`} />
                              <span className="schedule-time">
                                {moment(item.time[0], 'h:mm a').format('h a')} -
                                {moment(item.time[0], 'h:mm a').format('h:mm a')}
                              </span>
                            </Col>
                            <Col xxl={18} xl={16} md={18} sm={14} xs={24}>
                              <span className="event-title">{item.title}</span>
                            </Col>
                          </Row>
                        ))}
                    </td>
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
      )}
    </Cards>
  );
};

ScheduleCalendar.propTypes = {
  setCurrentCalender: propTypes.func,
  calenderTypeArray: propTypes.array,
  currentCalender: propTypes.string,
  onDateChange: propTypes.func,
  isLoading: propTypes.bool,
  currentMonth: propTypes.number,
  setCurrentMonth: propTypes.func,
};

export default ScheduleCalendar;
