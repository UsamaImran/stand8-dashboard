import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table, Spin } from 'antd';

// import Highlighter from 'react-highlight-words';
// import { SearchOutlined } from '@ant-design/icons';
import FeatherIcon from 'feather-icons-react';
import moment from 'moment-timezone';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import CallStatistics from './overview/salesVoip/CallStatistics';
import { onSetDate } from '../../redux/pageFilter/actionCreator';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button as FilterButton } from '../../components/buttons/buttons';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import SalesVoIPReportPieChart from '../charts/recharts/SalesVoIPReportPieChart';
import SalesVoIPReportBarChart from '../charts/recharts/SalesVoIPReportBarChart';
import { Main } from '../styled';
import { fetchData } from '../../redux/VoIPReport/actionCreator';
import { getDirectionIcon } from '../../components/utilities/utilities';
import { CalendarButtonFilter } from '../../components/buttons/calendar-button/calendar-button-filter';

const state = {
  searchText: '',
  searchedColumn: '',
};

const SalesVoIPReport = ({ user }) => {
  const { username } = user;
  // const [state, setState] = useState({
  //   searchText: '',
  //   searchedColumn: '',
  // });

  // const searchInput = useRef();

  const dispatch = useDispatch();
  const dateRange = useSelector(s => s.pageFilterReducer.date);
  const voIPReportData = useSelector(s => s.voIPReportReducer.list) || [];
  const isLoading = useSelector(s => s.voIPReportReducer.isLoading) || false;
  const authUser = useSelector(s => s.auth.user);

  useEffect(() => {
    dispatch(fetchData(username));
  }, [dispatch, username]);

  const filterEvent = () => {
    dispatch(fetchData(username));
  };

  const handleChangeDateRange = selectedRange => {
    dispatch(onSetDate(selectedRange));
    filterEvent();
  };

  // const handleSearch = (selectedKeys, confirm, dataIndex) => {
  //   confirm();
  //   setState({
  //     ...state,
  //     searchText: selectedKeys[0],
  //     searchedColumn: dataIndex,
  //   });
  // };

  // const handleReset = clearFilters => {
  //   clearFilters();
  //   setState({ ...state, searchText: '' });
  // };

  // const getColumnSearchProps = dataIndex => ({
  //   // eslint-disable-next-line react/prop-types
  //   filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
  //     <div style={{ padding: 8 }}>
  //       <Input
  //         ref={searchInput}
  //         placeholder={`Search ${dataIndex}`}
  //         value={selectedKeys[0]}
  //         onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
  //         onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //         style={{ width: 188, marginBottom: 8, display: 'block' }}
  //       />
  //       <Space>
  //         <Button
  //           type="primary"
  //           onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //           icon={<SearchOutlined />}
  //           size="small"
  //           style={{ width: 90 }}
  //         >
  //           Search
  //         </Button>
  //         <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
  //           Reset
  //         </Button>
  //         <Button
  //           type="link"
  //           size="small"
  //           onClick={() => {
  //             confirm({ closeDropdown: false });
  //             setState({
  //               ...state,
  //               searchText: selectedKeys[0],
  //               searchedColumn: dataIndex,
  //             });
  //           }}
  //         >
  //           Filter
  //         </Button>
  //       </Space>
  //     </div>
  //   ),
  //   filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  //   onFilter: (value, record) => {
  //     return record[dataIndex]
  //       ? record[dataIndex]
  //         .toString()
  //         .toLowerCase()
  //         .includes(value.toLowerCase())
  //       : '';
  //   },

  //   onFilterDropdownVisibleChange: visible => {
  //     if (visible) {
  //       setTimeout(() => searchInput.current.select(), 100);
  //     }
  //   },
  //   render: text =>
  //     state.searchedColumn === dataIndex ? (
  //       <Highlighter
  //         highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
  //         searchWords={[state.searchText]}
  //         autoEscape
  //         textToHighlight={text ? text.toString() : ''}
  //       />
  //     ) : (
  //       text.toString()
  //     ),
  // });

  const columns = [
    // {
    //   title: 'User',
    //   dataIndex: 'user',
    //   sorter: (a, b) => a.user.localeCompare(b.user),
    //   ...getColumnSearchProps('user'),
    // },
    {
      title: 'Direction',
      dataIndex: 'call_direction',
      key: 'call_direction',
      render: direction => getDirectionIcon(direction),
    },
    {
      title: 'Date & Time',
      dataIndex: 'timestamp',
      width: 0,
      key: 'timestamp',
      responsive: ['lg'],
      sorter: (a, b) => a.timestamp - b.timestamp,
      render: text => {
        return moment
          .utc(text)
          .tz(authUser.timezone)
          .format('Y-M-D hh:mm:ss');
      },
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      responsive: ['lg'],
    },
    {
      title: 'To',
      dataIndex: 'to',
      responsive: ['lg'],
      render: (text, record, index) => {
        return <div key={index}>{record.to}</div>;
      },
    },
    {
      title: 'Call Duration',
      dataIndex: 'duration_seconds',
      responsive: ['md'],
      render: text => {
        const durationSeconds = parseInt(text, 10);
        return (
          <div>
            {/* {moment
              .utc(moment.duration(durationSeconds, 'seconds').asMilliseconds())
              .tz(authUser.timezone)
              .format('HH:mm:ss')} */}
            {moment.utc(moment.duration(durationSeconds, 'seconds').asMilliseconds()).format('HH:mm:ss')}
          </div>
        );
      },
    },
    {
      title: 'Talk Time',
      dataIndex: 'talk_time',
      render: text => {
        const talkSeconds = parseInt(text, 10);
        return (
          <div>
            {/* {moment
              .utc(moment.duration(text, 'seconds').asMilliseconds())
              .tz(authUser.timezone)
              .format('HH:mm:ss')} */}
            {moment.utc(moment.duration(talkSeconds, 'seconds').asMilliseconds()).format('HH:mm:ss')}
          </div>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      responsive: ['md'],
      render: () => <FeatherIcon icon="eye" size={14} key="report-action" />,
    },
  ];

  const tableData = voIPReportData.map(row => ({
    key: row.id,
    ...row,
  }));

  const filteredTableData = voIPReportData
    .filter(f => f[state.searchedColumn] === state.searchText)
    .map(row => ({
      key: row.id,
      ...row,
    }));

  const cardMargin = {
    marginBottom: '20px',
  };

  return (
    <VoipWrapper>
      <Cards title="VoIP Report">
        <Main>
          <Row gutter={6} style={{ paddingTop: '20px' }}>
            <Col md={8} xs={24} style={cardMargin}>
              <SalesVoIPReportPieChart user={user} data={voIPReportData} dateRange={dateRange} />
            </Col>

            <Col md={8} xs={24} style={cardMargin}>
              <SalesVoIPReportBarChart user={user} />
            </Col>

            <Col md={8} xs={24} style={cardMargin}>
              <CallStatistics user={user} />
            </Col>

            <Col xs={24} style={{ marginTop: '10px' }}>
              <Cards
                title="VoIP Report"
                isbutton={
                  <div key="6" className="page-header-actions">
                    <CalendarButtonPageHeader key="1" dateRange={dateRange} onChangeDate={handleChangeDateRange} />
                    {/* <TimeRangeButtonPageHeader key="2" timeRange={timeRange} onChangeTime={handleChangeTimeRange} /> */}
                    <FilterButton size="small" key="4" type="primary">
                      <CalendarButtonFilter
                        key="salesPerfCustomDateRange"
                        style={{ color: 'white', display: 'flex', alignItems: 'center' }}
                        dateRange={dateRange}
                        onChangeDate={handleChangeDateRange}
                      >
                        <FeatherIcon icon="filter" size={14} />
                        &nbsp; Filter
                      </CalendarButtonFilter>
                    </FilterButton>
                  </div>
                }
              >
                {isLoading ? (
                  <div className="sd-spin">
                    <Spin />
                  </div>
                ) : (
                  <Table
                    className="table-responsive"
                    pagination={{
                      defaultPageSize: 20,
                      total: filteredTableData.length > 0 ? filteredTableData.length : tableData.length,
                      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    }}
                    dataSource={filteredTableData.length > 0 ? filteredTableData : tableData}
                    columns={columns}
                  />
                )}
              </Cards>
            </Col>
          </Row>
        </Main>
      </Cards>
    </VoipWrapper>
  );
};

SalesVoIPReport.propTypes = {
  user: PropTypes.object,
};

export default SalesVoIPReport;

const VoipWrapper = styled.div`
  .ant-card {
    height: 100%;
  }
`;
