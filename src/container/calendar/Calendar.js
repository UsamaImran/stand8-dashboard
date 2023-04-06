import React, { useState, lazy, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Aside, CalendarWrapper } from './Style';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { calendarGetData } from '../../redux/calendar/actionCreator';
import 'react-calendar/dist/Calendar.css';

const MonthCalendar = lazy(() => import('./overview/Month'));
const ScheduleCalendar = lazy(() => import('./overview/Schedule'));

const Calendars = ({ currentCalender, setCurrentCalender, user, type }) => {
  const { email } = user;
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => {
    return {
      // isVisible: state.Calender.eventVisible,
      isLoading: state.Calender.loading,
    };
  });
  const [currentMonth, setCurrentMonth] = useState(0);

  const dateInitialValue = {
    startDate:
      moment
        .utc()
        .add(1, 'day')
        .startOf('month')
        .startOf('day')
        .unix() * 1000,
    endDate:
      moment
        .utc()
        .add(1, 'day')
        .endOf('month')
        .endOf('day')
        .unix() * 1000,
  };
  const [date, setDate] = useState(dateInitialValue);

  const onDateChange = onDate => {
    setDate(prevState => {
      const temp = { ...prevState };
      temp.startDate =
        moment(onDate)
          .add(1, 'day')
          .utc()
          .startOf('M')
          .startOf('D')
          .unix() * 1000;

      temp.endDate =
        moment(onDate)
          .add(1, 'day')
          .utc()
          .endOf('month')
          .endOf('day')
          .unix() * 1000;

      return temp;
    });
  };
  const { startDate, endDate } = date;

  useEffect(() => {
    if (email) {
      dispatch(calendarGetData({ email, startDate, endDate, type }));
    }
    //
  }, [dispatch, email, date, startDate, endDate, type, currentCalender]);

  // const [state, setState] = useState({
  //   date: new Date(),
  //   visible: false,
  // });

  // const onChange = date => setState({ date });

  // const onHandleVisible = () => {
  //   dispatch(eventVisible(!isVisible));
  // };

  const CalenderListType = ['Month', 'Schedule'];
  const calendersList = [
    // <YearCalendar
    //   setCurrentCalender={setCurrentCalender}
    //   calenderTypeArray={CalenderListType}
    //   currentCalender={currentCalender}
    // />,
    <MonthCalendar
      setCurrentCalender={setCurrentCalender}
      calenderTypeArray={CalenderListType}
      currentCalender={currentCalender}
      onDateChange={onDateChange}
      isLoading={isLoading}
      parentDate={date}
      setCurrentMonth={setCurrentMonth}
      currentMonth={currentMonth}
    />,
    // <WeekCalendar
    //   setCurrentCalender={setCurrentCalender}
    //   calenderTypeArray={CalenderListType}
    //   currentCalender={currentCalender}
    // />,
    // <DayCalendar
    //   setCurrentCalender={setCurrentCalender}
    //   calenderTypeArray={CalenderListType}
    //   currentCalender={currentCalender}
    // />,
    // <TodayCalendar
    //   setCurrentCalender={setCurrentCalender}
    //   calenderTypeArray={CalenderListType}
    //   currentCalender={currentCalender}
    // />,
    <ScheduleCalendar
      setCurrentCalender={setCurrentCalender}
      calenderTypeArray={CalenderListType}
      currentCalender={currentCalender}
      onDateChange={onDateChange}
      isLoading={isLoading}
      parentDate={date}
      currentMonth={currentMonth}
      setCurrentMonth={setCurrentMonth}
    />,
  ];
  return (
    <>
      <Cards title="Calendar">
        <Main style={{ padding: '10px', borderRadius: '12px' }}>
          <CalendarWrapper>
            <Row gutter={25}>
              <Col xxl={6} xl={9} xs={24}>
                <Aside>
                  {/* <Button onClick={onHandleVisible} className="btn-create" size="large" type="secondary">
                  <FeatherIcon icon="plus" size={14} /> Create New Event
                </Button> */}
                  {/* <div className="calendar-display">
                  <CalenDar next2Label={null} prev2Label={null} onChange={onChange} value={state.date} />
                </div> */}
                  <br />
                  <Cards headless>
                    <h3 className="listHeader">
                      My Calendars
                      {/* <Link onClick={onHandleVisible} className="add-label" to="#">
                      <FeatherIcon icon="plus" size={14} />
                    </Link> */}
                    </h3>
                    <ul className="event-list">
                      <li>
                        <Link to="#">
                          <span className="bullet success" /> Placements{' '}
                        </Link>{' '}
                      </li>
                      <li>
                        <Link to="#">
                          <span className="bullet warning" /> Interviews
                        </Link>{' '}
                      </li>
                    </ul>
                  </Cards>
                </Aside>
              </Col>

              <Col xxl={18} xl={15} xs={24}>
                {calendersList[currentCalender]}
              </Col>
            </Row>
          </CalendarWrapper>
        </Main>
      </Cards>
    </>
  );
};

Calendars.propTypes = {
  type: PropTypes.string,
  user: PropTypes.object,
  currentCalender: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  setCurrentCalender: PropTypes.func,
};

export default Calendars;
