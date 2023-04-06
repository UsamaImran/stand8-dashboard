import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { OverviewCard } from '../../style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import Heading from '../../../../components/heading/heading';
import { textUsOverviewGetData } from '../../../../redux/salesTextUs/actionCreator';

const expectedMessagesDelivered = 150;
const expectedAvgResponseRate = 60;

const DailyOverview = ({ user }) => {
  const { email } = user;

  const dispatch = useDispatch();
  const { rtl, textUsOverviewData } = useSelector(state => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
      textUsOverviewData: state.salesTextUs.textUsOverviewData,
    };
  });

  useEffect(() => {
    if (textUsOverviewGetData && email) {
      dispatch(textUsOverviewGetData(email));
    }
  }, [dispatch, email]);

  let messagedDeliveredPercent = 0;

  if (textUsOverviewData?.yesterday.messagedDelivered > 0) {
    messagedDeliveredPercent = (
      (textUsOverviewData?.today.messagedDelivered * 100) / textUsOverviewData?.yesterday.messagedDelivered -
      100
    ).toFixed(2);
  }

  let avgResponseRatePercent = 0;
  if (textUsOverviewData?.yesterday.avgResponseRate > 0) {
    avgResponseRatePercent = (
      (textUsOverviewData?.today.avgResponseRate * 100) / textUsOverviewData?.yesterday.avgResponseRate -
      100
    ).toFixed(2);
  }

  return (
    <OverviewCard>
      <div className="d-flex align-items-center justify-content-between overview-head">
        <Heading as="h4">Daily Overview</Heading>
      </div>
      <div className="overview-box">
        <Cards headless>
          <div className="d-flex align-items-center justify-content-between">
            <div className="overview-box-single">
              <Heading as="h2" className="color-primary">
                {textUsOverviewData?.today.messagedDelivered}
              </Heading>
              <p>Messaged Delivered Today</p>
            </div>
            <div className="overview-box-single text-right">
              <Heading as="h2">{expectedMessagesDelivered}</Heading>
              <p>Expected Messages Delivered</p>
            </div>
          </div>

          <Progress
            percent={(textUsOverviewData?.today.messagedDelivered / expectedMessagesDelivered) * 100}
            showInfo={false}
            className="progress-primary"
          />

          <p>
            <span className={messagedDeliveredPercent > 0 ? 'growth-upward' : 'growth-downward'}>
              <FeatherIcon icon={messagedDeliveredPercent > 0 ? 'arrow-up' : 'arrow-down'} size={14} />
              {messagedDeliveredPercent > 0 ? messagedDeliveredPercent : -messagedDeliveredPercent}%
              <span>Since yesterday</span>
            </span>
            <span className="overview-box-percentage" style={{ float: !rtl ? 'right' : 'left' }}>
              {!textUsOverviewData
                ? 0
                : ((textUsOverviewData?.today?.messagedDelivered / expectedMessagesDelivered) * 100).toFixed(0)}
              %
            </span>
          </p>
        </Cards>
      </div>

      <div className="overview-box">
        <Cards headless>
          <div className="d-flex align-items-center justify-content-between">
            <div className="overview-box-single">
              <Heading as="h2" className="color-info">
                {textUsOverviewData?.today.avgResponseRate.toFixed(2)}%
              </Heading>
              <p>Avg response Rate</p>
            </div>
            <div className="overview-box-single text-right">
              <Heading as="h2">{expectedAvgResponseRate}%</Heading>
              <p>Expected Avg response Rate</p>
            </div>
          </div>
          <Progress
            percent={(textUsOverviewData?.today.avgResponseRate / expectedAvgResponseRate) * 100}
            showInfo={false}
            className="progress-primary"
          />
          <p>
            <span className={avgResponseRatePercent > 0 ? 'growth-upward' : 'growth-downward'}>
              <FeatherIcon icon={avgResponseRatePercent > 0 ? 'arrow-up' : 'arrow-down'} size={14} />
              {avgResponseRatePercent > 0 ? avgResponseRatePercent : -avgResponseRatePercent}%
              <span>Since yesterday</span>
            </span>
            <span className="overview-box-percentage" style={{ float: !rtl ? 'right' : 'left' }}>
              {!textUsOverviewData
                ? 0
                : ((textUsOverviewData?.today.avgResponseRate / expectedAvgResponseRate) * 100).toFixed(0)}
              %
            </span>
          </p>
        </Cards>
      </div>
    </OverviewCard>
  );
};

DailyOverview.propTypes = {
  user: PropTypes.object,
};

export default DailyOverview;
