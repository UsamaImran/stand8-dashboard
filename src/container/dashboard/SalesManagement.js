import React, { Suspense, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Form, Col, Row, Select, DatePicker, Table, Spin, Skeleton } from 'antd';
import { Form, Col, Row, Select, DatePicker, Table, Spin, Skeleton, Tooltip } from 'antd';
import moment from 'moment-timezone';
import FeatherIcon from 'feather-icons-react';
import { validatePreviousSpread } from './overview/company/TopPerformers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Drawer } from '../../components/drawer/drawer';
import { Main, BasicFormWrapper } from '../styled';
import { getSalesUsers } from '../../redux/salesManagement/actionCreator';
import { UserTableStyleWrapper } from '../pages/style';
import { formatCurrenyValue } from '../../utility/utility';
import { getTopPerformersSpreadPercentage } from '../../utility/sales-recruiterUtils';
// import { getLocalTimeZone } from '../../utility/utility';

const { Option } = Select;

export const getStartAndEndOfWeek = value => {
  return (
    <p style={{ marginRight: '20px', display: 'flex', marginTop: '10px' }}>
      {moment(value)
        .utc()
        .startOf('week')
        .startOf('day')
        .format('MM/DD/YYYY')}
      &nbsp;-&nbsp;
      {moment(value)
        .utc()
        .endOf('week')
        .endOf('day')
        .format('MM/DD/YYYY')}
    </p>
  );
};

