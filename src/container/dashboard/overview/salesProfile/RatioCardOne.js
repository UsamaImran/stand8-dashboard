import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'antd';

import { RatioCard } from '../../style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import Heading from '../../../../components/heading/heading';

const RatioCardOne = ({ data }) => {
  return (
    <RatioCard>
      <Cards headless title={data.title}>
        <div className="ratio-content">
          <Heading as="h1">{data.value}</Heading>
          <Progress percent={data.percent} className={`progress-${data.type}`} />
          <p>{data.belowMessage}</p>
        </div>
      </Cards>
    </RatioCard>
  );
};

RatioCardOne.propTypes = {
  data: PropTypes.object,
};

export default RatioCardOne;
