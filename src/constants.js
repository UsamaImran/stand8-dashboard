import React from 'react';
import moment from 'moment';

export const CALENDER_DATA_TYPE = {
  SALES: 'sales',
  RECRUITER: 'recruiter',
  COMPANY: 'company',
};

export const QUOTA_VALUE = {
  LESS_THAN_YEAR: 7500,
  MORE_THAN_YEAR: 10000,
};

export const VOIP_REPORT_TYPE = {
  COMPANY: 'company',
  SALES: 'Sales',
  RECRUITER: 'Recruiter',
};

export const BANNER_COLOR = '#2c99ff';

export const SALES_AND_RECRUITER_TABS = ['Overview', 'TextUs', 'VOIP report', 'Calendar'];

export const CONVERSATION_DIRECTION = {
  IN: 'in',
  OUT: 'out',
};

export const TEXTS_TABLE_COLUMS = [
  { title: 'User', dataIndex: 'contact_name', key: 'contact_name' },
  { title: 'Contact Phone', dataIndex: 'contact_phone', key: 'contact_phone' },
  {
    title: 'Message Body',
    dataIndex: 'message_body',
    key: 'message_body',
    render: text => <div style={{ whiteSpace: 'normal' }}>{text}</div>,
  },
  { title: 'Message Delivered', dataIndex: 'message_delivered', key: 'message_delivered' },
];

export const CALLS_TABLE_COLUMNS = [
  { title: 'To', dataIndex: 'to', key: 'to' },
  {
    title: 'Call Duration',
    dataIndex: 'duration_seconds',
    key: 'duration_seconds',
    render: time => <>{moment.utc(time * 1000).format('HH:mm:ss')} </>,
  },
];

export const VOIP_CALL_DIRECTION = {
  INBOUND: { value: 'inbound', icon: 'phone-incoming' },
  OUTBOUND: { value: 'outbound', icon: 'phone-outgoing' },
};

export const CALENDER_TYPE_KEY = {
  MONTH: 0,
  SCHEDULE: 1,
};

export const SALES_QUOTA = {
  JOB_ORDERS: 4,
  CLIENT_VISITS: 5,
  CLIENT_SENDOUTS: 6,
  INTERVIEWS: 3,
  PLACEMENTS: 1,
};

export const SALES_CARD_TITLE = {
  JOB_ORDERS: 'Job Order',
  CLIENT_VISITS: 'Client Visit',
  CLIENT_SENDOUTS: 'Client Sendout',
  INTERVIEWS: 'Interview',
  PLACEMENTS: 'Placement',
};

export const RECRUITER_CARD_TITLE = {
  PRESCREENS: 'Pre-Screen',
  SENDOUT_TO_CUSTOMERS: 'Sendout to Customer',
  INTERVIEWS: 'Interview',
  PLACEMENTS: 'Placement',
};

export const RECRUITER_QUOTA = {
  PRESCREENS: 35,
  SENDOUT_TO_CUSTOMERS: 6,
  INTERVIEWS: 5,
  PLACEMENTS: 1,
};

export const TOP_PERFORMERS_ROLE = {
  SALES: 'sales',
  RECRUITER: 'recruiters',
};

export const PLACEMENT_DETAILS_COLUMNS = [
  {
    title: 'Client',
    dataIndex: 'clientContact_name',
    key: 'clientContact_name',
    sorter: (a, b) => a.clientName.localeCompare(b.clientName),
  },
  {
    title: 'Candidate',
    dataIndex: 'candidate_name',
    key: 'candidate_name',
    sorter: (a, b) => a.candidate_nameSorter.localeCompare(b.candidate_nameSorter),
  },

  {
    title: 'Job Title',
    dataIndex: 'title',
    key: 'title',
    sorter: (a, b) => a.jobTitle.localeCompare(b.jobTitle),
  },

  {
    title: 'Spread',
    dataIndex: 'spread_amount',
    key: 'spread_amount',
    sorter: (a, b) => a.spread - b.spread,
    render: item => (
      <p>
        <b>{item}</b>
      </p>
    ),
  },
];

export const graphLabels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
