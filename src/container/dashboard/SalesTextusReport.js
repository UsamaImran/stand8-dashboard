// removed this screen
import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Skeleton } from 'antd';
import moment from 'moment';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';

const DailyOverview = lazy(() => import('./overview/salesTextus/DailyOverview'));
const CompanyWide = lazy(() => import('./overview/salesTextus/CompanyWide'));
const TextUsUsersData = lazy(() => import('./overview/salesTextus/TextUsUsersData'));

const dateRange = {
  startDate: moment().toDate(),
  endDate: moment().toDate(),
  key: 'selectionDate',
};

const TextUsReport = ({ user }) => {
  // const [state, setState] = useState({
  //   period: 'today',
  //   values: {},
  //   searchText: '',
  //   searchedColumn: '',
  // });

  // const handleChangeDateRange = selectedRange => {
  //   setDateRange(selectedRange);
  //   // dispatch(textUsOneUserFilterData('range', selectedRange, username));
  // };

  // const onChange = (pagination, filters, sorter, extra) => {
  //   setState({ ...state, values: { pagination, filters, sorter, extra } });
  // };
  const cardsWidth = { width: '100%' };
  return (
    <>
      <Cards
        style={cardsWidth}
        title="TextUs"
        // isbutton={
        //   <div
        //     style={{
        //       display: 'flex',
        //       flexWrap: 'wrap',
        //       alignItems: 'center',
        //       top: '3px',
        //     }}
        //   >
        //     <div key="6" className="page-header-actions" style={{ marginLeft: '10px' }}>
        //       <CalendarButtonPageHeader key="1" dateRange={dateRange} onChangeDate={handleChangeDateRange} />
        //       {/* <TimeRangeButtonPageHeader key="2" timeRange={timeRange} onChangeTime={handleChangeTimeRange} /> */}
        //       <FilterButton size="small" key="4" type="primary" onClick={() => {}}>
        //         <CalendarButtonFilter
        //           key="salesPerfCustomDateRange"
        //           style={{ color: 'white', display: 'flex', alignItems: 'center' }}
        //           dateRange={dateRange}
        //           onChangeDate={handleChangeDateRange}
        //         >
        //           <FeatherIcon icon="filter" size={14} />
        //           &nbsp; Filter
        //         </CalendarButtonFilter>
        //       </FilterButton>
        //     </div>
        //   </div>
        // }
      >
        <Main>
          <Row justify="center" gutter={25} style={{ paddingTop: '20px' }}>
            <Col style={{ marginBottom: '25px' }} xxl={10} xl={10} lg={12} xs={25}>
              <Suspense
                fallback={
                  <Cards headless>
                    <Skeleton active />
                  </Cards>
                }
              >
                <DailyOverview user={user} dateRange={dateRange} />
              </Suspense>
            </Col>
            <Col style={{ marginBottom: '25px' }} xxl={14} xl={14} lg={12} xs={24}>
              <Suspense
                fallback={
                  <Cards headless>
                    <Skeleton active />
                  </Cards>
                }
              >
                <CompanyWide user={user} dateRange={dateRange} />
              </Suspense>
            </Col>
            <Col xxl={24} xs={24}>
              <Suspense
                fallback={
                  <Cards headless>
                    <Skeleton active />
                  </Cards>
                }
              >
                <TextUsUsersData user={user} dateRange={dateRange} />
              </Suspense>
            </Col>{' '}
          </Row>
        </Main>
      </Cards>
    </>
  );
};

TextUsReport.propTypes = {
  user: PropTypes.object,
};

export default TextUsReport;
