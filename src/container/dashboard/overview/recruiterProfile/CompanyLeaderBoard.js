import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Spin, TreeSelect } from 'antd';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { getCompanyLeaderboard, setCustomDateRange } from '../../../../redux/recruiterProfile/actionCreator';
import { CalendarButtonFilter } from '../../../../components/buttons/calendar-button/calendar-button-filter';
// const { Option } = Select;
const { TreeNode } = TreeSelect;

const compare = (a, b) => {
  const aValue = parseFloat(a.count);
  const bValue = parseFloat(b.count);
  if (aValue < bValue) {
    return 1;
  }
  if (aValue > bValue) {
    return -1;
  }
  return 0;
};

const CompanyLeaderBoard = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    dateRange: 'week',
    category: 'prescreens',
  });
  const { dateRange, category } = state;

  const { companyLBdata, companyLBdataLoading, customDateRange } = useSelector(rState => {
    return {
      companyLBdata: rState.recruiterProfile.companyLBdata,
      companyLBdataLoading: rState.recruiterProfile.companyLBdataLoading,
      customDateRange: rState.recruiterProfile.customDateRange,
    };
  });

  useEffect(() => {
    if (getCompanyLeaderboard) {
      dispatch(getCompanyLeaderboard('week', 'prescreens'));
    }
  }, [dispatch]);

  const handleDateRangeChange = selectedRange => {
    setState({
      category,
      dateRange: selectedRange,
    });

    dispatch(getCompanyLeaderboard(selectedRange, category));
  };

  const handleCustomDateChange = date => {
    setState({
      ...state,
      dateRange: 'custom',
    });
    dispatch(setCustomDateRange(date));
    dispatch(getCompanyLeaderboard('custom', category, date));
  };

  const handleCategoryChange = value => {
    setState({
      dateRange,
      category: value,
    });
    dispatch(getCompanyLeaderboard(dateRange, value, customDateRange));
  };

  const tbColumns = [
    {
      title: 'Name',
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: 'Total',
      dataIndex: 'count',
      key: 'count',
    },
  ];

  return (
    <Cards
      isbutton={
        <div className="card-nav">
          <ul>
            <li className={dateRange === 'today' ? 'active' : 'deactivate'}>
              <Link onClick={() => handleDateRangeChange('today')} to="#">
                Today
              </Link>
            </li>
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
            <li className={dateRange === 'custom' ? 'active' : 'deactivate'}>
              <CalendarButtonFilter key="1" dateRange={customDateRange} onChangeDate={handleCustomDateChange}>
                {' '}
                Custom
              </CalendarButtonFilter>
            </li>
          </ul>
        </div>
      }
      title="Leaderboard"
      size="default"
    >
      <TreeSelect
        onChange={handleCategoryChange}
        defaultValue="prescreens"
        style={{ width: '100%', maxWidth: '300px', marginBottom: '20px' }}
        treeDefaultExpandAll
      >
        <TreeNode value="prescreens" title="Prescreens" />
        <TreeNode value="recruiterClientSendouts" title="Sendout to Customer" />
        <TreeNode value="recruiterinterviews" title="Interviews" />
        <TreeNode value="recruiterplacements" title="Placements" />
        <TreeNode value="recruiterinterviewPlacementRatios" title="Placement/Interview Ratios" />
      </TreeSelect>
      {companyLBdataLoading ? (
        <div className="sd-spin">
          <Spin />
        </div>
      ) : (
        <div className="table-bordered table-responsive">
          {companyLBdata ? (
            <Table
              columns={tbColumns}
              dataSource={companyLBdata.sort(compare)}
              pagination={{
                defaultPageSize: 10,
                total: companyLBdata.length,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              }}
            />
          ) : null}
        </div>
      )}
    </Cards>
  );
};

export default CompanyLeaderBoard;
