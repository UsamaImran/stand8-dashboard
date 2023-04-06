import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Spin, TreeSelect } from 'antd';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { getCompanyLeaderboard, setCustomDateRange } from '../../../../redux/companyOverview/actionCreator';
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
    category: 'jobOrders',
  });
  const { dateRange, category } = state;

  const { companyLBdata, companyLBdataLoading, customDateRange } = useSelector(rState => {
    return {
      companyLBdata: rState.companyOverview.companyLBdata,
      companyLBdataLoading: rState.companyOverview.companyLBdataLoading,
      customDateRange: rState.companyOverview.customDateRange,
    };
  });

  useEffect(() => {
    // if (getCompanyLeaderboard) {
    dispatch(getCompanyLeaderboard('week', 'jobOrders', null, {}));
    // }
  }, [dispatch]);

  const handleDateRangeChange = selectedRange => {
    setState({
      category,
      dateRange: selectedRange,
    });

    dispatch(getCompanyLeaderboard(selectedRange, category, null, {}));
  };

  const handleCustomDateChange = date => {
    setState({
      ...state,
      dateRange: 'custom',
    });
    dispatch(setCustomDateRange(date));
    dispatch(getCompanyLeaderboard('custom', category, date, {}));
  };

  const handleCategoryChange = value => {
    setState({
      dateRange,
      category: value,
    });
    dispatch(getCompanyLeaderboard(dateRange, value, customDateRange, {}));
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

  const tableDataSource = useMemo(
    () =>
      companyLBdata
        ?.map((item, index) => {
          return [
            {
              key: index,
              ...item,
            },
          ];
        })
        .flat(),
    [companyLBdata],
  );

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
      title="Company Leaderboard"
      size="default"
    >
      {/* <Select onChange={handleCategoryChange} defaultValue={"jobOrders"} style={{ width: "100%", maxWidth: "300px", marginBottom: "20px" }}>
        <Option value={"jobOrders"}>Job Orders</Option>
        <Option value={"clientVisits"}>Client Visits</Option>
        <Option value={"clientSendouts"}>Client Sendouts</Option>
        <Option value={"interviews"}>Interviews</Option>
        <Option value={"placements"}>Placements </Option>
        <Option value={"prescreens"}>Prescreens </Option>
        <Option value={"interviewPlacementRatios"}>Placement/Interview Ratios</Option>
        <Option value={"calling"}>Calling </Option>
        <Option value={"texting"}>Texting </Option>
      </Select> */}

      <TreeSelect
        onChange={handleCategoryChange}
        defaultValue="jobOrders"
        style={{ width: '100%', maxWidth: '300px', marginBottom: '20px' }}
        treeDefaultExpandAll
      >
        {/* <TreeNode value="clientSendouts" title="Client Sendouts" /> */}
        <TreeNode value="sales" title="Sales" selectable={false}>
          <TreeNode value="jobOrders" title="Job Orders" />
          <TreeNode value="clientVisits" title="Client Visits" />
          <TreeNode value="salesClientSendouts" title="Client Sendouts" />
          <TreeNode value="salesinterviews" title="Interviews" />
          <TreeNode value="salesplacements" title="Placements" />
          <TreeNode value="salesinterviewPlacementRatios" title="Placement/Interview Ratios" />
        </TreeNode>
        <TreeNode value="recruiter" title="Recruiter" selectable={false}>
          <TreeNode value="prescreens" title="Prescreens" />
          <TreeNode value="recruiterClientSendouts" title="Client Sendouts" />
          <TreeNode value="recruiterinterviews" title="Interviews" />
          <TreeNode value="recruiterplacements" title="Placements" />
          <TreeNode value="recruiterinterviewPlacementRatios" title="Placement/Interview Ratios" />
        </TreeNode>
        <TreeNode value="calling" title="Calling" />
        <TreeNode value="texting" title="Texting" />
      </TreeSelect>
      {/* <Form>
        <Form.Item initialValue={"jobOrders"} label="Categories">
        </Form.Item>
      </Form> */}
      {companyLBdataLoading ? (
        <div className="sd-spin">
          <Spin />
        </div>
      ) : (
        <div className="table-bordered table-responsive">
          {companyLBdata ? (
            <Table
              columns={tbColumns}
              dataSource={tableDataSource.sort(compare)}
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
