import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';
import { Spin, Switch } from 'antd';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { ChartjsAreaChart } from '../../../../components/charts/chartjs';
import { customTooltips } from '../../../../components/utilities/utilities';
import { getSpreadHistory } from '../../../../redux/companyOverview/actionCreator';
import { formatCurrenyValue } from '../../../../utility/utility';

const SpreadHistoryChart = () => {
  const dispatch = useDispatch();
  const { spreadHistory, spreadHistoryLoading } = useSelector(state => {
    return {
      spreadHistory: state.companyOverview.spreadHistory,
      spreadHistoryLoading: state.companyOverview.spreadHistoryLoading,
    };
  });

  useEffect(() => {
    if (getSpreadHistory) {
      dispatch(getSpreadHistory({ directPlacement: false }));
    }
  }, [dispatch]);

  const performanceDatasets = spreadHistory !== null && [
    {
      data: spreadHistory.yData,
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
      data: spreadHistory.rollingAvg,
      borderColor: '#faad14',
      borderWidth: 2,
      borderStyle: 'dotted',
      fill: false,
      backgroundColor: '#faad14',
      label: 'Rolling Average',
      borderDash: [5, 15],
      pointRadius: '0',
      hoverRadius: '0',
    },
    // {
    //   data: [...Array(spreadHistory.yData.length).fill(getQuotaValue(+startDate))],
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

  const onChangePlacementType = checked => {
    dispatch(getSpreadHistory({ directPlacement: checked }));
  };

  return (
    <Cards
      more=""
      isbutton={
        <div>
          <span style={{ marginRight: '10px' }}>Direct Placement: </span>
          <Switch size="large" onChange={onChangePlacementType} />
        </div>
      }
      title="Spread History"
      size="default"
    >
      {spreadHistoryLoading || spreadHistory == null ? (
        <div className="sd-spin">
          <Spin />
        </div>
      ) : (
        <div className="performance-lineChart">
          <ChartjsAreaChart
            id="spreadsheet"
            labels={spreadHistory.xData}
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
                  title(ts) {
                    return moment(ts[0].label).format('YYYY-MM-DD');
                  },
                  label(t, d) {
                    const { yLabel, datasetIndex } = t;
                    return `<span class="chart-data">${formatCurrenyValue(yLabel)}</span> <span class="data-label">${
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
                      // max: 80,
                      stepSize: 20,
                      callback(label) {
                        return `$${label}`;
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
                        return `${moment(label).format('MMM	Do YYYY')}`;
                      },
                    },
                  },
                ],
              },
            }}
            height={window.innerWidth <= 575 ? 300 : 116}
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
  );
};

export default SpreadHistoryChart;
