import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Select, Spin } from 'antd';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { getCompanyLeaderboard, setCustomDateRange } from '../../../../redux/companyOverview/actionCreator';

import { CalendarButtonFilter } from '../../../../components/buttons/calendar-button/calendar-button-filter';

const { Option } = Select;

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
    category: 'jobOrders',
  });
  const { dateRange, category } = state;

  const { companyLBdata, isLoading, customDateRange } = useSelector(rState => {
    return {
      companyLBdata: rState.companyOverview.companyLBdata,
      isLoading: rState.companyOverview.companyLBdataLoading,
      customDateRange: rState.companyOverview.customDateRange,
    };
  });

  useEffect(() => {
    // if (getCompanyLeaderboard) {
    dispatch(getCompanyLeaderboard('week', 'jobOrders', null, { isSales: true }));
    // }
  }, [dispatch]);

  const handleDateRangeChange = selectedRange => {
    setState({
      category,
      dateRange: selectedRange,
    });

    dispatch(getCompanyLeaderboard(selectedRange, category, null, { isSales: true }));
  };

  const handleCustomDateChange = date => {
    setState({
      ...state,
      dateRange: 'custom',
    });

    dispatch(setCustomDateRange(date));
    dispatch(getCompanyLeaderboard('custom', category, date, { isSales: true }));
  };

  const handleCategoryChange = value => {
    setState({
      dateRange,
      category: value,
    });
    dispatch(getCompanyLeaderboard(dateRange, value, customDateRange, { isSales: true }));
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
                Custom
              </CalendarButtonFilter>
            </li>
          </ul>
        </div>
      }
      title="Leaderboard"
      size="default"
    >
      <Select
        onChange={handleCategoryChange}
        defaultValue="jobOrders"
        style={{ width: '100%', maxWidth: '300px', marginBottom: '20px' }}
      >
        <Option value="jobOrders">Job Orders</Option>
        <Option value="clientVisits">Client Visits</Option>
        <Option value="salesClientSendouts">Client Sendouts</Option>
        <Option value="salesinterviews">Interviews</Option>
        <Option value="salesplacements">Placements </Option>
        {/* <Option value={'prescreens'}>Prescreens </Option> */}
        <Option value="salesinterviewPlacementRatios">Interview/Placement Ratios</Option>
        {/* <Option value={'calling'}>Calling </Option> */}
        {/* <Option value={'texting'}>Texting </Option> */}
      </Select>
      {/* <Form>
        <Form.Item initialValue={"jobOrders"} label="Categories">
        </Form.Item>
      </Form> */}
      {isLoading ? (
        <div className="sd-spin">
          <Spin />
        </div>
      ) : (
        <div className="table-responsive">
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
