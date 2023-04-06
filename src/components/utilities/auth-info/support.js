import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import { NestedDropdwon } from './auth-info-style';
import { Popover } from '../../popup/popup';
import Heading from '../../heading/heading';

const Support = () => {
  const content = (
    <NestedDropdwon>
      <div className="support-dropdwon">
        <ul>
          <Heading as="h5">Documentation</Heading>
          <li>
            <Link to="#">How to use STAND 8 Dashboard</Link>
          </li>
          <li>
            <Link to="#">More Data Coming Soon</Link>
          </li>
        </ul>
        <ul>
          <Heading as="h5">VoIP Report</Heading>
          <li>
            <Link to="#">Taking AWS Data</Link>
          </li>
          <li>
            <Link to="#">Tuning Data</Link>
          </li>
        </ul>
        <ul>
          <Heading as="h5">TextUs Report</Heading>
          <li>
            <Link to="#">Using API calls</Link>
          </li>
          <li>
            <Link to="#">Tuning Data</Link>
          </li>
        </ul>
      </div>
    </NestedDropdwon>
  );

  return (
    <div className="support">
      <Popover placement="bottomLeft" content={content} action="click">
        <Link to="#" className="head-example">
          <FeatherIcon icon="help-circle" size={20} />
        </Link>
      </Popover>
    </div>
  );
};

export default Support;
