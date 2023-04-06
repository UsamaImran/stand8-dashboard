import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Spin, Tooltip } from 'antd';
import moment from 'moment';
import { UserTableStyleWrapper } from './style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { getTopPerformers } from '../../../../redux/companyOverview/actionCreator';
import Heading from '../../../../components/heading/heading';
// import { CalendarButtonFilter } from '../../../../components/buttons/calendar-button/calendar-button-filter';
// const { Option } = Select;
import { TableWrapper } from '../../../styled';
import { getTopPerformersSpreadPercentage, terminateZeroFromArray } from '../../../../utility/sales-recruiterUtils';
import { formatCurrenyValue } from '../../../../utility/utility';
// const { TreeNode } = TreeSelect;

const compare = (a, b) => {
  const aValue = parseFloat(a.spreadNum);
  const bValue = parseFloat(b.spreadNum);
  if (aValue < bValue) {
    return 1;
  }
  if (aValue > bValue) {
    return -1;
  }
  return 0;
};

export const validatePreviousSpread = array => {
  const newArray = terminateZeroFromArray(array) || [];
  if (newArray.length > 1) {
    return newArray[1];
  }
  if (newArray.length === 1) {
    return newArray[0];
  }
  return 0;
};

const TopPerformers = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    role: 'sales',
  });
  const { role } = state;

  const { topPerformers, topPerformersLoading } = useSelector(rState => {
    return {
      topPerformers: rState.companyOverview.topPerformers,
      topPerformersLoading: rState.companyOverview.topPerformersLoading,
    };
  });

  useEffect(() => {
    if (getTopPerformers) {
      dispatch(getTopPerformers('sales'));
    }
  }, [dispatch]);

  const handleRoleChange = value => {
    setState({
      role: value,
    });
    dispatch(getTopPerformers(value));
  };

  const tbData = [];
  if (topPerformers) {
    topPerformers.map((item, index) => {
      const spread = formatCurrenyValue(item.spread);
      const { spreadDate } = item;
      return tbData.push({
        key: index,
        user: (
          <>
            <div className="user-info">
              <figure>
                <img style={{ width: '40px' }} src={require(`../../../../static/img/avatar/profileImage.png`)} alt="" />
              </figure>
              <figcaption>
                <Heading className="user-name" as="h6">
                  {item.fullName}
                </Heading>
                <div className="user-designation"> {spread}</div>
              </figcaption>{' '}
            </div>
          </>
        ),
        spread: (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Tooltip
              title={`Weekly Spread for ${moment(spreadDate.currentDate).format('MM/DD/YYYY')}`}
              placement="topLeft"
            >
              {formatCurrenyValue(validatePreviousSpread(item.yData))}
              {getTopPerformersSpreadPercentage(item.yData)}
            </Tooltip>
          </div>
        ),
        spreadNum: validatePreviousSpread(item.yData),
      });
    });
    tbData.sort(compare);
  }

  const tbColumns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Spread',
      dataIndex: 'spread',
      key: 'spread',
      sorter: (a, b) => {
        return parseFloat(a.spreadNum) - parseFloat(b.spreadNum);
      },
    },
  ];

  return (
    <Cards
      isbutton={
        <div className="card-nav">
          <ul>
            {/* <li className={role === 'all' ? 'active' : 'deactivate'}>
              <Link onClick={() => handleRoleChange('all')} to="#">
                All
              </Link>
            </li> */}
            <li className={role === 'sales' ? 'active' : 'deactivate'}>
              <Link onClick={() => handleRoleChange('sales')} to="#">
                Sales Users
              </Link>
            </li>
            <li className={role === 'recruiters' ? 'active' : 'deactivate'}>
              <Link onClick={() => handleRoleChange('recruiters')} to="#">
                Recruiters
              </Link>
            </li>
          </ul>
        </div>
      }
      title="Top Performers"
      size="default"
    >
      {topPerformersLoading ? (
        <div className="sd-spin">
          <Spin />
        </div>
      ) : tbData ? (
        <div className="table-bordered table-responsive">
          <UserTableStyleWrapper>
            <TableWrapper>
              <Table
                columns={tbColumns}
                dataSource={tbData}
                pagination={{
                  defaultPageSize: 10,
                  total: tbData.length,
                  showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                }}
              />
            </TableWrapper>
          </UserTableStyleWrapper>
        </div>
      ) : null}
    </Cards>
  );
};

export default TopPerformers;
