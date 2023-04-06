import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Styled from 'styled-components';
import { Spin } from 'antd';
import moment from 'moment-timezone';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import Heading from '../../../../components/heading/heading';
import { ChartjsAreaChart } from '../../../../components/charts/chartjs';
import { performanceGetData } from '../../../../redux/chartContent/actionCreator';
import { customTooltips } from '../../../../components/utilities/utilities';
import { CalendarButtonFilter } from '../../../../components/buttons/calendar-button/calendar-button-filter';
import { getSalesPerformance, setSalesPerfCustomDateRange } from '../../../../redux/salesProfile/actionCreator';
import useWindowDimensions from '../../../../hooks/useWindowDimensions';

const SPCategory = Object.freeze({
  job_orders: 'Job Orders',
  client_visits: 'Client Visits',
  client_sendouts: 'Client Send Outs',
  interviews: 'Interviews',
  placements: 'Placements',
});

const categoryTabs = ['job_orders', 'client_visits', 'client_sendouts', 'interviews', 'placements'];

const SalesPerfChart = ({ user }) => {
  const { email } = user;
  const dispatch = useDispatch();
  const { salesPerfCustomDateRange, salesPerfDataLoading, salesPerfData } = useSelector(state => {
    return {
      salesPerfCustomDateRange: state.salesProfile.salesPerfCustomDateRange,
      salesPerfDataLoading: state.salesProfile.salesPerfDataLoading,
      salesPerfData: state.salesProfile.salesPerfData,
    };
  });

  const [state, setState] = useState({
    dateRange: 'week',
    categoryTab: categoryTabs[0],
  });
  const { dateRange, categoryTab } = state;

  const { isMobile } = useWindowDimensions;
  useEffect(() => {
    if (performanceGetData) {
      dispatch(performanceGetData());
    }
    if (getSalesPerformance && email) {
      dispatch(getSalesPerformance('week', categoryTabs[0], {}, email));
    }
  }, [dispatch, email]);

  const salesPerformanceDatasets = salesPerfData != null && [
    {
      data: [...salesPerfData[categoryTab].current],
      borderColor: '#5F63F2',
      borderWidth: 4,
      fill: true,
      // backgroundColor: () =>
      //   chartLinearGradient(document.getElementById('performance'), 300, {
      //     start: '#5F63F230',
      //     end: '#ffffff05',
      //   }),
      label: 'Current period',
      pointStyle: 'circle',
      pointRadius: '0',
      hoverRadius: '9',
      pointBorderColor: '#fff',
      pointBackgroundColor: '#5F63F2',
      hoverBorderWidth: 5,
    },
    {
      data: [...salesPerfData[categoryTab].previous],
      borderColor: '#C6D0DC',
      borderWidth: 2,
      fill: false,
      backgroundColor: '#00173750',
      label: 'Previous period',
      borderDash: [3, 3],
      pointRadius: '0',
      hoverRadius: '0',
    },
    // {
    //   data: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
    //   borderColor: '#f5222d',
    //   borderWidth: 2,
    //   fill: false,
    //   backgroundColor: '#f5222d',
    //   label: 'Expected',
    //   borderDash: [3, 3],
    //   pointRadius: '0',
    //   hoverRadius: '0',
    // },
  ];

  // if (salesPerfData != null) {
  // }

  const onCategoryTabChange = value => {
    setState({
      ...state,
      categoryTab: value,
    });
    if (state.dateRange === 'custom')
      dispatch(getSalesPerformance(state.dateRange, value, salesPerfCustomDateRange, email));
    // dispatch(getSalesPerformance(state.dateRange, value, salesPerfCustomDateRange));
  };

  const onDateRangeChange = value => {
    setState({
      ...state,
      dateRange: value,
    });
    dispatch(getSalesPerformance(value, categoryTab, salesPerfCustomDateRange, email));
  };

  const handleCustomDateChange = date => {
    const { startDate, endDate } = date;
    if (startDate !== endDate) {
      setState({
        ...state,
        dateRange: 'custom',
      });
      dispatch(setSalesPerfCustomDateRange(date));
      dispatch(getSalesPerformance('custom', categoryTab, date, email));
    }
  };

  return (
    <>
      {salesPerfData != null && (
        <Cards
          isbutton={
            <div className="card-nav">
              <ul>
                <li className={dateRange === 'week' ? 'active' : 'deactivate'}>
                  <Link onClick={() => onDateRangeChange('week')} to="#">
                    Week
                  </Link>
                </li>
                <li className={dateRange === 'month' ? 'active' : 'deactivate'}>
                  <Link onClick={() => onDateRangeChange('month')} to="#">
                    Month
                  </Link>
                </li>
                <li className={dateRange === 'year' ? 'active' : 'deactivate'}>
                  <Link onClick={() => onDateRangeChange('year')} to="#">
                    Year
                  </Link>
                </li>
                <li className={dateRange === 'custom' ? 'active' : 'deactivate'}>
                  <CalendarButtonFilter
                    key="salesPerfCustomDateRange"
                    dateRange={salesPerfCustomDateRange}
                    onChangeDate={handleCustomDateChange}
                  >
                    Custom
                  </CalendarButtonFilter>
                </li>
              </ul>
            </div>
          }
          title="Sales Performance"
          size="default"
          style={{ height: !isMobile ? 'auto' : undefined }}
        >
          <SalesPstates>
            <div
              onClick={() => onCategoryTabChange(categoryTabs[0])}
              className={`${
                salesPerfData[categoryTabs[0]].diffRatio < 0 ? 'growth-downward' : 'growth-upward'
              } ${categoryTab === categoryTabs[0] && 'active'}`}
              role="button"
              onKeyPress={() => {}}
              tabIndex="0"
            >
              <p>Job Orders</p>
              <Heading as="h5">
                {salesPerfData[categoryTabs[0]].currentSum}
                <sub>
                  <span>
                    <FeatherIcon
                      icon={`${salesPerfData[categoryTabs[0]].diffRatio < 0 ? 'arrow-down' : 'arrow-up'}`}
                      size={14}
                    />{' '}
                    {Math.abs(salesPerfData[categoryTabs[0]].diffRatio)}
                  </span>
                </sub>
              </Heading>
            </div>
            <div
              onClick={() => onCategoryTabChange(categoryTabs[1])}
              className={`${
                salesPerfData[categoryTabs[1]].diffRatio < 0 ? 'growth-downward' : 'growth-upward'
              } ${categoryTab === categoryTabs[1] && 'active'}`}
              role="button"
              onKeyPress={() => {}}
              tabIndex="0"
            >
              <p>Client Visits</p>
              <Heading as="h5">
                {salesPerfData[categoryTabs[1]].currentSum}
                <sub>
                  <span>
                    <FeatherIcon
                      icon={`${salesPerfData[categoryTabs[1]].diffRatio < 0 ? 'arrow-down' : 'arrow-up'}`}
                      size={14}
                    />{' '}
                    {Math.abs(salesPerfData[categoryTabs[1]].diffRatio)}
                  </span>
                </sub>
              </Heading>
            </div>
            <div
              onClick={() => onCategoryTabChange(categoryTabs[2])}
              className={`${
                salesPerfData[categoryTabs[2]].diffRatio < 0 ? 'growth-downward' : 'growth-upward'
              } ${categoryTab === categoryTabs[2] && 'active'}`}
              role="button"
              onKeyPress={() => {}}
              tabIndex="0"
            >
              <p>Client Send Outs</p>
              <Heading as="h5">
                {salesPerfData[categoryTabs[2]].currentSum}
                <sub>
                  <span>
                    <FeatherIcon
                      icon={`${salesPerfData[categoryTabs[2]].diffRatio < 0 ? 'arrow-down' : 'arrow-up'}`}
                      size={14}
                    />{' '}
                    {Math.abs(salesPerfData[categoryTabs[2]].diffRatio)}
                  </span>
                </sub>
              </Heading>
            </div>
            <div
              onClick={() => onCategoryTabChange(categoryTabs[3])}
              className={`${
                salesPerfData[categoryTabs[3]].diffRatio < 0 ? 'growth-downward' : 'growth-upward'
              } ${categoryTab === categoryTabs[3] && 'active'}`}
              role="button"
              onKeyPress={() => {}}
              tabIndex="0"
            >
              <p>Interviews</p>
              <Heading as="h5">
                {salesPerfData[categoryTabs[3]].currentSum}
                <sub>
                  <span>
                    <FeatherIcon
                      icon={`${salesPerfData[categoryTabs[3]].diffRatio < 0 ? 'arrow-down' : 'arrow-up'}`}
                      size={14}
                    />{' '}
                    {Math.abs(salesPerfData[categoryTabs[3]].diffRatio)}
                  </span>
                </sub>
              </Heading>
            </div>
            <div
              onClick={() => onCategoryTabChange(categoryTabs[4])}
              className={`${
                salesPerfData[categoryTabs[4]].diffRatio < 0 ? 'growth-downward' : 'growth-upward'
              } ${categoryTab === categoryTabs[4] && 'active'}`}
              role="button"
              onKeyPress={() => {}}
              tabIndex="0"
            >
              <p>Placements</p>
              <Heading as="h5">
                {salesPerfData[categoryTabs[4]].currentSum}
                <sub>
                  <span>
                    <FeatherIcon
                      icon={`${salesPerfData[categoryTabs[4]].diffRatio < 0 ? 'arrow-down' : 'arrow-up'}`}
                      size={14}
                    />{' '}
                    {Math.abs(salesPerfData[categoryTabs[4]].diffRatio)}
                  </span>
                </sub>
              </Heading>
            </div>
          </SalesPstates>

          <div className="performance-lineChart">
            {salesPerfDataLoading ? (
              <div className="sd-spin">
                <Spin />
              </div>
            ) : (
              <ChartjsAreaChart
                id="salesperformance"
                labels={salesPerfData.labels}
                datasets={salesPerformanceDatasets}
                options={{
                  maintainAspectRatio: true,
                  elements: {
                    z: 9999,
                  },
                  legend: {
                    display: false,
                  },
                  hover: {
                    mode: 'index',
                    intersect: false,
                  },
                  tooltips: {
                    mode: 'label',
                    intersect: false,
                    backgroundColor: '#ffffff',
                    position: 'average',
                    enabled: false,
                    custom: customTooltips,
                    callbacks: {
                      title() {
                        return SPCategory[categoryTab];
                      },
                      label(t, d) {
                        const { yLabel, datasetIndex } = t;
                        return `<span class="chart-data">${yLabel}</span> <span class="data-label">${d.datasets[datasetIndex].label}</span>`;
                      },
                    },
                  },
                  scales: {
                    yAxes: [
                      {
                        gridLines: {
                          color: '#e5e9f2',
                          borderDash: [3, 3],
                          zeroLineColor: '#e5e9f2',
                          zeroLineWidth: 1,
                          zeroLineBorderDash: [3, 3],
                        },
                        ticks: {
                          beginAtZero: true,
                          fontSize: 13,
                          fontColor: '#182b49',
                          stepSize: 20,
                          callback(label) {
                            return `${label}`;
                          },
                        },
                      },
                    ],
                    xAxes: [
                      {
                        gridLines: {
                          display: true,
                          zeroLineWidth: 2,
                          zeroLineColor: 'transparent',
                          color: 'transparent',
                          z: 1,
                          tickMarkLength: 0,
                        },
                        ticks: {
                          padding: 10,
                          callback(label) {
                            if (dateRange === 'custom') {
                              return `${moment(label).format('MMM	Do YYYY')}`;
                            }
                            return label;
                          },
                        },
                      },
                    ],
                  },
                }}
                height={window.innerWidth <= 575 ? 200 : 86}
              />
            )}
            <ul>
              {salesPerformanceDatasets &&
                salesPerformanceDatasets.map((item, index) => {
                  return (
                    <li key={index + 1} className="custom-label">
                      <span
                        style={{
                          backgroundColor: item.borderColor,
                        }}
                      />
                      {item.label}
                    </li>
                  );
                })}
            </ul>
          </div>
        </Cards>
      )}
    </>
  );
};

SalesPerfChart.propTypes = {
  user: PropTypes.object,
};

export default SalesPerfChart;

const SalesPstates = Styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: -24px 0 25px;
    @media only screen and (max-width: 767px){
        margin: -19px 0 25px;
        flex-flow: column;
    }
    >div{
        transition: 0.3s ease;
        padding: 20px;
        @media only screen and (max-width: 1599px){
            flex: 0 0 50%;
        }
        &:hover{
            box-shadow: 0 15px 30px rgba(146,153,184,0.15);
            p{
                // font-weight: 500;
                color: ${({ theme }) => theme['primary-color']};
            }
        }
        &.active{
            background: ${({ theme }) => theme['bg-color-light']};
            &:hover{
                box-shadow: 0 15px 30px #fff;
            }
        }
    }
    .growth-upward,
    .growth-downward{
        cursor: pointer;
        &:focus{
            outline: none
        }
        h1{
            font-size: 14px;
            sub{
              font-size: 12px;
                span{
                    font-weight: 500;
                }
            }
        }
    }
`;
