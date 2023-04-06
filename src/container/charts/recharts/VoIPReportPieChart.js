import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { voipPieChartGetData, voipPieChartFilterData } from '../../../redux/VoIPPieChart/actionCreator';

const VoIPReportPieChart = props => {
  const { options, height } = props;
  const username = null;
  const dispatch = useDispatch();
  const { voipPieChartData, isLoading } = useSelector(state => {
    return {
      voipPieChartData: state.voipPieChartReducer.voipPieChartData,
      isLoading: state.voipPieChartReducer.pcLoading,
      authUser: state.auth.user,
    };
  });

  useEffect(() => {
    if (voipPieChartGetData) {
      dispatch(voipPieChartGetData(username));
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
  const [state, setState] = useState({
    activeIndex: 0,
    tabActive: 'today',
  });

  useEffect(() => {
    if (voipPieChartData) {
      setPieChartData({
        labels: ['Inbound', 'Outbound'],
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
            {' '}
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
        {isLoading ? (
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
                  Inbound <span>{pieChartData?.datasets[0]?.data[0]}</span>
                </div>
              </div>
              <div className="session-single">
                <div className="chart-label">
                  <span className="label-dot dot-outbound" />
                  Outbound
                  <span>{pieChartData?.datasets[0]?.data[1]}</span>
                </div>
              </div>
            </SessionState>{' '}
          </>
        )}
      </Cards>
    </>
  );
};

VoIPReportPieChart.defaultProps = {
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

VoIPReportPieChart.propTypes = {
  height: PropTypes.number,
  options: PropTypes.object,
};

export default VoIPReportPieChart;

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
