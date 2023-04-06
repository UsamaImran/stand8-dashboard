import React, { useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Space, Progress, Spin } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';
import { TrafficTableWrapper } from '../../style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { textUsUsersGetData, textUsUsersFilterData, onSetDate } from '../../../../redux/textUs/actionCreator';
import { CalendarButtonPageHeader } from '../../../../components/buttons/calendar-button/calendar-button';
import { Button as FilterButton } from '../../../../components/buttons/buttons';
import { CalendarButtonFilter } from '../../../../components/buttons/calendar-button/calendar-button-filter';
// const moreContent = (
//   <>
//     <NavLink to="#">
//       <FeatherIcon size={16} icon="book-open" />
//       <span>PDF</span>
//     </NavLink>
//     <NavLink to="#">
//       <FeatherIcon size={16} icon="file-text" />
//       <span>Google Sheets</span>
//     </NavLink>
//     <NavLink to="#">
//       <FeatherIcon size={16} icon="x" />
//       <span>Excel (XLSX)</span>
//     </NavLink>
//     <NavLink to="#">
//       <FeatherIcon size={16} icon="file" />
//       <span>CSV</span>
//     </NavLink>
//   </>
// );

const TextUsUsersData = () => {
  const dispatch = useDispatch();
  const { textUsUsersData, authUser, tuLoading } = useSelector(state => {
    return {
      textUsUsersData: state.textUsReducer.textUsUsersData,
      tuLoading: state.textUsReducer.tuLoading,
      // dateRange: state.textUsReducer.dateRange,
      authUser: state.auth.user,
    };
  });

  const [state, setState] = useState({
    period: 'today',
    values: {},
    searchText: '',
    searchedColumn: '',
  });

  const [dateRange, setDateRange] = useState({
    startDate: moment().toDate(),
    endDate: moment().toDate(),
    key: 'selectionDate',
  });

  const searchInput = useRef();

  useEffect(() => {
    if (textUsUsersGetData) {
      dispatch(textUsUsersGetData());
    }
    if (onSetDate) {
      const dateR = {
        startDate: moment()
          .tz(authUser.timezone)
          .toDate(),
        endDate: moment()
          .tz(authUser.timezone)
          .toDate(),
        key: 'selectionDate',
      };
      dispatch(onSetDate(dateR));
    }
  }, [dispatch, authUser]);

  const handleChangeDateRange = selectedRange => {
    setDateRange(selectedRange);
    dispatch(textUsUsersFilterData('range', selectedRange));
  };
  // const filterEvent = () => {
  //   dispatch(textUsUsersFilterData('range', dateRange));
  // };

  const onChange = (pagination, filters, sorter, extra) => {
    setState({ ...state, values: { pagination, filters, sorter, extra } });
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      ...state,
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = clearFilters => {
    clearFilters();
    setState({ ...state, searchText: '' });
  };

  const getColumnSearchProps = dataIndex => ({
    // eslint-disable-next-line react/prop-types
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setState({
                ...state,
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: text =>
      state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const locationColumns = [
    {
      title: 'User',
      dataIndex: 'account_name',
      key: 'account_name',
      sorter: (a, b) => a.account_name.localeCompare(b.account_name),
      ...getColumnSearchProps('account_name'),
    },
    {
      title: 'Delivered Messages',
      dataIndex: 'delivered',
      key: 'delivered',
      responsive: ['md'],
      sorter: (a, b) => parseInt(a.delivered, 10) - parseInt(b.delivered, 10),
    },
    {
      title: 'Received Messages',
      dataIndex: 'received',
      key: 'received',
      responsive: ['md'],
      sorter: (a, b) => parseInt(a.received, 10) - parseInt(b.received, 10),
    },
    {
      title: 'Messages Per Conversation',
      dataIndex: 'messages_per_conversion',
      key: 'messages_per_conversion',
      responsive: ['lg'],
      sorter: (a, b) => parseFloat(a.messages_per_conversion, 10) - parseFloat(b.messages_per_conversion, 10),
    },
    {
      title: 'Total Response Rate',
      dataIndex: 'total_response_rate',
      key: 'total_response_rate',
      responsive: ['lg'],
      render: text => {
        return (
          <Progress
            percent={parseFloat(text)}
            strokeWidth={5}
            status="active"
            showInfo={false}
            className="progress-rt progress-info"
          />
        );
      },
    },
    {
      title: 'Value',
      dataIndex: 'total_response_rate',
      key: 'total_response_rate',
      sorter: (a, b) => parseFloat(a.total_response_rate, 10) - parseFloat(b.total_response_rate, 10),
    },
  ];

  return (
    <Cards
      isbutton={
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            top: '3px',
          }}
        >
          <div key="6" className="page-header-actions" style={{ marginLeft: '10px' }}>
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
        </div>
      }
      title="TextUs Users Data"
      size="large"
    >
      {tuLoading ? (
        <div className="sd-spin">
          <Spin />
        </div>
      ) : (
        <TrafficTableWrapper>
          <div className="table-bordered table-responsive">
            <Table
              columns={locationColumns}
              dataSource={textUsUsersData && textUsUsersData}
              pagination={{
                defaultPageSize: 10,
                total: textUsUsersData && textUsUsersData.length,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              }}
              onChange={onChange}
            />
          </div>
        </TrafficTableWrapper>
      )}
    </Cards>
  );
};

export default TextUsUsersData;
