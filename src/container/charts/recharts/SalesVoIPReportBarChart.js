import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import Styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { ChartjsBarChartTransparent } from '../../../components/charts/chartjs';
import { voipBarChartGetData, voipBarChartFilterData } from '../../../redux/VoIPPieChart/actionCreator';

const SalesVoIPReportBarChart = ({ user }) => {
  const dispatch = useDispatch();
  const { username } = user;
  const { voipBarChartDataState, bcLoading } = useSelector(state => {
    return {
      voipBarChartDataState: state.voipPieChartReducer.voipBarChartData,
      bcLoading: state.voipPieChartReducer.bcLoading,
    };
  });

  const [state, setState] = useState({
    tabActive: 'today',
  });

  useEffect(() => {
    if (voipBarChartGetData) {
      // dispatch(voipBarChartGetData(username));
      dispatch(voipBarChartFilterData('today', username));
    }
  }, [dispatch, username]);

  const voipBarChartDatasets = [
    {
      data: voipBarChartDataState?.inbound,
      backgroundColor: '#5F63F280',
      hoverBackgroundColor: '#5F63F2',
      label: 'Inbound',
      maxBarThickness: 10,
      barThickness: 12,
    },
    {
      data: voipBarChartDataState?.outbound,
      backgroundColor: '#FF4D4F80',
      hoverBackgroundColor: '#FF4D4F',
      label: 'Outbound',
      maxBarThickness: 10,
      barThickness: 12,
    },
  ];

  const handleActiveChange = value => {
    setState({
      ...state,
      tabActive: value,
    });
    dispatch(voipBarChartFilterData(value, username));
  };

  const maxY = voipBarChartDataState
    ? Math.ceil(Math.max(...voipBarChartDataState?.inbound, ...voipBarChartDataState?.outbound) / 10) * 10 + 10
    : 100;
  const stepSize = voipBarChartDataState
    ? (Math.ceil(Math.max(...voipBarChartDataState?.inbound, ...voipBarChartDataState?.outbound) / 10) * 10 + 10) / 5
    : 20;
  return (
    <Cards
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
      title="Call Breakdown"
      size="large"
    >
      {bcLoading ? (
        <div className="sd-spin">
          <Spin />
        </div>
      ) : (
        <CardBarChart>
          <ChartjsBarChartTransparent
            labels={voipBarChartDataState?.labels}
            datasets={voipBarChartDatasets}
            options={{
              maintainAspectRatio: true,
              responsive: true,
              layout: {
                padding: {
                  top: 20,
                },
              },
              legend: {
                display: false,
                position: 'top',
                align: 'end',
                labels: {
                  boxWidth: 6,
                  display: true,
                  usePointStyle: true,
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
                      fontSize: 12,
                      fontColor: '#182b49',
                      max: maxY,
                      stepSize,
                      display: true,
                      min: 0,
                      padding: 10,
                    },
                  },
                ],
                xAxes: [
                  {
                    gridLines: {
                      display: true,
                      zeroLineWidth: 2,
                      zeroLineColor: '#fff',
                      color: 'transparent',
                      z: 1,
                    },
                    ticks: {
                      beginAtZero: true,
                      fontSize: 12,
                      fontColor: '#182b49',
                      min: 0,
                    },
                  },
                ],
              },
            }}
          />
        </CardBarChart>
      )}
    </Cards>
  );
};

SalesVoIPReportBarChart.propTypes = {
  user: PropTypes.object,
};

export default SalesVoIPReportBarChart;

const CardBarChart = Styled.div`
    >div{
        @media only screen and (max-width: 575px) {
            flex-flow: column;
            align-items: flex-start !important;
            ul{
                margin: 0 0 15px;
            }
        }
    }
    .card-bar-top{
        &.flex-grid{
            ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: -20px;
            @media only screen and (max-width: 575px) {
                flex-flow: column;
                align-items: center;
            }
            h1{
                font-size: 24px;
                margin-bottom: 22px;
                @media only screen and (max-width: 1199px) {
                    font-size: 20px;
                }
            }
        }
        .flex-grid-child{
            padding: 0 20px;
        }
        p{
            font-size: 14px;
            margin-bottom: 8px;
            color: ${({ theme }) => theme['light-color']};
        }
        h1{
            margin-bottom: 18px;
            sub{
                bottom: 0;
                font-size: 14px;
                ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: 8px;
                color: ${({ theme }) => theme['success-color']};
                svg{
                    ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 4px;
                }
            }
        }
    }
    ul{
        margin-top: 15px;
    }
    .chart-dataIndicator{
        li{
            font-size: 13px;
            color: ${({ theme }) => theme['gray-color']};
            &:not(:last-child){
                ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 16px;
            }
        }
    }
    .chartjs-tooltip{
        min-width: 140px !important;
        @media only screen and (max-width: 1199px){
            min-width: 115px !important;
        }
    }
    .deals-barChart{
        display: flex;
        .card-bar-top{
            &:not(:last-child){
                margin-right: 30px;
                ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 30px;
            }
        }
        h4{
            font-weight: 400;
            color: ${({ theme }) => theme['light-gray-color']};
            p{
                &.growth-down{
                    .deal-percentage{
                        color: ${({ theme }) => theme['danger-color']};
                    }
                }
                &.growth-up{
                    .deal-percentage{
                        color: ${({ theme }) => theme['success-color']};
                    }
                }
                .deal-percentage{
                    svg,
                    img,
                    i{
                        margin-right: 3px;
                    }
                }
                .deal-value{
                    font-size: 22px;
                    font-weight: 600;
                    margin-right: 8px;
                    color: ${({ theme }) => theme['dark-color']};
                }
            }
        }
    }
    .deals-list{
        .custom-label{
            font-size: 14px;
            &:not(:last-child){
                ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 30px;
            }
        }
    }
`;