const SalesManagement = () => {
  const dispatch = useDispatch();

  const authUser = useSelector(s => s.auth.user);

  const { salesUsers, salesUsersLoading } = useSelector(state => {
    return {
      salesUsers: state.salesManagement.salesUsers,
      salesUsersLoading: state.salesManagement.salesUsersLoading,
    };
  });

  const [state, setState] = useState({
    weekDate: moment(),
    spreadDate: 'ytd',
  });
  const { weekDate, spreadDate } = state;

  useEffect(() => {
    if (getSalesUsers) {
      dispatch(getSalesUsers(weekDate, spreadDate));
    }
  }, [dispatch, spreadDate]);
  // <span className={`status-text success`}>success</span>

  const dataSource = [];
  if (salesUsers) {
    salesUsers.map(user => {
      const aboveGoal = user.aboveGoal ? (
        <span className="status-text active">Above Goal</span>
      ) : (
        <span className="status-text deactive">Below Goal</span>
      );

      const spread = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
        user.spreadSum ? user.spreadSum.toFixed(2) : 0,
      );

      const msgInCount = user.messages.filter(msg => msg.message_direction === 'in');
      const msgOutCount = user.messages.filter(msg => msg.message_direction === 'out');

      const callInCount = user.calls.filter(call => call.call_direction === 'inbound');
      const callOutCount = user.calls.filter(call => call.call_direction === 'outbound');

      return dataSource.push({
        ...user,
        name: (
          <div>
            {user.name}
            <br />
            <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>{spread}</span>
          </div>
        ),
        nameText: user.name,
        textsC: (
          <div>
            {msgInCount.length} In
            <br />
            <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>{msgOutCount.length} Out</span>
          </div>
        ),
        callsC: (
          <div>
            {callInCount.length} In
            <br />
            <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>{callOutCount.length} Out</span>
          </div>
        ),
        aboveGoal,
        spread: (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Tooltip
              title={`Weekly Spread for ${moment(user.spreadDate.currentDate).format('MM/DD/YYYY')}`}
              placement="topLeft"
            >
              {formatCurrenyValue(validatePreviousSpread(user.spread))}
              {getTopPerformersSpreadPercentage(user.spread)}
            </Tooltip>
          </div>
        ),
        spreadValue: validatePreviousSpread(user.spread),
      });
    });
  }

  const columns = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',

      sorter: (a, b) => a.nameText.localeCompare(b.nameText),
    },
    {
      title: 'Job Orders',
      dataIndex: 'jobOrders',
      key: 'jobOrders',

      sorter: (a, b) => {
        const segs1 = a.jobOrders.split('/');
        const segs2 = b.jobOrders.split('/');
        return parseFloat(segs1[0]) - parseFloat(segs2[0]);
      },
    },
    {
      title: 'Client Visits',
      dataIndex: 'clientVisits',
      key: 'clientVisits',

      sorter: (a, b) => {
        const segs1 = a.clientVisits.split('/');
        const segs2 = b.clientVisits.split('/');
        return parseFloat(segs1[0]) - parseFloat(segs2[0]);
      },
    },
    {
      title: 'Client Send Outs',
      dataIndex: 'clientSendOuts',
      key: 'clientSendOuts',

      sorter: (a, b) => {
        const segs1 = a.clientSendOuts.split('/');
        const segs2 = b.clientSendOuts.split('/');
        return parseFloat(segs1[0]) - parseFloat(segs2[0]);
      },
    },
    {
      title: 'Interviews',
      dataIndex: 'interviews',
      key: 'interviews',

      sorter: (a, b) => {
        const segs1 = a.interviews.split('/');
        const segs2 = b.interviews.split('/');
        return parseFloat(segs1[0]) - parseFloat(segs2[0]);
      },
    },
    {
      title: 'Placements',
      dataIndex: 'placements',
      key: 'placements',

      sorter: (a, b) => {
        const segs1 = a.placements.split('/');
        const segs2 = b.placements.split('/');
        return parseFloat(segs1[0]) - parseFloat(segs2[0]);
      },
    },
    {
      title: 'Texts',
      dataIndex: 'textsC',
      key: 'textsC',
      sorter: (a, b) => {
        return parseFloat(a.messages.length) - parseFloat(b.messages.length);
        // const segs1 = a.msgCount.split('/');
        // const segs2 = b.msgCount.split('/');
        // return parseFloat(segs1[0]) - parseFloat(segs2[0]);
      },
    },
    {
      title: 'Calls',
      dataIndex: 'callsC',
      key: 'callsC',
      sorter: (a, b) => {
        return parseFloat(a.calls.length) - parseFloat(b.calls.length);
        // const segs1 = a.msgCount.split('/');
        // const segs2 = b.msgCount.split('/');
        // return parseFloat(segs1[0]) - parseFloat(segs2[0]);
      },
    },
    {
      title: 'Status',
      dataIndex: 'aboveGoal',
      key: 'aboveGoal',
    },
    {
      title: 'Spread',
      dataIndex: 'spread',
      key: 'spread',
      fixed: 'right',
      sorter: (a, b) => {
        return parseFloat(a.spreadValue) - parseFloat(b.spreadValue);
      },
    },
  ];

  const handleSpreadRangeChange = range => {
    // console.log(range);
    setState({
      ...state,
      spreadDate: range,
    });
    dispatch(getSalesUsers(weekDate, range));
  };

  const handleWeekChange = date => {
    setState({
      ...state,
      weekDate: date,
    });
    dispatch(getSalesUsers(date, spreadDate));
  };

  const expandedRowRender = e => {
    const MtbColumns = [
      {
        title: 'Contact name',
        dataIndex: 'contact_name',
        key: 'contact_name',
      },
      {
        title: 'Contact phone',
        dataIndex: 'contact_phone',
        key: 'contact_phone',
      },
      {
        title: 'Message body',
        dataIndex: 'message_body',
        key: 'message_body',
      },
      {
        title: 'Direction',
        dataIndex: 'message_direction',
        key: 'message_direction',
      },
      {
        title: 'Date & time',
        dataIndex: 'message_delivered',
        key: 'message_delivered',
        render: text => {
          return moment
            .utc(text)
            .tz(authUser.timezone)
            .format('Y-M-D hh:mm:ss A');
        },
      },
    ];

    const VtbColumns = [
      {
        title: 'Direction',
        dataIndex: 'call_direction',
        key: 'call_direction',
      },
      {
        title: 'Date & Time',
        dataIndex: 'timestamp',
        width: 0,
        key: 'timestamp',

        sorter: (a, b) => a.timestamp - b.timestamp,
        render: text => {
          return moment(text)
            .tz(authUser.timezone)
            .format('D MMM, YYYY | h:mm:ss A');
        },
      },
      {
        title: 'From',
        dataIndex: 'from',
        key: 'from',
      },
      {
        title: 'To',
        dataIndex: 'to',

        render: (text, record, index) => {
          return <div key={index}>{record.to}</div>;
        },
      },
      {
        title: 'Call Duration',
        dataIndex: 'duration_seconds',
        render: text => {
          const durationSeconds = parseInt(text, 10);
          return (
            <div>{moment.utc(moment.duration(durationSeconds, 'seconds').asMilliseconds()).format('HH:mm:ss')}</div>
          );
        },
      },
      {
        title: 'Talk Time',
        dataIndex: 'talk_time',
        render: text => {
          return <div>{moment.utc(moment.duration(text, 'seconds').asMilliseconds()).format('HH:mm:ss')}</div>;
        },
      },
      {
        title: 'Action',
        key: 'action',
        render: () => <FeatherIcon icon="eye" size={14} key="report-action" />,
      },
    ];

    const mDataSource = e.messages;

    const vDataSource = e.calls;

    return (
      <>
        <Cards title="Texts">
          <Table
            scroll={{ x: true }}
            columns={MtbColumns}
            dataSource={mDataSource}
            bordered
            pagination={{ pageSize: 5 }}
          />
        </Cards>
        <Cards title="Calls">
          <Table
            scroll={{ x: true }}
            columns={VtbColumns}
            dataSource={vDataSource}
            bordered
            pagination={{ pageSize: 5 }}
          />
        </Cards>
      </>
    );
  };

  return (
    <>
      <Cards
        title="Sales Management"
        isbutton={
          <div style={{ display: 'flex' }}>
            {getStartAndEndOfWeek(state.weekDate)}
            <Drawer title="Recruiter Management" btnText="Change Date" placement="right">
              {getStartAndEndOfWeek(state.weekDate)}
              <BasicFormWrapper>
                <Form layout="vertical" hideRequiredMark>
                  <Form.Item
                    initialValue={weekDate}
                    name="weekdate"
                    label="Select Week"
                    rules={[{ required: true, message: 'Please select date' }]}
                  >
                    <DatePicker picker="week" onChange={handleWeekChange} />
                  </Form.Item>

                  <Form.Item
                    initialValue={spreadDate}
                    name="spread"
                    label="Spread Adjustment"
                    rules={[{ required: true, message: 'Please choose the Spread Adjustment' }]}
                  >
                    <Select placeholder="Please choose one" onChange={handleSpreadRangeChange}>
                      <Option value="q1">Q1</Option>
                      <Option value="q2">Q2</Option>
                      <Option value="q3">Q3</Option>
                      <Option value="q4">Q4</Option>
                      <Option value="ytd">YTD</Option>
                    </Select>
                  </Form.Item>
                </Form>
              </BasicFormWrapper>
            </Drawer>
          </div>
        }
      >
        <Main>
          {' '}
          <Row justify="center" gutter={25} style={{ paddingTop: '20px' }}>
            <Col xxl={24} xs={24}>
              <Suspense
                fallback={
                  <Cards headless>
                    <Skeleton active />
                  </Cards>
                }
              >
                <Cards title="Sales Users" size="default">
                  {salesUsersLoading ? (
                    <div className="sd-spin">
                      <Spin />
                    </div>
                  ) : (
                    <UserTableStyleWrapper>
                      <Table
                        scroll={{ x: true }}
                        pagination={false}
                        dataSource={dataSource}
                        columns={columns}
                        expandable={{ expandedRowRender }}
                      />
                    </UserTableStyleWrapper>
                  )}
                </Cards>
              </Suspense>
            </Col>
          </Row>
        </Main>
      </Cards>
    </>
  );
};

export default SalesManagement;
