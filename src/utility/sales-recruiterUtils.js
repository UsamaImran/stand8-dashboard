import React from 'react';
import moment from 'moment-timezone';
import FeatherIcon from 'feather-icons-react';
import { QUOTA_VALUE } from '../constants';

import { theme } from '../config/theme/themeVariables';

const getPercent = (value, quota) => {
  return Math.round((value / quota) * 100);
};

const getType = percent => {
  return percent === 0 ? 'danger' : percent > 0 && percent < 100 ? 'warning' : 'success';
};

export const getQuotaValue = date => {
  const today = moment();
  const someday = moment(date);
  const diff = today.diff(someday, 'year');
  return diff <= 1 ? QUOTA_VALUE.LESS_THAN_YEAR : QUOTA_VALUE.MORE_THAN_YEAR;
};

export const getJobOrders = (value, quota) => {
  const percent = getPercent(value, quota);
  const difference = quota - value;
  const jobOrders = {
    title: 'Job Orders',
    value,
    percent: percent >= 100 ? 100 : percent,
    belowMessage: difference > 0 ? `Needs ${difference} More Job Order(s)` : `Weekly Quota Reached`,
    type: getType(percent),
  };
  return jobOrders;
};

export const getClientVisits = (value, quota) => {
  const percent = getPercent(value, quota);
  const difference = quota - value;
  const clientVisits = {
    title: 'Client Visits',
    value,
    percent: percent >= 100 ? 100 : percent,
    belowMessage: difference > 0 ? `Needs ${difference} More Client Visits(s)` : `Weekly Quota Reached`,
    type: getType(percent),
  };
  return clientVisits;
};

export const getClientSendOuts = (value, quota) => {
  const percent = getPercent(value, quota);
  const difference = quota - value;
  const clientSendOuts = {
    title: 'Client Sendouts',
    value,
    percent: percent >= 100 ? 100 : percent,
    belowMessage: difference > 0 ? `Needs ${difference} More Client Sendout(s)` : `Weekly Quota Reached`,
    type: getType(percent),
  };
  return clientSendOuts;
};

export const getInterviews = (value, quota) => {
  const percent = getPercent(value, quota);
  const difference = quota - value;
  const interviews = {
    title: 'Interviews',
    value,
    percent: percent >= 100 ? 100 : percent,
    belowMessage: difference > 0 ? `Needs ${difference} More Interview(s)` : `Weekly Quota Reached`,
    type: getType(percent),
  };
  return interviews;
};

export const getPlacements = (value, quota) => {
  const percent = getPercent(value, quota);
  const difference = quota - value;
  const placements = {
    title: 'Placements',
    value,
    percent: percent >= 100 ? 100 : percent,
    belowMessage: difference > 0 ? `Needs 1 Placement` : `Weekly Quota Reached`,
    type: getType(percent),
  };
  return placements;
};

export const getPreScreens = (value, quota) => {
  const percent = getPercent(value, quota);
  const difference = quota - value;
  const prescreens = {
    title: 'Prescreens',
    value,
    percent: percent >= 100 ? 100 : percent,
    belowMessage: difference > 0 ? `Needs ${difference} More Prescreen(s)` : `Weekly Quota Reached`,
    type: getType(percent),
  };
  return prescreens;
};

export const getCustomerSendOut = (value, quota) => {
  const percent = getPercent(value, quota);
  const difference = quota - value;
  const customerSendOuts = {
    title: 'Sendout to Customer',
    value,
    percent: percent >= 100 ? 100 : percent,
    belowMessage: difference > 0 ? `Needs ${difference} More Sendout(s)` : `Weekly Quota Reached`,
    type: getType(percent),
  };
  return customerSendOuts;
};

export const getCardInformation = (value, quota, title) => {
  const percent = getPercent(value, quota);
  const difference = quota - value;
  const data = {
    title,
    value,
    percent: percent >= 100 ? 100 : percent,
    belowMessage: difference > 0 ? `Needs ${difference} More ${title}(s)` : `Weekly Quota Reached`,
    type: getType(percent),
  };
  return data;
};

export const getPreviousSpreadPercentage = value => {
  const style = {
    color: value < 0 ? theme['danger-color'] : theme['success-color'],
  };
  return <small style={style}>{value >= 0 ? `+${value}` : value}%</small>;
};

export const terminateZeroFromArray = array => {
  if (array && array.length > 0) {
    const newArray = [...array];
    for (let i = array.length - 1; i >= 0; i = -1) {
      if (parseFloat(array[i]) === 0) {
        newArray.pop();
      } else {
        break;
      }
    }
    return newArray.splice(-2);
  }
  return null;
};

export const calculatePercent = (prev, current) => {
  let divider = 1;
  if (prev && prev > 0) {
    divider = prev;
  }

  const percent = prev === 0 && current !== 0 ? 100 : ((current - prev) / divider) * 100;
  return percent;
};

export const calculatePreviousSpreadPercentage = array => {
  const values = terminateZeroFromArray(array) || [0, 0];
  let percent = 0;
  if (values.length === 0) {
    percent = 0;
  } else if (values.length === 1) {
    percent = calculatePercent(0, parseFloat(values[0]));
  } else {
    percent = calculatePercent(parseFloat(values[0]), parseFloat(values[1]));
  }

  return Math.round(percent);
};

export const getRevenuePercentage = (prev, current) => {
  const percent = calculatePercent(prev, current);
  const spanStyle = {
    color: percent >= 0 ? theme['success-color'] : theme['danger-color'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  };
  return (
    <span style={spanStyle} className={percent >= 0 ? 'growth-upward' : 'growth-downward'}>
      <FeatherIcon icon={percent >= 0 ? 'arrow-up' : 'arrow-down'} size={12} />
      {Math.abs(percent > 100 ? 100 : percent).toFixed(2)}%
    </span>
  );
};

export const getTopPerformersSpreadPercentage = array => {
  const percent = calculatePreviousSpreadPercentage(array);
  const spanStyle = {
    color: percent >= 0 ? theme['success-color'] : theme['danger-color'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  };
  return (
    <span style={spanStyle} className={percent >= 0 ? 'growth-upward' : 'growth-downward'}>
      <FeatherIcon icon={percent >= 0 ? 'arrow-up' : 'arrow-down'} size={12} />
      {Math.abs(percent).toFixed(2)}%
    </span>
  );
};
