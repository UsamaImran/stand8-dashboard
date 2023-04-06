import React, { Suspense, useState, useEffect } from 'react';
import { Form, Col, Row, Select, DatePicker, Table, Spin, Skeleton, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';
import FeatherIcon from 'feather-icons-react';
import { getStartAndEndOfWeek } from './SalesManagement';
import { validatePreviousSpread } from './overview/company/TopPerformers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Drawer } from '../../components/drawer/drawer';
import { Main, BasicFormWrapper } from '../styled';
import { getRecruiters } from '../../redux/recruiterManagement/actionCreator';
import { UserTableStyleWrapper } from '../pages/style';
import { formatCurrenyValue } from '../../utility/utility';
import { getTopPerformersSpreadPercentage } from '../../utility/sales-recruiterUtils';
// import { getLocalTimeZone } from '../../utility/utility';

const { Option } = Select;

const RecruiterManagement = () => {
  const dispatch = useDispatch();

  const authUser = useSelector(s => s.auth.user);

  const { recruiters, recruitersLoading } = useSelector(state => {
    return {
      recruiters: state.recruiterManagement.recruiters,
      recruitersLoading: state.recruiterManagement.recruitersLoading,
    };
  });

  const [state, setState] = useState({
    weekDate: moment(),
    spreadDate: 'ytd',
  });
  const { weekDate, spreadDate } = state;

  useEffect(() => {
    if (getRecruiters) {
      dispatch(getRecruiters(weekDate, spreadDate));
    }
  }, [dispatch, spreadDate]);
  // <span className={`status-text success`}>success</span>

  const dataSource = [];
  if (recruiters) {
    recruiters.map(user => {
      const aboveGoal = user.aboveGoal ? (
        <span className="status-text active">Above Goal</span>
      ) : (
        <span className="status-text deactive">Below Goal</span>
      );
      const formattedSum = user.spreadSum ? user.spreadSum.toFixed(2) : 0;
      const spread = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(formattedSum);

      const msgInCount = user.messageDetails.filter(msg => msg.message_direction === 'in');
      const msgOutCount = user.messageDetails.filter(msg => msg.message_direction === 'out');

      const callinCount = user.callDetails.filter(call => call.call_direction === 'inbound');
      const callOutcount = user.callDetails.filter(call => call.call_direction === 'outbound');
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
            {callinCount.length} In
            <br />
            <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>{callOutcount.length} Out</span>
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
      title: 'Prescreens',
      dataIndex: 'prescreens',
      key: 'prescreens',
      sorter: (a, b) => {
        const segs1 = a.prescreens.split('/');
        const segs2 = b.prescreens.split('/');
        return parseFloat(segs1[0]) - parseFloat(segs2[0]);
      },
    },
    {
      title: 'Sendout to Customer',
      dataIndex: 'customerSendOuts',
      key: 'customerSendOuts',
      sorter: (a, b) => {
        const segs1 = a.customerSendOuts.split('/');
        const segs2 = b.customerSendOuts.split('/');
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
        return parseFloat(a.messageDetails.length) - parseFloat(b.messageDetails.length);
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
        return parseFloat(a.callDetails.length) - parseFloat(b.callDetails.length);
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
    setState({
      ...state,
      spreadDate: range,
    });
    dispatch(getRecruiters(weekDate, range));
  };

  const handleWeekChange = date => {
    setState({
      ...state,
      weekDate: date,
    });
    dispatch(getRecruiters(date, spreadDate));
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
        title: 'Date & times',
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

    const mDataSource = e.messageDetails;

    const vDataSource = e.callDetails;

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
        style={{ padding: '10px' }}
        title="Recruiters Management"
        isbutton={
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
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
          <Row justify="center" gutter={25} style={{ paddingTop: '20px' }}>
            <Col xxl={24} xs={24}>
              <Suspense
                fallback={
                  <Cards headless>
                    <Skeleton active />
                  </Cards>
                }
              >
                <Cards title="Recruiters" size="default">
                  {recruitersLoading ? (
                    <div className="sd-spin">
                      <Spin />
                    </div>
                  ) : (
                    <UserTableStyleWrapper>
                      <Table
                        scroll={{ x: true }}
                        className="table-responsive"
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

export default RecruiterManagement;
