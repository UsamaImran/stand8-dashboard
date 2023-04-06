import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Spin, Tooltip } from 'antd';
import moment from 'moment';
import { UserTableStyleWrapper } from './style';
import { validatePreviousSpread } from './TopPerformers';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { getPerformanceDetails } from '../../../../redux/companyOverview/actionCreator';
// import { CalendarButtonFilter } from '../../../../components/buttons/calendar-button/calendar-button-filter';
// const { Option } = Select;
import { TOP_PERFORMERS_ROLE } from '../../../../constants';
import { getTopPerformersSpreadPercentage } from '../../../../utility/sales-recruiterUtils';
import { formatCurrenyValue } from '../../../../utility/utility';
import Heading from '../../../../components/heading/heading';
// const { TreeNode } = TreeSelect;
const sortValues = (a, b, key) => a[key] - b[key];

const UsersPerformance = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    role: 'sales',
  });
  const { role } = state;

  const [dateState, setDateState] = useState({
    dateRange: 'week',
    searchText: '',
    searchedColumn: '',
  });
  const { dateRange } = dateState;

  const { performersDetails, isLoading } = useSelector(rState => {
    return {
      performersDetails: rState.companyOverview.performersDetails,
      isLoading: rState.companyOverview.performersDetailsLoading,
    };
  });

  useEffect(() => {
    if (getPerformanceDetails) {
      dispatch(getPerformanceDetails('sales', dateRange));
    }
  }, [dispatch]);

  const handleRoleChange = value => {
    setState({
      role: value,
    });
    dispatch(getPerformanceDetails(value, dateRange));
  };

  const handleDateRangeChange = selectedRange => {
    setDateState({
      dateRange: selectedRange,
    });

    dispatch(getPerformanceDetails(role, selectedRange));
  };

  const renderUserInfo = item => {
    return (
      <>
        <div style={{ display: 'flex' }}>
          <figure>
            <img
              style={{ width: '45px', marginRight: '20px' }}
              src={require(`../../../../static/img/avatar/profileImage.png`)}
              alt=""
            />
          </figure>
          <figcaption>
            <Heading className="user-name" as="h6">
              {item.user}
            </Heading>
            <div style={{ color: 'rgb(146, 153, 184)' }}>{formatCurrenyValue(item.annualSpread)}</div>
          </figcaption>{' '}
        </div>
      </>
    );
  };

  const tbColumnsSales = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      sorter: (a, b) => a.userName.localeCompare(b.userName),
      // render: (element, element2) => renderUserInfo(element, element2.annualSpread),
    },

    {
      title: 'Job Orders',
      dataIndex: 'jobOrders',
      key: 'jobOrders',
      sorter: (a, b) => sortValues(a, b, 'jobOrders'),
    },

    {
      title: 'Client Visits',
      dataIndex: 'clientVisits',
      key: 'clientVisits',
      sorter: (a, b) => sortValues(a, b, 'clientVisits'),
    },

    {
      title: 'Client Sendouts',
      dataIndex: 'clientSendOuts',
      key: 'clientSendOuts',
      sorter: (a, b) => sortValues(a, b, 'clientSendOuts'),
    },

    {
      title: 'Interviews',
      dataIndex: 'interviews',
      key: 'interviews',
      sorter: (a, b) => sortValues(a, b, 'interviews'),
    },

    {
      title: 'Placements',
      dataIndex: 'placements',
      key: 'placements',
      sorter: (a, b) => sortValues(a, b, 'placements'),
    },
    {
      title: 'Spread',
      dataIndex: 'spread',
      key: 'spread',
      sorter: (a, b) => parseFloat(a.spreadValue) - parseFloat(b.spreadValue),
      // render: value => (
      //   <span>
      //     <Tooltip title="Weekly Spread" placement="topLeft">
      //       {formatCurrenyValue(validatePreviousSpread(value))} {getTopPerformersSpreadPercentage(value)}
      //     </Tooltip>
      //   </span>
      // ),
    },
  ];

  const tbColumnsRecruiter = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      sorter: (a, b) => a.userName.localeCompare(b.userName),
      // render: (element, element2) => renderUserInfo(element, element2.annualSpread),
    },

    {
      title: 'Prescreens',
      dataIndex: 'prescreens',
      key: 'prescreens',
      sorter: (a, b) => sortValues(a, b, 'prescreens'),
    },

    {
      title: 'Customer Sendouts',
      dataIndex: 'customerSendOuts',
      key: 'customerSendOuts',
      sorter: (a, b) => sortValues(a, b, 'customerSendOuts'),
    },

    {
      title: 'Interviews',
      dataIndex: 'interviews',
      key: 'interviews',
      sorter: (a, b) => sortValues(a, b, 'interviews'),
    },

    {
      title: 'Placements',
      dataIndex: 'placements',
      key: 'placements',
      sorter: (a, b) => sortValues(a, b, 'placements'),
    },
    {
      title: 'Spread',
      dataIndex: 'spread',
      key: 'spread',
      sorter: (a, b) => parseFloat(a.spreadValue) - parseFloat(b.spreadValue),
      // render: value => (
      //   <span>
      //     {' '}
      //     {formatCurrenyValue(validatePreviousSpread(value))} {getTopPerformersSpreadPercentage(value)}
      //   </span>
      // ),
    },
  ];

  const getMappedData = () => {
    const mappedData =
      performersDetails &&
      performersDetails.map(item => {
        const { spreadDate } = item;
        return {
          ...item,
          userName: item.user,
          user: <div>{renderUserInfo(item)}</div>,
          spread: (
            <div>
              <Tooltip
                title={`Weekly Spread for ${moment(spreadDate.currentDate).format('MM/DD/YYYY')}`}
                placement="topLeft"
              >
                {formatCurrenyValue(validatePreviousSpread(item.spread))}
                {getTopPerformersSpreadPercentage(item.spread)}
              </Tooltip>
            </div>
          ),
          spreadValue: validatePreviousSpread(item.spread),
        };
      });
    return mappedData;
  };

  return (
    <Cards title="Users Performance" size="default">
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '20px' }}>
        <div className="card-nav">
          <ul>
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
        <div className="card-nav">
          <ul>
            <li className={dateRange === 'week' ? 'active' : 'deactivate'}>
              <Link onClick={() => handleDateRangeChange('week')} to="#">
                Week
              </Link>
            </li>
            <li className={dateRange === 'month' ? 'active' : 'deactivate'}>
              <Link onClick={() => handleDateRangeChange('month')} to="#">
                Month
              </Link>
            </li>
            <li className={dateRange === 'year' ? 'active' : 'deactivate'}>
              <Link onClick={() => handleDateRangeChange('year')} to="#">
                Year
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {isLoading ? (
        <div className="sd-spin">
          <Spin />
        </div>
      ) : (
        <div className="table-bordered table-responsive">
          <UserTableStyleWrapper>
            <Table
              columns={role === TOP_PERFORMERS_ROLE.SALES ? tbColumnsSales : tbColumnsRecruiter}
              dataSource={getMappedData() ? getMappedData() : []}
              pagination={{
                defaultPageSize: 10,
                total: (performersDetails && performersDetails.length) || 0,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              }}
            />
          </UserTableStyleWrapper>
        </div>
      )}
    </Cards>
  );
};

export default UsersPerformance;
