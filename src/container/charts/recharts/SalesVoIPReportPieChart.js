import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { voipPieChartFilterData } from '../../../redux/VoIPPieChart/actionCreator';

const SalesVoIPReportPieChart = ({ options, height, user }) => {
  const dispatch = useDispatch();
  const { username } = user;
  const { voipPieChartData, pcLoading } = useSelector(state => {
    return {
      voipPieChartData: state.voipPieChartReducer.voipPieChartData,
      pcLoading: state.voipPieChartReducer.pcLoading,
    };
  });

  const [state, setState] = useState({
    activeIndex: 0,
    tabActive: 'today',
  });

  useEffect(() => {
    if (voipPieChartFilterData) {
      dispatch(voipPieChartFilterData('today', username));
    }
  }, [dispatch, username]);

  const [pieChartData, setPieChartData] = useState({
    labels: ['Inbound', 'Outbound'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#5F63F2', '#FF4D4F'],
      },
    ],
  });

  useEffect(() => {
    if (voipPieChartData) {
      setPieChartData({
        datasets: [
          {
            data: [voipPieChartData?.inboundCount, voipPieChartData?.outboundCount],
            backgroundColor: ['#5F63F2', '#FF4D4F'],
          },
        ],
      });
    }
  }, [voipPieChartData]);

  const handleActiveChange = value => {
    setState({
      ...state,
      tabActive: value,
    });
    dispatch(voipPieChartFilterData(value, username));
  };

  return (
    <>
      <Cards
        title="Inbound Vs Outbound"
        size="large"
        isbutton={
          <div className="card-nav">
            <ul>
              <li className={state.tabActive === 'today' ? 'active' : 'deactivate'}>
                <Link onClick={() => handleActiveChange('today')} to="#">
                  Today
                </Link>
              </li>
              <li className={state.tabActive === 'yesterday' ? 'active' : 'deactivate'}>
                <Link onClick={() => handleActiveChange('yesterday')} to="#">
                  Yesterday
                </Link>
              </li>
              <li className={state.tabActive === 'week' ? 'active' : 'deactivate'}>
                <Link onClick={() => handleActiveChange('week')} to="#">
                  Week
                </Link>
              </li>
              <li className={state.tabActive === 'month' ? 'active' : 'deactivate'}>
                <Link onClick={() => handleActiveChange('month')} to="#">
                  Month
                </Link>
              </li>
              <li className={state.tabActive === 'year' ? 'active' : 'deactivate'}>
                <Link onClick={() => handleActiveChange('year')} to="#">
                  Year
                </Link>
              </li>
            </ul>
          </div>
        }
      >
        {pcLoading ? (
          <div className="sd-spin">
            <Spin />
          </div>
        ) : (
          <>
            <Pie data={pieChartData} height={height} options={options} />
            <SessionState className="session-wrap d-flex justify-content-center">
              <div className="session-single">
                <div className="chart-label">
                  <span className="label-dot dot-inbound" />
                  Inbound
                  <span>{pieChartData?.datasets[0]?.data[0]}</span>
                </div>
              </div>
              <div className="session-single">
                <div className="chart-label">
                  <span className="label-dot dot-outbound" />
                  Outbound
                  <span>{pieChartData?.datasets[0]?.data[1]}</span>
                </div>
              </div>
            </SessionState>
          </>
        )}
      </Cards>
    </>
  );
};

SalesVoIPReportPieChart.defaultProps = {
  height: 150,
  options: {
    maintainAspectRatio: true,
    responsive: true,
    legend: {
      display: false,
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  },
};

SalesVoIPReportPieChart.propTypes = {
  height: PropTypes.number,
  options: PropTypes.object,
  user: PropTypes.object,
};

export default SalesVoIPReportPieChart;

const SessionState = styled.div`
  max-width: 365px;
  margin: 42px auto auto;
  justify-content: 'space-around';
  > div {
    width: 33.33%;
    text-align: center;
    span {
      font-size: 18px;
      font-weight: 600;
      display: inline-block;
      @media only screen and (max-width: 1300px) {
        display: block;
      }
      @media only screen and (max-width: 1199px) {
        display: inline-block;
      }
      @media only screen and (max-width: 379px) {
        display: block;
      }
    }
    sub {
      bottom: 0;
      ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 5px;
      font-size: 13px;
      color: ${({ theme }) => theme['light-gray-color']};
    }
    .dot-inbound {
      background: #5f63f2;
    }
    .dot-outbound {
      background: #ff4d4f;
    }
  }

  .session-single {
    text-align: center;
    width: max-content;
    padding-right: 20px;
  }
`;
