import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { PerformanceChartWrapper, Pstates } from '../../style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import Heading from '../../../../components/heading/heading';
import { ChartjsAreaChart } from '../../../../components/charts/chartjs';
import { chartLinearGradient, customTooltips } from '../../../../components/utilities/utilities';
import { performanceFilterData, performanceGetData, setIsLoading } from '../../../../redux/salesTextUs/actionCreator';

const getValueInPercentage = value => {
  if (value === 'N/A') {
    return `${value}%`;
  }
  return `${!value || value === 'NaN' ? '0' : Math.abs(value)}%`;
};

const CompanyWide = ({ user }) => {
  const dispatch = useDispatch();
  const { email } = user;

  const { performanceState, preIsLoading, authUser } = useSelector(state => {
    return {
      performanceState: state.salesTextUs.performanceData,
      preIsLoading: state.salesTextUs.perLoading,
      authUser: state.auth.user,
    };
  });

  const [state, setState] = useState({
    performance: 'week',
    performanceTab: 'users',
  });

  const { performance, performanceTab } = state;

  useEffect(() => {
    if (performanceGetData && email) {
      dispatch(performanceGetData(email));
    }
  }, [dispatch, email]);

  const handleActiveChangePerformance = value => {
    setState({
      ...state,
      performance: value,
    });
    dispatch(performanceFilterData(value, user ? email : authUser.email));
  };

  const onPerformanceTab = value => {
    setState({
      ...state,
      performanceTab: value,
    });
    return dispatch(setIsLoading());
  };

  const performanceDatasets = performanceState !== null && [
    {
      data: performanceState[performanceTab][1],
      borderColor: '#5F63F2',
      borderWidth: 4,
      fill: true,
      backgroundColor: () =>
        chartLinearGradient(document.getElementById('performance'), 300, {
          start: '#5F63F230',
          end: '#ffffff05',
        }),
      label: 'Current period',
      pointStyle: 'circle',
      pointRadius: '0',
      hoverRadius: '9',
      pointBorderColor: '#fff',
      pointBackgroundColor: '#5F63F2',
      hoverBorderWidth: 5,
    },
    {
      data: performanceState[performanceTab][2],
      borderColor: '#C6D0DC',
      borderWidth: 2,
      fill: false,
      backgroundColor: '#00173750',
      label: 'Previous period',
      borderDash: [3, 3],
      pointRadius: '0',
      hoverRadius: '0',
    },
  ];

  let userPercent;
  let sessionsPercent;
  let bouncePercent;
  let durationPercent;

  if (
    performanceState !== null &&
    performanceState.users[3] === 0 &&
    performanceState.users[0] !== performanceState.users[3]
  ) {
    userPercent = 'N/A';
  } else {
    userPercent =
      performanceState !== null &&
      ((performanceState.users[0].toFixed(2) / performanceState.users[3].toFixed(2)) * 100 - 100).toFixed(0);
  }

  if (
    performanceState !== null &&
    performanceState.sessions[3] === 0 &&
    performanceState.sessions[0] !== performanceState.sessions[3]
  ) {
    sessionsPercent = 'N/A';
  } else {
    sessionsPercent =
      performanceState !== null &&
      ((performanceState.sessions[0].toFixed(2) / performanceState.sessions[3].toFixed(2)) * 100 - 100).toFixed(0);
  }

  if (
    performanceState !== null &&
    performanceState.bounce[3] === 0 &&
    performanceState.bounce[0] !== performanceState.bounce[3]
  ) {
    bouncePercent = 'N/A';
  } else {
    bouncePercent =
      performanceState !== null &&
      ((performanceState.bounce[0].toFixed(2) / performanceState.bounce[3].toFixed(2)) * 100 - 100).toFixed(0);
  }

  if (
    performanceState !== null &&
    performanceState.duration[3] === 0 &&
    performanceState.duration[0] !== performanceState.duration[3]
  ) {
    durationPercent = 'N/A';
  } else {
    durationPercent =
      performanceState !== null &&
      ((performanceState.duration[0].toFixed(2) / performanceState.duration[3].toFixed(2)) * 100 - 100).toFixed(0);
  }

  return (
    <PerformanceChartWrapper>
      {performanceState !== null && (
        <Cards
          style={{ height: '100%' }}
          isbutton={
            <div className="card-nav">
              <ul>
                <li className={performance === 'week' ? 'active' : 'deactivate'}>
                  <Link onClick={() => handleActiveChangePerformance('week')} to="#">
                    Week
                  </Link>
                </li>
                <li className={performance === 'month' ? 'active' : 'deactivate'}>
                  <Link onClick={() => handleActiveChangePerformance('month')} to="#">
                    Month
                  </Link>
                </li>
                <li className={performance === 'year' ? 'active' : 'deactivate'}>
                  <Link onClick={() => handleActiveChangePerformance('year')} to="#">
                    Year
                  </Link>
                </li>
              </ul>
            </div>
          }
          title="Recruiter Overview"
          size="large"
        >
          <Pstates>
            <div
              onClick={() => onPerformanceTab('users')}
              className={`${userPercent < 0 ? 'growth-downward' : 'growth-upward'} ${performanceTab === 'users' &&
                'active'}`}
              role="button"
              onKeyPress={() => {}}
              tabIndex="0"
            >
              <p>Delivered</p>
              <Heading as="h1">
                {performanceState.users[0]}
                <sub>
                  <span>
                    <FeatherIcon icon={`${userPercent < 0 ? 'arrow-down' : 'arrow-up'}`} size={14} />{' '}
                    {getValueInPercentage(userPercent)}
                  </span>
                </sub>
              </Heading>
            </div>
            <div
              onClick={() => onPerformanceTab('sessions')}
              className={`${sessionsPercent < 0 ? 'growth-downward' : 'growth-upward'} ${performanceTab ===
                'sessions' && 'active'}`}
              role="button"
              onKeyPress={() => {}}
              tabIndex="0"
            >
              <p>Received</p>
              <Heading as="h1">
                {performanceState.sessions[0]}
                <sub>
                  <span>
                    <FeatherIcon icon={`${userPercent < 0 ? 'arrow-down' : 'arrow-up'}`} size={14} />{' '}
                    {getValueInPercentage(sessionsPercent)}
                  </span>
                </sub>
              </Heading>
            </div>
            <div
              onClick={() => onPerformanceTab('bounce')}
              className={`${bouncePercent < 0 ? 'growth-downward' : 'growth-upward'} ${performanceTab === 'bounce' &&
                'active'}`}
              role="button"
              onKeyPress={() => {}}
              tabIndex="0"
            >
              <p>Active Conversations</p>
              <Heading as="h1">
                {performanceState.bounce[0]}
                <sub>
                  <span>
                    <FeatherIcon icon={`${userPercent < 0 ? 'arrow-down' : 'arrow-up'}`} size={14} />{' '}
                    {getValueInPercentage(bouncePercent)}
                  </span>
                </sub>
              </Heading>
            </div>
            <div
              onClick={() => onPerformanceTab('duration')}
              className={`${durationPercent < 0 ? 'growth-downward' : 'growth-upward'} ${performanceTab ===
                'duration' && 'active'}`}
              role="button"
              onKeyPress={() => {}}
              tabIndex="0"
            >
              <p>Total Response Rate</p>
              <Heading as="h1">
                {performanceState.duration[0].toFixed(1)}
                <sub>
                  <span>
                    <FeatherIcon icon={`${userPercent < 0 ? 'arrow-down' : 'arrow-up'}`} size={14} />{' '}
                    {getValueInPercentage(durationPercent)}
                  </span>
                </sub>
              </Heading>
            </div>
          </Pstates>
          {preIsLoading ? (
            <div className="sd-spin">
              <Spin />
            </div>
          ) : (
            <div className="performance-lineChart">
              <ChartjsAreaChart
                id="performance"
                labels={performanceState.labels}
                datasets={performanceDatasets}
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
                        return performanceTab;
                      },
                      label(t, d) {
                        const { yLabel, datasetIndex } = t;
                        return `<span class="chart-data">${yLabel.toFixed(2)}</span> <span class="data-label">${
                          d.datasets[datasetIndex].label
                        }</span>`;
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
                          max: Math.ceil(
                            Math.max(
                              Math.max(...performanceState[performanceTab][1]),
                              Math.max(...performanceState[performanceTab][2]),
                            ),
                          ),
                          stepSize: 1000,
                          callback(label) {
                            return label;
                            // if (label / 1000 == 0) {
                            //   return label;
                            // } else {
                            //   return `${label / 1000}k`;
                            // }
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
                        },
                      },
                    ],
                  },
                }}
                height={window.innerWidth <= 575 ? 200 : 86}
              />
              <ul>
                {performanceDatasets &&
                  performanceDatasets.map((item, index) => {
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
          )}
        </Cards>
      )}
    </PerformanceChartWrapper>
  );
};

CompanyWide.propTypes = {
  user: PropTypes.object,
};

export default CompanyWide;
