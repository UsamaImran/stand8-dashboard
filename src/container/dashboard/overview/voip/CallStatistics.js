import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import styled from 'styled-components';

import { Cards } from '../../../../components/cards/frame/cards-frame';
import { voipCallStatisticsData } from '../../../../redux/VoIPPieChart/actionCreator';

const CallStatistics = () => {
  const dispatch = useDispatch();
  const username = null;

  const [state, setState] = useState({
    tabActive: 'today',
  });

  const { voipCallStatsData, caLoading } = useSelector(reduxState => {
    return {
      voipCallStatsData: reduxState.voipPieChartReducer.voipCallStatsData,
      caLoading: reduxState.voipPieChartReducer.caLoading,
      authUser: reduxState.auth.user,
    };
  });

  useEffect(() => {
    // dispatch(voipCallStatisticsData('today', username));
    if (voipCallStatisticsData) {
      dispatch(voipCallStatisticsData('today', username));
    }
  }, [dispatch, username]);

  const handleActiveChange = value => {
    setState({
      ...state,
      tabActive: value,
    });
    dispatch(voipCallStatisticsData(value, username));
  };

  return (
    <>
      <Cards
        title="Call Statistics"
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
        {caLoading ? (
          <div className="sd-spin">
            <Spin />
          </div>
        ) : (
          <StatsWrapper className="stats-wrapper">
            <div className="stats">
              <div className="stats-label">Number of Calls</div>
              <div className="stats-value">{voipCallStatsData.number_of_calls}</div>
            </div>
            <div className="stats">
              <div className="stats-label">Avg. Duration</div>
              <div className="stats-value">{voipCallStatsData.avg_duration}</div>
            </div>
            <div className="stats">
              <div className="stats-label">Longest Call</div>
              <div className="stats-value">{voipCallStatsData.longest_duration}</div>
            </div>
            <div className="stats">
              <div className="stats-label">Total Duration</div>
              <div className="stats-value">{voipCallStatsData.total_duration}</div>
            </div>
          </StatsWrapper>
        )}
      </Cards>
    </>
  );
};

export default CallStatistics;

const StatsWrapper = styled.div`
  .stats {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 10px;

    .stats-value {
      font-weight: bold;
    }
  }
`;
