import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Spin, Input, Button, Space, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { setHiringRevenueCustomDateRange, getHiringRevenue } from '../../../../redux/companyOverview/actionCreator';
import { CalendarButtonFilter } from '../../../../components/buttons/calendar-button/calendar-button-filter';
import { getRevenuePercentage } from '../../../../utility/sales-recruiterUtils';
import { formatCurrenyValue } from '../../../../utility/utility';

let searchInput = null;

const RevenueByHiringManager = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    dateRange: 'week',
    searchText: '',
    searchedColumn: '',
  });
  const { dateRange } = state;

  const { hiringRevenueDataLoading, hiringRevenueData, hiringRevenueCustomDateRange } = useSelector(rState => {
    return {
      hiringRevenueDataLoading: rState.companyOverview.hiringRevenueDataLoading,
      hiringRevenueData: rState.companyOverview.hiringRevenueData,
      hiringRevenueCustomDateRange: rState.companyOverview.hiringRevenueCustomDateRange,
    };
  });

  useEffect(() => {
    if (getHiringRevenue) {
      dispatch(getHiringRevenue('week'));
    }
  }, [dispatch]);

  const shouldPercentageDisplay = () => {
    return state.dateRange === 'week' || state.dateRange === 'month';
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

  const handleDateRangeChange = selectedRange => {
    setState({
      dateRange: selectedRange,
    });

    dispatch(getHiringRevenue(selectedRange));
  };

  const handleCustomDateChange = date => {
    setState({
      ...state,
      dateRange: 'custom',
    });
    dispatch(setHiringRevenueCustomDateRange(date));
    dispatch(getHiringRevenue('custom', date));
  };

  const dataSource = [];

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
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
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: text => {
      return text;
      // return searchedColumn === dataIndex ? (
      //   <Highlighter
      //     highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
      //     searchWords={[searchText]}
      //     autoEscape
      //     textToHighlight={text ? text.toString() : ''}
      //   />
      // ) : (
      //   text
      // )
    },
  });

  if (hiringRevenueData) {
    hiringRevenueData.map((ce, index) => {
      const sum = formatCurrenyValue(ce.sum);
      return dataSource.push({
        key: index,
        nameText: ce.name,
        name: (
          <div>
            {ce.name}
            <br />
            <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>{ce.company}</span>
          </div>
        ),
        sum: (
          <div>
            <Tooltip title={`Spread for ${moment(+ce.spreadDate).format('MM/DD/YYYY')}`} placement="topLeft">
              {sum} <br />
              {shouldPercentageDisplay() ? (
                <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>{getRevenuePercentage(ce.prevSum, ce.sum)} </span>
              ) : (
                undefined
              )}
            </Tooltip>
          </div>
        ),
        sumNum: ce.sum,
      });
    });
  }

  const tbColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('nameText'),
      sorter: (a, b) => a.nameText.localeCompare(b.nameText),
    },
    {
      title: 'Total',
      dataIndex: 'sum',
      key: 'sum',

      sorter: (a, b) => parseFloat(a.sumNum) - parseFloat(b.sumNum),
    },
  ];

  return (
    <Cards
      isbutton={
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
            <li className={dateRange === 'custom' ? 'active' : 'deactivate'}>
              <CalendarButtonFilter
                key="1"
                dateRange={hiringRevenueCustomDateRange}
                onChangeDate={handleCustomDateChange}
              >
                Custom
              </CalendarButtonFilter>
            </li>
          </ul>
        </div>
      }
      title="Spread by Hiring Manager"
      size="default"
    >
      {hiringRevenueDataLoading ? (
        <div className="sd-spin">
          <Spin />
        </div>
      ) : (
        <div className="table-bordered table-responsive">
          {hiringRevenueData ? (
            <Table
              columns={tbColumns}
              dataSource={dataSource}
              pagination={{
                defaultPageSize: 10,
                total: dataSource.length,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              }}
            />
          ) : null}
        </div>
      )}
    </Cards>
  );
};

export default RevenueByHiringManager;
