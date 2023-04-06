import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import Styled from 'styled-components';

import SpreadHistoryChart from './SpreadHistoryChart';
import ContractorsEndingTable from './ContractorsEndingTable';
import SalesPerfChart from './SalesPerfChart';
// import CompanyLeaderBoard from '../company/CompanyLeaderBoard'

import CompanyLeaderBoard from './CompanyLeaderBoard';
import { getTextusData, getVoipData } from '../../../../redux/recruiterProfile/actionCreator';
import PlacementsStartingTable from './PlacementsStartingTable';

const Overview = ({ user }) => {
  const { email, username } = user;
  const dispatch = useDispatch();

  useEffect(() => {
    if (getTextusData && email) {
      dispatch(getTextusData({ email }));
    }
    if (getVoipData && username) {
      dispatch(getVoipData({ username }));
    }
  }, [dispatch, email, username]);
  const cardsWidth = { width: '100%' };
  return (
    <OverviewWrapper>
      <Row gutter={15}>
        <Col xs={25} style={cardsWidth}>
          <SpreadHistoryChart user={user} />
        </Col>

        <Col xs={25} lg={12} style={cardsWidth}>
          <ContractorsEndingTable user={user} />
        </Col>

        <Col xs={25} lg={12} style={cardsWidth}>
          <PlacementsStartingTable user={user} />
        </Col>

        <Col xs={25} lg={12} style={cardsWidth}>
          <SalesPerfChart user={user} />
        </Col>

        <Col xs={25} lg={12} style={cardsWidth}>
          <CompanyLeaderBoard />
        </Col>
        {/* <Col xs={8}>
          <Cards more={moreContent} title="Textus Data" size="default">
            <Table className="table-responsive" pagination={false} showHeader={false} dataSource={textusTable.dataSource} columns={textusTable.columns} />
          </Cards>
        </Col>
        <Col xs={8}>
          <Cards more={moreContent} title="Voip Data" size="default">
            <Table className="table-responsive" pagination={false} showHeader={false} dataSource={voipTable.dataSource} columns={voipTable.columns} />
          </Cards>
        </Col>
        <Col xs={8}>
          <Cards more={moreContent} title="Voip Data" size="default">
            <Table className="table-responsive" pagination={false} showHeader={false} dataSource={voipTable.dataSource} columns={voipTable.columns} />
          </Cards>
        </Col> */}
      </Row>
    </OverviewWrapper>
  );
};

Overview.propTypes = {
  user: PropTypes.object,
};

export default Overview;

const OverviewWrapper = Styled.div`
  .ant-col {
    padding-bottom: 15px;
  }
  .ant-card{
    height: 100%;
    margin-bottom: 10px;
  }
`;
// const textusTable = {
//   dataSource: [
//     {
//       key: '1',
//       label: 'Delivered',
//       value: textusData ? textusData.delivered : 0,
//     },
//     {
//       key: '2',
//       label: 'Received',
//       value: textusData ? textusData.received : 0,
//     },
//     {
//       key: '3',
//       label: 'Active',
//       value: textusData ? textusData.delivered : 0,
//     },
//     {
//       key: '4',
//       label: 'Total Response Rate',
//       value: textusData ? textusData.total_response_rate : 0,
//     },
//   ],
//   columns: [
//     {
//       title: '',
//       dataIndex: 'label',
//       key: 'label',
//     },
//     {
//       title: '',
//       dataIndex: 'value',
//       key: 'value',
//     },
//   ],
// };

// const voipTable = {
//   dataSource: [
//     {
//       key: '1',
//       label: 'Number of Calls',
//       value: voipData ? voipData.number_of_calls : 0,
//     },
//     {
//       key: '2',
//       label: 'Average Duration',
//       value: voipData ? voipData.avg_duration : 0,
//     },
//     {
//       key: '3',
//       label: 'Longest Call',
//       value: voipData ? voipData.longest_duration : 0,
//     },
//     {
//       key: '4',
//       label: 'Total Duration',
//       value: voipData ? voipData.total_duration : 0,
//     },
//   ],
//   columns: [
//     {
//       title: '',
//       dataIndex: 'label',
//       key: 'label',
//     },
//     {
//       title: '',
//       dataIndex: 'value',
//       key: 'value',
//     },
//   ],
// };
