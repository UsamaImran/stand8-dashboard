import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Spin, Table, Progress } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import FeatherIcon from 'feather-icons-react';
import { TrafficTableWrapper } from '../../style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { textUsOneUserFilterData } from '../../../../redux/salesTextUs/actionCreator';
import { CONVERSATION_DIRECTION } from '../../../../constants';
import { CalendarButtonPageHeader } from '../../../../components/buttons/calendar-button/calendar-button';
import { Button as FilterButton } from '../../../../components/buttons/buttons';
import { CalendarButtonFilter } from '../../../../components/buttons/calendar-button/calendar-button-filter';
import { getLocalTimeZone } from '../../../../utility/utility';

const getUniqueValuesFromConversationId = array => {
  const key = 'conversation_id';
  const uniqueContacts = [...new Map(array && array.map(item => [item[key], item])).values()];

  return uniqueContacts;
};

const filterConversation = (array, id) => {
  return array && array.filter(item => item.conversation_id === id);
};

const mapTableData = (uniqueArray, wholeArray) => {
  const data = uniqueArray.map(uniqueItem => {
    let sent = 0;
    let received = 0;
    for (let i = 0; i < wholeArray.length; i += 1) {
      if (uniqueItem.conversation_id === wholeArray[i].conversation_id) {
        if (wholeArray[i].message_direction.toLowerCase() === CONVERSATION_DIRECTION.IN) {
          received += 1;
        } else {
          sent += 1;
        }
      }
    }
    return {
      name: uniqueItem.contact_name,
      messages_received: received,
      message_sent: sent,
      conversation_id: uniqueItem.conversation_id,
    };
  });

  return data;
};

const TextUsUsersData = ({ user }) => {
  const { username } = user;

  const dispatch = useDispatch();
  const { textUsOneUsersData, isLoading } = useSelector(state => {
    return {
      textUsOneUsersData: state.salesTextUs.textUsOneUsersData,
      // dateRange: state.salesTextUs.dateRange,
      authUser: state.auth.user,
      isLoading: state.salesTextUs.touLoading,
    };
  });

  const uniqueContacts = getUniqueValuesFromConversationId(textUsOneUsersData);

  const tableOverviewData = mapTableData(uniqueContacts, textUsOneUsersData);

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

  useEffect(() => {
    if (textUsOneUserFilterData) {
      dispatch(textUsOneUserFilterData('range', dateRange, username));
    }
  }, [dispatch, username, dateRange]);

  const handleChangeDateRange = selectedRange => {
    setDateRange(selectedRange);
    dispatch(textUsOneUserFilterData('range', selectedRange, username));
  };

  const onChange = (pagination, filters, sorter, extra) => {
    setState({ ...state, values: { pagination, filters, sorter, extra } });
  };

  const tbcolumsOuter = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Delivered Messages',
      dataIndex: 'message_sent',
      key: 'message_sent',
      responsive: ['md'],
      render: messageSent => (
        <>
          {messageSent} &nbsp; <ArrowUpOutlined />{' '}
        </>
      ),
    },
    {
      title: 'Received Messages',
      dataIndex: 'messages_received',
      key: 'messages_received',
      responsive: ['md'],
      render: messagesReceived => (
        <>
          {messagesReceived} &nbsp; <ArrowDownOutlined />{' '}
        </>
      ),
    },
    {
      title: 'Messages Per Conversation',
      dataIndex: 'messages_per_conversation',
      responsive: ['lg'],
      key: 'messages_per_conversation',
    },
    {
      title: 'Total Response Rate',
      dataIndex: 'total_response_rate',
      key: 'total_response_rate',
      responsive: ['md'],
      render: () => (
        <>
          {' '}
          <Progress percent={40} showInfo={false} />{' '}
        </>
      ),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      responsive: ['md'],
      key: 'value',
    },
  ];

  const tbColumns = [
    {
      title: 'Contact name',
      dataIndex: 'contact_name',
      key: 'contact_name',
    },
    {
      title: 'Contact phone',
      dataIndex: 'contact_phone',
      key: 'contact_phone',
      responsive: ['md'],
    },
    {
      title: 'Message body',
      dataIndex: 'message_body',
      key: 'message_body',
      responsive: ['lg'],
    },
    {
      title: 'Message direction',
      dataIndex: 'message_direction',
      key: 'message_direction',
      responsive: ['md'],
    },
    {
      title: 'Date & time',
      dataIndex: 'message_delivered',
      key: 'message_delivered',
      responsive: ['md'],
      render: value => {
        return moment
          .utc(value)
          .tz(getLocalTimeZone())
          .format('D MMM, YYYY | h:mm:ss');
      },
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
            <FilterButton size="small" key="4" type="primary" onClick={() => {}}>
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
      <TrafficTableWrapper>
        <div className="table-bordered table-responsive">
          {isLoading ? (
            <div className="sd-spin">
              <Spin />
            </div>
          ) : (
            <Table
              className="table-responsive"
              rowKey={record => record.conversation_id}
              expandable={{
                expandedRowRender: record => {
                  const filteredData = filterConversation(textUsOneUsersData, record.conversation_id);
                  return (
                    <Table
                      style={{ marginBottom: '20px', marginTop: '20px' }}
                      columns={tbColumns}
                      dataSource={filteredData && filteredData}
                      pagination={false}
                    />
                  );
                },
              }}
              columns={tbcolumsOuter}
              dataSource={tableOverviewData && tableOverviewData}
              pagination={{
                defaultPageSize: 10,
                total: tableOverviewData && tableOverviewData.length,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              }}
              onChange={onChange}
            />
          )}
        </div>
      </TrafficTableWrapper>
    </Cards>
  );
};

TextUsUsersData.propTypes = {
  user: PropTypes.object,
};

export default TextUsUsersData;
